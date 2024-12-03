import { Card } from "@/components/ui/card";
import { Brain, Activity, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActionCards() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "AI Assistant",
      description: "Get personalized health advice",
      icon: Brain,
      route: "/ai",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Track Activity",
      description: "Log your daily activities",
      icon: Activity,
      route: "/activity",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Diet Plans",
      description: "View and manage your diet",
      icon: Apple,
      route: "/diet",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {actions.map((action) => (
        <Card
          key={action.title}
          className="p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2"
          onClick={() => navigate(action.route)}
        >
          <div className={`rounded-full ${action.bgColor} p-2 w-fit`}>
            <action.icon className={`w-6 h-6 ${action.color}`} />
          </div>
          <h3 className="mt-3 font-semibold">{action.title}</h3>
          <p className="text-sm text-muted-foreground">{action.description}</p>
        </Card>
      ))}
    </div>
  );
}