
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useUser } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";

const GETTING_STARTED_STEPS = [
  {
    key: "complete_profile",
    title: "Complete Your Profile",
    description: "Add your health goals and preferences",
  },
  {
    key: "connect_health_data",
    title: "Connect Health Data",
    description: "Sync your fitness devices and apps",
  },
  {
    key: "set_goals",
    title: "Set Your Goals",
    description: "Define your health and fitness targets",
  },
  {
    key: "start_tracking",
    title: "Start Tracking",
    description: "Begin logging your daily activities",
  },
];

export function GettingStartedGuide() {
  const user = useUser();
  const { progress, isLoading, error } = useUserProgress();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (error) {
    return (
      <Card className="p-6 border-2 shadow-md">
        <div className="text-red-500">
          Error loading progress: {error.message}
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 border-2 shadow-md">
        <LoadingSpinner size="lg" message="Loading progress..." />
      </Card>
    );
  }

  const completedSteps = progress?.reduce((acc, p) => {
    acc[p.item_key] = p.completed;
    return acc;
  }, {} as Record<string, boolean>) ?? {};

  return (
    <Card className="p-6 border-2 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
      <div className="space-y-4">
        {GETTING_STARTED_STEPS.map((step) => (
          <div key={step.key} className="flex items-start space-x-3 group">
            {completedSteps[step.key] ? (
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300 mt-0.5 group-hover:text-primary transition-colors" />
            )}
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
