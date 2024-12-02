import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface FoodItem {
  id: string;
  food_name: string;
  food_category?: string;
  reason?: string;
}

interface DietFoodListProps {
  title: string;
  items: FoodItem[];
  showReason?: boolean;
}

export function DietFoodList({ title, items, showReason = false }: DietFoodListProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-lg bg-secondary/10 p-4">
      <h4 className="font-semibold mb-2">{title}</h4>
      <ScrollArea className="h-32">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="text-sm flex items-start gap-2">
              <span className="font-medium">{item.food_name}</span>
              {item.food_category && (
                <Badge variant="outline" className="text-xs">
                  {item.food_category}
                </Badge>
              )}
              {showReason && item.reason && (
                <p className="text-muted-foreground text-xs mt-1">
                  {item.reason}
                </p>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}