import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductIngredientsProps {
  ingredients: string;
  nutritionalInfo: Record<string, any>;
  isOpen: boolean;
  onOpenChange: () => void;
}

export function ProductIngredients({ 
  ingredients, 
  nutritionalInfo, 
  isOpen, 
  onOpenChange 
}: ProductIngredientsProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-secondary rounded-lg">
        <span className="font-medium">Ingredients & Nutrition</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 space-y-2">
        <div>
          <h4 className="font-semibold">Ingredients:</h4>
          <p className="text-sm text-muted-foreground">{ingredients || "No ingredients listed"}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-red-500">Known Hazard Ingredients:</h4>
          <p className="text-sm text-muted-foreground">
            {ingredients?.split(',')
              .filter(i => i.toLowerCase().includes('artificial') || 
                         i.toLowerCase().includes('preservative'))
              .join(', ') || "None identified"}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Nutrition Guide:</h4>
          <div className="text-sm text-muted-foreground">
            <p>Calories: {nutritionalInfo?.energy_100g || 0} kcal</p>
            <p>Protein: {nutritionalInfo?.proteins_100g || 0}g</p>
            <p>Carbs: {nutritionalInfo?.carbohydrates_100g || 0}g</p>
            <p>Fat: {nutritionalInfo?.fat_100g || 0}g</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}