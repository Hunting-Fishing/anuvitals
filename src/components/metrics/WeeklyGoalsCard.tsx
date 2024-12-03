import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WeeklyGoalsCard() {
  return (
    <Card className="animate-fade-in [animation-delay:200ms]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weekly Goals</CardTitle>
        <Target className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">89%</div>
        <p className="text-xs text-muted-foreground">5/7 goals completed</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
              <span>Exercise</span>
            </div>
            <span className="font-medium">3/3</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
              <span>Diet</span>
            </div>
            <span className="font-medium">2/3</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
              <span>Sleep</span>
            </div>
            <span className="font-medium">4/5</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-purple-500 mr-2" />
              <span>Meditation</span>
            </div>
            <span className="font-medium">2/2</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}