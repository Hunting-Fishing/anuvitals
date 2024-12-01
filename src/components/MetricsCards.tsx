import { Flame, Leaf, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
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
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in [animation-delay:100ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Eco-Score</CardTitle>
          <Leaf className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">B+</div>
          <p className="text-xs text-muted-foreground">Above average</p>
          <div className="mt-4 h-2 w-full bg-secondary rounded-full">
            <div className="h-2 w-[85%] bg-primary rounded-full" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in [animation-delay:200ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89%</div>
          <p className="text-xs text-muted-foreground">5/7 goals completed</p>
          <div className="mt-4 h-2 w-full bg-secondary rounded-full">
            <div className="h-2 w-[89%] bg-primary rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}