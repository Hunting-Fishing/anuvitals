import { useState } from "react";
import { USDAFoodItem } from "@/services/USDAService";
import { USDAFoodSearch } from "./USDAFoodSearch";
import { USDANutritionDisplay } from "./USDANutritionDisplay";

export function USDAFoodAnalyzer() {
  const [selectedFood, setSelectedFood] = useState<USDAFoodItem | null>(null);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search USDA Foods</h2>
          <USDAFoodSearch onFoodSelect={setSelectedFood} />
        </div>
        
        {selectedFood && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nutrition Information</h2>
            <USDANutritionDisplay food={selectedFood} />
          </div>
        )}
      </div>
    </div>
  );
}