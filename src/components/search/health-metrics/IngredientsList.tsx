interface IngredientsListProps {
  ingredients: string;
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Product Ingredients:</h4>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
        {ingredients || "No ingredients listed"}
      </p>
    </div>
  );
}