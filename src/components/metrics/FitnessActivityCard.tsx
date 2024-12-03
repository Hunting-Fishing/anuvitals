import { Dumbbell, Scale, Flame, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FitnessActivityCard() {
  return (
    <Card className="animate-fade-in [animation-delay:500ms]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Fitness Activity</CardTitle>
        <Dumbbell className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline">
          <div className="text-2xl font-bold">5,280</div>
          <div className="text-xs font-medium text-yellow-500">-220</div>
        </div>
        <p className="text-xs text-muted-foreground">steps today</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1">
              <Scale className="h-3 w-3" />
              <span>Active Minutes</span>
            </div>
            <span className="font-medium">45 mins</span>
          </div>
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              <span>Calories Burned</span>
            </div>
            <span className="font-medium">420 kcal</span>
          </div>
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1">
              <Utensils className="h-3 w-3" />
              <span>Protein Goal</span>
            </div>
            <span className="font-medium">85% met</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}