import { 
  Flame, Leaf, Target, Heart, Brain, Apple, 
  Activity, Sun, Moon, Utensils, Scale, Dumbbell 
} from "lucide-react";
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
      
      <Card className="animate-fade-in [animation-delay:100ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nutrient Balance</CardTitle>
          <Apple className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">B+</div>
          <p className="text-xs text-muted-foreground">Above average</p>
          <div className="mt-4 space-y-2">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">Protein</span>
                <span>85%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full">
                <div className="h-1.5 w-[85%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">Carbs</span>
                <span>70%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full">
                <div className="h-1.5 w-[70%] bg-blue-500 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">Fats</span>
                <span>75%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full">
                <div className="h-1.5 w-[75%] bg-yellow-500 rounded-full" />
              </div>
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

      <Card className="animate-fade-in [animation-delay:300ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Heart Health</CardTitle>
          <Heart className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Good</div>
          <p className="text-xs text-muted-foreground">Based on recent metrics</p>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs">Resting HR</span>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">68 bpm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">BP</span>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">120/80</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Recovery</span>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">Optimal</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:400ms]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sleep & Recovery</CardTitle>
          <Moon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-baseline">
            <div className="text-2xl font-bold">7h 45m</div>
            <div className="text-xs font-medium text-green-500">+45m</div>
          </div>
          <p className="text-xs text-muted-foreground">vs. 7h target</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Deep Sleep</span>
              <span className="font-medium">2h 15m</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>REM</span>
              <span className="font-medium">1h 45m</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Light Sleep</span>
              <span className="font-medium">3h 45m</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
              <Sun className="h-3 w-3" />
              <span>Sleep quality improved vs. last week</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}