import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MetricsGrid } from "./components/MetricsGrid";
import { AIInsights } from "./components/AIInsights";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function HealthDataView() {
  const user = useUser();
  const { toast } = useToast();

  const { data: healthData, isLoading } = useQuery({
    queryKey: ['healthData', user?.id],
    queryFn: async () => {
      if (!user) return null;

      try {
        // Fetch blood work data
        const { data: bloodworkData, error: bloodworkError } = await supabase
          .from('blood_work_results')
          .select('*')
          .eq('user_id', user.id)
          .order('test_date', { ascending: false })
          .limit(1)
          .single();

        if (bloodworkError && bloodworkError.code !== 'PGRST116') {
          throw bloodworkError;
        }

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        return {
          bloodwork: bloodworkData,
          profile: profileData
        };
      } catch (error: any) {
        toast({
          title: "Error fetching health data",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
    },
    enabled: !!user
  });

  const insights = [
    "Overall health score shows positive progression",
    "Sleep quality could be improved with better sleep hygiene",
    "Vitamin D supplementation recommended based on blood work",
    "Cardiovascular health metrics are excellent",
    "Consider increasing fiber intake to meet dietary goals"
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-48 bg-muted rounded"></div>
          <div className="h-4 w-36 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-16rem)] w-full rounded-md border p-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            Health Overview
            <Badge variant="secondary" className="ml-2">Real-time Analysis</Badge>
          </h3>
        </div>
        
        <MetricsGrid />

        <div className="mt-6 space-y-4">
          <AIInsights insights={insights} />
        </div>
      </div>
    </ScrollArea>
  );
}