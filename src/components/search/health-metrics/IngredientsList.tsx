import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface IngredientsListProps {
  ingredients: string;
  additives: any[];
}

export function IngredientsList({ ingredients, additives }: IngredientsListProps) {
  const session = useSession();

  const { data: userProfile } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("allergies")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const highlightIngredients = (text: string) => {
    if (!text) return "No ingredients listed";
    
    const ingredientsList = text.split(',').map(i => i.trim());
    const userAllergies = userProfile?.allergies || [];
    
    return ingredientsList.map((ingredient, index) => {
      // Check for additives
      const matchingAdditive = additives.find(a => 
        ingredient.toLowerCase().includes(a.name.toLowerCase()) ||
        ingredient.toLowerCase().includes(a.code.toLowerCase())
      );
      
      // Check for allergies
      const isAllergen = userAllergies.some(allergen => 
        ingredient.toLowerCase().includes(allergen.toLowerCase())
      );
      
      const getRiskColor = (level?: string) => {
        switch (level?.toLowerCase()) {
          case 'high':
            return 'text-red-500 font-semibold';
          case 'medium':
            return 'text-yellow-500 font-semibold';
          case 'low':
            return 'text-green-500 font-semibold';
          default:
            return '';
        }
      };

      return (
        <span 
          key={index} 
          className={`${matchingAdditive ? getRiskColor(matchingAdditive.risk_level) : ''} 
                     ${isAllergen ? 'bg-red-100 px-1 rounded' : ''}`}
          title={isAllergen ? 'Contains allergen' : undefined}
        >
          {ingredient}
          {index < ingredientsList.length - 1 ? ', ' : ''}
        </span>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold">Product Ingredients:</h4>
        {userProfile?.allergies?.length > 0 && (
          <span className="text-xs text-muted-foreground">
            (Allergens highlighted in red background)
          </span>
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="text-red-500 font-semibold">■</span> High Risk
        <span className="text-yellow-500 font-semibold ml-4">■</span> Medium Risk
        <span className="text-green-500 font-semibold ml-4">■</span> Low Risk
      </div>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
        {highlightIngredients(ingredients)}
      </p>
    </div>
  );
}