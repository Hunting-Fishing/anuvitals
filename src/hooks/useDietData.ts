import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Diet = Database["public"]["Tables"]["diets"]["Row"];
type FoodRecommendation = Database["public"]["Tables"]["food_recommendations"]["Row"];
type FoodRestriction = Database["public"]["Tables"]["food_restrictions"]["Row"];

export function useDietData(dietId?: string) {
  const queryClient = useQueryClient();

  // Query diet details including related data
  const { data: dietData, isLoading } = useQuery({
    queryKey: ["diet", dietId],
    queryFn: async () => {
      if (!dietId) return null;
      
      const { data: diet, error: dietError } = await supabase
        .from("diets")
        .select("*")
        .eq("id", dietId)
        .single();

      if (dietError) throw dietError;

      const { data: recommendations } = await supabase
        .from("food_recommendations")
        .select("*")
        .eq("diet_id", dietId);

      const { data: restrictions } = await supabase
        .from("food_restrictions")
        .select("*")
        .eq("diet_id", dietId);

      return {
        diet,
        recommendations: recommendations || [],
        restrictions: restrictions || []
      };
    },
    enabled: !!dietId
  });

  // Mutation to create a new diet
  const createDiet = useMutation({
    mutationFn: async (newDiet: {
      name: string;
      description?: string;
      core_principles?: string;
      primary_goal?: Database["public"]["Enums"]["diet_goal_type"];
      target_demographic?: string;
      category_id?: string;
      recommendations?: Omit<FoodRecommendation, "id" | "created_at">[];
      restrictions?: Omit<FoodRestriction, "id" | "created_at">[];
    }) => {
      // Insert diet first
      const { data: diet, error: dietError } = await supabase
        .from("diets")
        .insert({
          name: newDiet.name,
          description: newDiet.description,
          core_principles: newDiet.core_principles,
          primary_goal: newDiet.primary_goal,
          target_demographic: newDiet.target_demographic,
          category_id: newDiet.category_id
        })
        .select()
        .single();

      if (dietError) throw dietError;

      // Insert recommendations if any
      if (newDiet.recommendations?.length) {
        const { error: recError } = await supabase
          .from("food_recommendations")
          .insert(
            newDiet.recommendations.map(rec => ({
              ...rec,
              diet_id: diet.id
            }))
          );
        if (recError) throw recError;
      }

      // Insert restrictions if any
      if (newDiet.restrictions?.length) {
        const { error: resError } = await supabase
          .from("food_restrictions")
          .insert(
            newDiet.restrictions.map(res => ({
              ...res,
              diet_id: diet.id
            }))
          );
        if (resError) throw resError;
      }

      return diet;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diets"] });
    }
  });

  return {
    dietData,
    isLoading,
    createDiet
  };
}