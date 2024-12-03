import { Heart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HeartHealthCard() {
  return (
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
  );
}