import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, Apple, Pill } from "lucide-react";

interface HealthMetric {
  category: string;
  value: string;
  status: "good" | "warning" | "alert";
  icon: React.ReactNode;
}

export function HealthDataView() {
  // Mock data for development
  const healthMetrics: HealthMetric[] = [
    { 
      category: "Blood Work", 
      value: "4 Recent Tests",
      status: "good",
      icon: <Brain className="w-4 h-4" />
    },
    { 
      category: "Diet Goals", 
      value: "2 Active Goals",
      status: "warning",
      icon: <Apple className="w-4 h-4" />
    },
    { 
      category: "Fitness", 
      value: "3 Goals Tracked",
      status: "good",
      icon: <Activity className="w-4 h-4" />
    },
    { 
      category: "Supplements", 
      value: "2 Recommended",
      status: "alert",
      icon: <Pill className="w-4 h-4" />
    }
  ];

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Health Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {healthMetrics.map((metric) => (
            <Card key={metric.category} className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-full bg-secondary`}>
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{metric.category}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{metric.value}</span>
                    <Badge 
                      variant={metric.status === 'good' ? 'default' : metric.status === 'warning' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="font-medium">Recent Analysis</h4>
          <Card className="p-4 bg-secondary/10">
            <p className="text-sm text-muted-foreground">
              Development Mode: AI analysis will be available when OpenAI integration is activated. 
              Current data shows mock recommendations based on your health metrics.
            </p>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}