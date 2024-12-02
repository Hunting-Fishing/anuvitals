import { useState } from "react";
import { analyzeIngredients } from "@/services/EdamamService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function NutritionAnalyzer() {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!ingredients.trim()) {
      toast({
        title: "Error",
        description: "Please enter ingredients to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await analyzeIngredients(ingredients);
      setNutritionData(data);
      toast({
        title: "Success",
        description: "Nutrition analysis complete",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter ingredients (e.g., '1 cup rice, 100g chicken')"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {nutritionData && (
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Calories</h4>
                <p>{nutritionData.calories} kcal</p>
              </div>
              <div>
                <h4 className="font-semibold">Total Weight</h4>
                <p>{nutritionData.totalWeight}g</p>
              </div>
            </div>

            {nutritionData.dietLabels.length > 0 && (
              <div>
                <h4 className="font-semibold">Diet Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionData.dietLabels.map((label: string) => (
                    <span key={label} className="bg-primary/10 px-2 py-1 rounded-md text-sm">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {nutritionData.healthLabels.length > 0 && (
              <div>
                <h4 className="font-semibold">Health Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionData.healthLabels.map((label: string) => (
                    <span key={label} className="bg-secondary/10 px-2 py-1 rounded-md text-sm">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold">Nutrients</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(nutritionData.totalNutrients).map(([key, nutrient]: [string, any]) => (
                  <div key={key}>
                    <p className="font-medium">{nutrient.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round(nutrient.quantity * 10) / 10} {nutrient.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}