import { supabase } from "@/integrations/supabase/client";

export interface NutritionAnalysisResponse {
  calories: number;
  totalWeight: number;
  dietLabels: string[];
  healthLabels: string[];
  totalNutrients: Record<string, {
    label: string;
    quantity: number;
    unit: string;
  }>;
}

export async function analyzeIngredients(ingredients: string): Promise<NutritionAnalysisResponse> {
  const { data, error } = await supabase.functions.invoke('nutrition-analysis', {
    body: { ingredients }
  });

  if (error) {
    throw new Error(`Error analyzing ingredients: ${error.message}`);
  }

  return data;
}