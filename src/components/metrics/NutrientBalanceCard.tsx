import { Apple } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NutrientBalanceCard() {
  return (
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
  );
}