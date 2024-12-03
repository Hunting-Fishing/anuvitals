import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface AIInsightsProps {
  insights: string[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  return (
    <Card className="p-4 bg-secondary/10 space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-primary" />
        <h4 className="font-medium">AI Health Insights</h4>
      </div>
      <div className="space-y-2">
        {insights.map((insight, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            • {insight}
          </p>
        ))}
      </div>
    </Card>
  );
}