import { Flame, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CaloriesCard() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Calories</CardTitle>
        <Flame className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,850</div>
        <p className="text-xs text-muted-foreground">of 2,000 goal</p>
        <div className="mt-4 h-2 w-full bg-secondary rounded-full">
          <div className="h-2 w-[75%] bg-primary rounded-full" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
          <div>
            <div className="font-medium">Breakfast</div>
            <div className="text-muted-foreground">450 cal</div>
          </div>
          <div>
            <div className="font-medium">Lunch</div>
            <div className="text-muted-foreground">650 cal</div>
          </div>
          <div>
            <div className="font-medium">Dinner</div>
            <div className="text-muted-foreground">750 cal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}