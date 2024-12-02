import { useState } from "react";
import { useDietData } from "@/hooks/useDietData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LevelDisplay } from "./diet/LevelDisplay";
import { DietFoodList } from "./diet/DietFoodList";

interface DietDetailsProps {
  dietId: string;
}

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

          <DietFoodList 
            title="Recommended Foods"
            items={recommendations}
          />

          <DietFoodList 
            title="Restricted Foods"
            items={restrictions}
            showReason
          />
        </CardContent>
      )}
    </Card>
  );
}