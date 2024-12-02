import { useState } from "react";
import { useDietData } from "@/hooks/useDietData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronDown, 
  ChevronUp,
  Leaf,
  Sun,
  Flame,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DietDetailsProps {
  dietId: string;
}

const getLevelColor = (level: string): string => {
  switch(level) {
    case 'Beginner':
    case 'Very Low':
      return 'text-green-500';
    case 'Easy':
    case 'Low':
      return 'text-green-400';
    case 'Intermediate':
    case 'Moderate':
      return 'text-yellow-500';
    case 'Advanced':
    case 'High':
      return 'text-orange-500';
    case 'Expert':
    case 'Very High':
      return 'text-red-500';
    default:
      return 'text-muted-foreground';
  }
};

const getLevelIcon = (level: string) => {
  switch(level) {
    case 'Beginner':
    case 'Very Low':
      return <Leaf className="h-4 w-4" />;
    case 'Easy':
    case 'Low':
      return <Sun className="h-4 w-4" />;
    case 'Intermediate':
    case 'Moderate':
      return <Flame className="h-4 w-4 text-yellow-500" />;
    case 'Advanced':
    case 'High':
      return <AlertTriangle className="h-4 w-4" />;
    case 'Expert':
    case 'Very High':
      return <Flame className="h-4 w-4 text-red-500" />;
    default:
      return <Sun className="h-4 w-4" />;
  }
};

const LevelDisplay = ({ label, level }: { label: string; level: string }) => (
  <div className="flex items-center gap-2 bg-secondary/5 px-3 py-2 rounded-lg">
    <span className="text-sm font-medium">{label}:</span>
    <div className={cn("flex items-center gap-1 font-semibold", getLevelColor(level))}>
      {getLevelIcon(level)}
      <span>{level}</span>
    </div>
  </div>
);

export function DietDetails({ dietId }: DietDetailsProps) {
  const { dietData, isLoading } = useDietData(dietId);
  const [showDetails, setShowDetails] = useState(false);

  if (isLoading) {
    return <div className="p-4">Loading diet details...</div>;
  }

  if (!dietData?.diet) {
    return <div className="p-4">Diet not found</div>;
  }

  const { diet, recommendations, restrictions } = dietData;

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{diet.name}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="transition-transform duration-200"
        >
          {showDetails ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      
      {showDetails && (
        <CardContent className="space-y-4">
          {diet.primary_goal && (
            <Badge variant="secondary" className="mb-2">
              {diet.primary_goal}
            </Badge>
          )}
          
          <div className="flex gap-3 flex-wrap">
            {diet.difficulty_level && (
              <LevelDisplay label="Difficulty" level={diet.difficulty_level} />
            )}
            {diet.cost_level && (
              <LevelDisplay label="Cost" level={diet.cost_level} />
            )}
          </div>

          {diet.core_principles && (
            <div className="rounded-lg bg-secondary/10 p-4">
              <h4 className="font-semibold mb-2">Core Principles</h4>
              <p className="text-sm text-muted-foreground">{diet.core_principles}</p>
            </div>
          )}

          {diet.target_demographic && (
            <div className="rounded-lg bg-secondary/10 p-4">
              <h4 className="font-semibold mb-2">Target Demographic</h4>
              <p className="text-sm text-muted-foreground">{diet.target_demographic}</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="rounded-lg bg-secondary/10 p-4">
              <h4 className="font-semibold mb-2">Recommended Foods</h4>
              <ScrollArea className="h-32">
                <ul className="space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec.id} className="text-sm flex items-start gap-2">
                      <span className="font-medium">{rec.food_name}</span>
                      {rec.food_category && (
                        <Badge variant="outline" className="text-xs">
                          {rec.food_category}
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}

          {restrictions.length > 0 && (
            <div className="rounded-lg bg-secondary/10 p-4">
              <h4 className="font-semibold mb-2">Restricted Foods</h4>
              <ScrollArea className="h-32">
                <ul className="space-y-2">
                  {restrictions.map((res) => (
                    <li key={res.id} className="text-sm">
                      <span className="font-medium">{res.food_name}</span>
                      {res.reason && (
                        <p className="text-muted-foreground text-xs mt-1">
                          {res.reason}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
