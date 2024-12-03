import { Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SleepRecoveryCard() {
  return (
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
  );
}