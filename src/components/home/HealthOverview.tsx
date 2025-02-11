
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useHealthMetrics } from "@/hooks/useHealthMetrics";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { healthMetricSchema } from "@/utils/validations";
import { motion } from "framer-motion";

export function HealthOverview() {
  const { data: healthData, isLoading, error, refetch } = useHealthMetrics();
  const { toast } = useToast();

  // Validate data
  const validatedData = healthData?.map(item => {
    try {
      return healthMetricSchema.parse(item);
      return item;
    } catch (err) {
      console.error("Invalid health metric:", err);
      return null;
    }
  }).filter(Boolean);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading health data</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>There was a problem loading your health data.</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  refetch();
                  toast({
                    title: "Retrying",
                    description: "Attempting to reload your health data...",
                  });
                }}
                className="ml-2"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </Card>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <LoadingSpinner size="lg" message="Loading your health metrics..." />
      </Card>
    );
  }

  if (!validatedData?.length) {
    return (
      <Card className="p-6">
        <Alert>
          <AlertTitle>No health data available</AlertTitle>
          <AlertDescription>
            Start tracking your health metrics to see them displayed here.
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Health Score</h2>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={validatedData}>
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]} 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  background: "rgba(24, 24, 27, 0.9)",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}
                labelStyle={{ color: "#ffffff" }}
                itemStyle={{ color: "#ffffff" }}
              />
              <Line 
                type="monotone" 
                dataKey="health_score" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: "#8884d8" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
