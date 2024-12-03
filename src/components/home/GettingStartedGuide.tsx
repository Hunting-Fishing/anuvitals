import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

export function GettingStartedGuide() {
  const steps = [
    {
      title: "Complete Your Profile",
      description: "Add your health goals and preferences",
      completed: true,
    },
    {
      title: "Connect Health Data",
      description: "Sync your fitness devices and apps",
      completed: false,
    },
    {
      title: "Set Your Goals",
      description: "Define your health and fitness targets",
      completed: false,
    },
    {
      title: "Start Tracking",
      description: "Begin logging your daily activities",
      completed: false,
    },
  ];

  return (
    <Card className="p-6 border-2 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start space-x-3 group">
            {step.completed ? (
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