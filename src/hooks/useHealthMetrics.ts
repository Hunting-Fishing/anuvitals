
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

export interface HealthMetric {
  date: string;
  health_score: number;
}

export function useHealthMetrics() {
  const user = useUser();

  return useQuery({
    queryKey: ['healthMetrics', user?.id],
    queryFn: async (): Promise<HealthMetric[]> => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('health_metrics')
        .select('date, health_score')
        .order('date', { ascending: true })
        .limit(7);

      if (error) throw error;

      return data.map(metric => ({
        date: new Date(metric.date).toLocaleDateString('en-US', { weekday: 'short' }),
        health_score: metric.health_score
      }));
    },
    enabled: !!user
  });
}
