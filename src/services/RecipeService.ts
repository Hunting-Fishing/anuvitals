import { supabase } from "@/integrations/supabase/client";

export interface RecipeSearchParams {
  query: string;
  diet?: string;
  health?: string[];
  cuisineType?: string[];
  mealType?: string[];
  calories?: string;
}

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: {
    text: string;
    quantity: number;
    measure: string;
    food: string;
    weight: number;
  }[];
  calories: number;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  totalNutrients: Record<string, {
    label: string;
    quantity: number;
    unit: string;
  }>;
}

export interface RecipeSearchResponse {
  hits: {
    recipe: Recipe;
  }[];
  count: number;
  from: number;
  to: number;
}

export async function searchRecipes(params: RecipeSearchParams): Promise<RecipeSearchResponse> {
  const { data, error } = await supabase.functions.invoke('recipe-search', {
    body: params
  });

  if (error) {
    console.error('Error searching recipes:', error);
    throw new Error(error.message);
  }

  return data;
}