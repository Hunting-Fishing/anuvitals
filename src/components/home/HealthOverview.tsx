
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useHealthMetrics } from "@/hooks/useHealthMetrics";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

export function HealthOverview() {
  const { data: healthData, isLoading, error } = useHealthMetrics();
  const { toast } = useToast();

  if (error) {
    toast({
      title: "Error loading health data",
      description: "Please try again later",
      variant: "destructive",
    });
    return null;
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <LoadingSpinner size="lg" message="Loading health data..." />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Weekly Health Score</h2>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={healthData}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="health_score" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ fill: "#8884d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
