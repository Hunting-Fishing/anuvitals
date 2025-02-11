
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { healthMetricSchema } from "@/utils/validations";
import { useUser } from "@supabase/auth-helpers-react";

// Database row type
interface HealthMetricRow {
  id: string;
  created_at?: string;
  health_score: number;
  date: string;
  user_id: string;
}

// Input type for new metrics
type NewHealthMetric = {
  health_score: number;
  date: string;
};

export function useHealthMetricsCache() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const user = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ['healthMetrics'],
    queryFn: async () => {
      if (!user?.id) throw new Error("User must be logged in");

      const { data, error } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      // Validate data before returning
      return (data as HealthMetricRow[]).map(item => {
        try {
          return healthMetricSchema.parse(item);
        } catch (err) {
          console.error("Invalid health metric:", err);
          return null;
        }
      }).filter(Boolean);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!user
  });

  const addHealthMetric = useMutation({
    mutationFn: async (newMetric: NewHealthMetric) => {
      if (!user?.id) throw new Error("User must be logged in");
      
      const metricToInsert = {
        health_score: newMetric.health_score,
        date: newMetric.date,
        user_id: user.id
      };
      
      const { data, error } = await supabase
        .from('health_metrics')
        .insert([metricToInsert])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthMetrics'] });
      toast({
        title: "Success",
        description: "Health metric has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to add health metric. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    addHealthMetric: addHealthMetric.mutate,
    isAdding: addHealthMetric.isPending,
  };
}
