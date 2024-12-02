import { useState } from "react";
import { Beaker, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AdditiveDetails } from "@/components/additives/AdditiveDetails";

interface AdditivesListProps {
  additives: any[];
  groupedAdditives: Record<string, any[]>;
  openRiskLevels: Record<string, boolean>;
  onToggleRiskLevel: (level: string) => void;
  totalHazards: number;
}

export function AdditivesList({
  additives,
  groupedAdditives,
  openRiskLevels,
  onToggleRiskLevel,
  totalHazards,
}: AdditivesListProps) {
  const [selectedAdditive, setSelectedAdditive] = useState<any>(null);

  const getRiskLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <Beaker className="h-5 w-5" />
        <span className="font-semibold">Chemical Additives</span>
        <span className="text-sm text-muted-foreground">({totalHazards} hazards found)</span>
      </div>

      {groupedAdditives && ['high', 'medium', 'low'].map((riskLevel) => {
        const riskAdditives = groupedAdditives[riskLevel] || [];
        if (riskAdditives.length === 0) return null;
        
        return (
          <Collapsible
            key={riskLevel}
            open={openRiskLevels[riskLevel]}
            onOpenChange={() => onToggleRiskLevel(riskLevel)}
            className="space-y-1"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`${getRiskLevelColor(riskLevel)} w-full justify-between`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-8">{riskAdditives.length}</span>
                  {riskLevel.toUpperCase()} RISK
                </span>
                {openRiskLevels[riskLevel] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-8">
              {riskAdditives.map((additive: any) => (
                <Button
                  key={additive.id}
                  variant="link"
                  className={`${getRiskLevelColor(riskLevel)} text-left justify-start w-full`}
                  onClick={() => setSelectedAdditive(additive)}
                >
                  {additive.code} - {additive.name}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      })}

      <AdditiveDetails
        additive={selectedAdditive}
        isOpen={!!selectedAdditive}
        onClose={() => setSelectedAdditive(null)}
      />
    </div>
  );
}