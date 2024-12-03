import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { USDAFoodItem } from "@/services/USDAService";

interface USDANutritionDisplayProps {
  food: USDAFoodItem;
}

export function USDANutritionDisplay({ food }: USDANutritionDisplayProps) {
  const formatNutrientValue = (value: number, unit: string) => {
    return `${value.toFixed(1)} ${unit}`;
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{food.description}</h2>
      {food.foodCategory && (
        <p className="text-muted-foreground mb-6">
          Category: {food.foodCategory}
        </p>
      )}

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {food.nutrients && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Nutrients</h3>
              <div className="grid gap-3">
                {food.nutrients.map((nutrient) => (
                  <div
                    key={nutrient.nutrientId}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <span className="font-medium">{nutrient.nutrientName}</span>
                    <span className="text-muted-foreground">
                      {formatNutrientValue(nutrient.value, nutrient.unitName)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {food.portions && food.portions.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Serving Sizes</h3>
              <div className="grid gap-3">
                {food.portions.map((portion, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <span className="font-medium">
                      {portion.amount} {portion.unit}
                    </span>
                    <span className="text-muted-foreground">
                      {portion.gramWeight}g
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}