import { Check, Circle } from "lucide-react";

interface Diet {
  name: string;
  implemented: boolean;
}

interface DietCategoryGroupProps {
  category: string;
  diets: Diet[];
  getDietImplementationStatus: (dietName: string) => boolean;
}

export function DietCategoryGroup({ category, diets, getDietImplementationStatus }: DietCategoryGroupProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {category}
      </h3>
      {diets.map((diet) => {
        const isImplemented = getDietImplementationStatus(diet.name);
        return (
          <div 
            key={diet.name} 
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              isImplemented ? 'bg-green-100 dark:bg-green-900/20' : ''
            }`}
          >
            {isImplemented ? (
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400" />
            )}
            <span className={isImplemented ? 'font-medium' : ''}>
              {diet.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}