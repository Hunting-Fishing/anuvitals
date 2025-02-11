
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { healthMetricSchema } from "@/utils/validations";
import { useUser } from "@supabase/auth-helpers-react";

interface HealthMetric {
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
      const { data, error } = await supabase
        .from('health_metrics')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      // Validate data before returning
      return data.map(item => {
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
  });

  const addHealthMetric = useMutation({
    mutationFn: async (newMetric: Omit<HealthMetric, "user_id">) => {
      if (!user?.id) throw new Error("User must be logged in");
      
      // Validate before sending to API
      const validated = healthMetricSchema.parse({
        ...newMetric,
        user_id: user.id
      });
      
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
