import { useState } from "react";
import { useDietData } from "@/hooks/useDietData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{diet.name}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
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
            <Badge variant="secondary">{diet.primary_goal}</Badge>
          )}
          
          {diet.core_principles && (
            <div>
              <h4 className="font-semibold mb-2">Core Principles</h4>
              <p className="text-sm text-muted-foreground">{diet.core_principles}</p>
            </div>
          )}

          {diet.target_demographic && (
            <div>
              <h4 className="font-semibold mb-2">Target Demographic</h4>
              <p className="text-sm text-muted-foreground">{diet.target_demographic}</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Recommended Foods</h4>
              <ScrollArea className="h-32">
                <ul className="space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec.id} className="text-sm">
                      <span className="font-medium">{rec.food_name}</span>
                      {rec.food_category && (
                        <span className="text-muted-foreground"> ({rec.food_category})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}

          {restrictions.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Restricted Foods</h4>
              <ScrollArea className="h-32">
                <ul className="space-y-2">
                  {restrictions.map((res) => (
                    <li key={res.id} className="text-sm">
                      <span className="font-medium">{res.food_name}</span>
                      {res.reason && (
                        <span className="text-muted-foreground"> - {res.reason}</span>
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