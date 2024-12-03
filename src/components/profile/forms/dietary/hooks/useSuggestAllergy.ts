import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";

export function useSuggestAllergy() {
  const [newAllergy, setNewAllergy] = useState("");
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  const suggestAllergy = async () => {
    try {
      if (!user) throw new Error("No authenticated user");

      const { error } = await supabase
        .from('suggested_health_items')
        .insert({
          item_type: 'allergy',
          suggestion: newAllergy,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Suggestion submitted",
        description: "Your allergy suggestion has been submitted for review.",
      });
      setNewAllergy("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { suggestAllergy, newAllergy, setNewAllergy };
}