interface IngredientsListProps {
  ingredients: string;
  additives: any[];
}

export function IngredientsList({ ingredients, additives }: IngredientsListProps) {
  const highlightRiskyIngredients = (text: string) => {
    if (!text) return "No ingredients listed";
    
    const ingredientsList = text.split(',').map(i => i.trim());
    
    return ingredientsList.map((ingredient, index) => {
      const matchingAdditive = additives.find(a => 
        ingredient.toLowerCase().includes(a.name.toLowerCase()) ||
        ingredient.toLowerCase().includes(a.code.toLowerCase())
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
          className={`${matchingAdditive ? getRiskColor(matchingAdditive.risk_level) : ''}`}
        >
          {ingredient}
          {index < ingredientsList.length - 1 ? ', ' : ''}
        </span>
      );
    });
  };

  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Product Ingredients:</h4>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
        {highlightRiskyIngredients(ingredients)}
      </p>
    </div>
  );
}