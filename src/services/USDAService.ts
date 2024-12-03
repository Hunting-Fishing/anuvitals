import { supabase } from "@/integrations/supabase/client";

export interface USDAFoodItem {
  fdcId: number;
  description: string;
  dataType?: string;
  publicationDate?: string;
  foodCategory?: string;
  nutrients?: Array<{
    nutrientId: number;
    nutrientName: string;
    unitName: string;
    value: number;
  }>;
  portions?: Array<{
    amount: number;
    unit: string;
    gramWeight: number;
  }>;
}

export interface USDASearchParams {
  query: string;
  dataType?: string[];
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function searchUSDAFoods(params: USDASearchParams): Promise<{
  foods: USDAFoodItem[];
  totalHits: number;
}> {
  const { data, error } = await supabase.functions.invoke('usda-search', {
    body: params
  });

  if (error) throw error;
  return data;
}

export async function getUSDAFoodDetails(fdcId: number): Promise<USDAFoodItem> {
  const { data, error } = await supabase.functions.invoke('usda-food-details', {
    body: { fdcId }
  });

  if (error) throw error;
  return data;
}