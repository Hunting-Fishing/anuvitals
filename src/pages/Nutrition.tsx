
import { USDAFoodAnalyzer } from "@/components/nutrition/USDAFoodAnalyzer";
import { OpenFoodAnalyzer } from "@/components/nutrition/OpenFoodFacts/OpenFoodAnalyzer";
import { NutritionAnalyzer } from "@/components/nutrition/NutritionAnalyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function NutritionPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Nutrition Analysis</h1>
      
      <Tabs defaultValue="usda" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="usda">USDA Database</TabsTrigger>
          <TabsTrigger value="openfood">OpenFood Facts</TabsTrigger>
          <TabsTrigger value="analyzer">Recipe Analyzer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usda" className="mt-6">
          <Card className="p-6">
            <USDAFoodAnalyzer />
          </Card>
        </TabsContent>
        
        <TabsContent value="openfood" className="mt-6">
          <Card className="p-6">
            <OpenFoodAnalyzer />
          </Card>
        </TabsContent>
        
        <TabsContent value="analyzer" className="mt-6">
          <Card className="p-6">
            <NutritionAnalyzer />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
