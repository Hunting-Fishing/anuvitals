import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useImplementedDiets() {
  return useQuery({
    queryKey: ["implemented-diets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("diets")
        .select("name")
        .order("name");

      if (error) throw error;
      return data.map(diet => diet.name);
    }
  });
}