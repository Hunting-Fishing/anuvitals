
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { healthMetricSchema } from "@/utils/validations";
import { useUser } from "@supabase/auth-helpers-react";

interface HealthMetricRow {
  id: string;
  created_at?: string;
  health_score: number;
  date: string;
  user_id: string;
}

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
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
    enabled: !!user
  });

  const addHealthMetric = useMutation({
    mutationFn: async (newMetric: Omit<HealthMetricRow, "id" | "created_at">) => {
      if (!user?.id) throw new Error("User must be logged in");
      
      // Create the complete metric object with user_id
      const metricWithUser = {
        ...newMetric,
        user_id: user.id
      };
      
      // Validate before sending to API
      const validated = healthMetricSchema.parse(metricWithUser);
      
      const { data, error } = await supabase
        .from('health_metrics')
        .insert([validated])
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
