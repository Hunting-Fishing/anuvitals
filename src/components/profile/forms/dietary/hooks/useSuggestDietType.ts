import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";

export function useSuggestDietType() {
  const [newDietType, setNewDietType] = useState("");
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  const suggestDietType = async () => {
    try {
      if (!user) throw new Error("No authenticated user");

      const { error } = await supabase
        .from('suggested_health_items')
        .insert({
          item_type: 'diet_type',
          suggestion: newDietType,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Suggestion submitted",
        description: "Your diet type suggestion has been submitted for review.",
      });
      setNewDietType("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { suggestDietType, newDietType, setNewDietType };
}