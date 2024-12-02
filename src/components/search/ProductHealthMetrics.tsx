import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdditivesList } from "./health-metrics/AdditivesList";
import { IngredientsList } from "./health-metrics/IngredientsList";
import { NutritionalInfo } from "./health-metrics/NutritionalInfo";

interface ProductHealthMetricsProps {
  nutritionalInfo: Record<string, any>;
  ingredients: string;
  imageUrl?: string;
}

export function ProductHealthMetrics({ nutritionalInfo, ingredients, imageUrl }: ProductHealthMetricsProps) {
  const [openRiskLevels, setOpenRiskLevels] = useState<Record<string, boolean>>({
    high: true,
    medium: true,
    low: true
  });

  const { data: additives } = useQuery({
    queryKey: ["additives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("additives")
        .select("*")
        .order('risk_level', { ascending: false }); 
      
      if (error) throw error;
      return data;
    }
  });

  const groupedAdditives = additives?.reduce((acc: Record<string, any[]>, current) => {
    const riskLevel = current.risk_level?.toLowerCase() || 'unknown';
    if (!acc[riskLevel]) {
      acc[riskLevel] = [];
    }
    acc[riskLevel].push(current);
    return acc;
  }, {});

  const totalHazards = additives?.length || 0;

  const toggleRiskLevel = (level: string) => {
    setOpenRiskLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-lg font-bold">Product Analysis</h3>
        </div>
        {imageUrl && (
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Product" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      <Tabs defaultValue="risks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="risks">Health Risks</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-4">
          <AdditivesList
            additives={additives || []}
            groupedAdditives={groupedAdditives || {}}
            openRiskLevels={openRiskLevels}
            onToggleRiskLevel={toggleRiskLevel}
            totalHazards={totalHazards}
          />
        </TabsContent>

        <TabsContent value="ingredients">
          <IngredientsList ingredients={ingredients} additives={additives || []} />
        </TabsContent>

        <TabsContent value="nutrition">
          <NutritionalInfo nutritionalInfo={nutritionalInfo} />
        </TabsContent>
      </Tabs>
    </div>
  );
}