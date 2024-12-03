import { Flame, Leaf, Target, Heart, Brain, Apple } from "lucide-react";
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
          <CardTitle className="text-sm font-medium">Nutrient Balance</CardTitle>
          <Apple className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">B+</div>
          <p className="text-xs text-muted-foreground">Above average</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="font-medium">Protein</div>
              <div className="text-muted-foreground">85%</div>
            </div>
            <div>
              <div className="font-medium">Carbs</div>
              <div className="text-muted-foreground">70%</div>
            </div>
            <div>
              <div className="font-medium">Fats</div>
              <div className="text-muted-foreground">75%</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in [animation-delay:200ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Goals</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89%</div>
          <p className="text-xs text-muted-foreground">5/7 goals completed</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-xs">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
              <span>Exercise: 3/3</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
              <span>Diet: 2/3</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
              <span>Sleep: 4/5</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:300ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Heart Health</CardTitle>
          <Heart className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Good</div>
          <p className="text-xs text-muted-foreground">Based on recent metrics</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Resting HR</span>
              <span className="font-medium">68 bpm</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>BP</span>
              <span className="font-medium">120/80</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:400ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mental Wellness</CardTitle>
          <Brain className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Balanced</div>
          <p className="text-xs text-muted-foreground">Weekly assessment</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Stress Level</span>
              <span className="font-medium">Low</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Sleep Quality</span>
              <span className="font-medium">Good</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:500ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Eco-Score</CardTitle>
          <Leaf className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">A-</div>
          <p className="text-xs text-muted-foreground">Environmental impact</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Local Sourcing</span>
              <span className="font-medium">90%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Sustainable Choices</span>
              <span className="font-medium">85%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}