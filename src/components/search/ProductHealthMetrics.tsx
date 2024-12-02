import { useState } from "react";
import { getMetricColor } from "@/lib/utils";
import { Beaker, Droplet, Flame, Fish, Wheat, Package, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdditiveDetails } from "@/components/additives/AdditiveDetails";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductHealthMetricsProps {
  nutritionalInfo: Record<string, any>;
}

export function ProductHealthMetrics({ nutritionalInfo }: ProductHealthMetricsProps) {
  const [selectedAdditive, setSelectedAdditive] = useState<any>(null);
  const [openRiskLevels, setOpenRiskLevels] = useState<Record<string, boolean>>({
    high: true,
    medium: true,
    low: true
  });

  const { data: additives } = useQuery({
    queryKey: ["additives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("additives")
        .select("*")
        .order('risk_level', { ascending: false }); 
      
      if (error) throw error;
      return data;
    }
  });

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

  const groupedAdditives = additives?.reduce((acc: Record<string, any[]>, current) => {
    const riskLevel = current.risk_level?.toLowerCase() || 'unknown';
    if (!acc[riskLevel]) {
      acc[riskLevel] = [];
    }
    acc[riskLevel].push(current);
    return acc;
  }, {});

  const totalHazards = additives?.length || 0;

  const toggleRiskLevel = (level: string) => {
    setOpenRiskLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Product Analysis</h3>
      
      <Tabs defaultValue="risks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="risks">Health Risks</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-4">
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
                  onOpenChange={() => toggleRiskLevel(riskLevel)}
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

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplet className="h-5 w-5" />
                  <span>Sodium</span>
                </div>
                <span className={getMetricColor(80, 'negative')}>
                  {nutritionalInfo?.salt_100g || 0}g
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  <span>Calories</span>
                </div>
                <span className={getMetricColor(60, 'negative')}>
                  {nutritionalInfo?.energy_100g || 0} kcal
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ingredients" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fish className="h-5 w-5" />
                <span>Protein</span>
              </div>
              <span className={getMetricColor(80, 'positive')}>
                {nutritionalInfo?.proteins_100g || 0}g
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wheat className="h-5 w-5" />
                <span>Fiber</span>
              </div>
              <span className={getMetricColor(60, 'positive')}>
                {nutritionalInfo?.fiber_100g || 0}g
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span>Sugar</span>
              </div>
              <span className={getMetricColor(90, 'positive')}>
                {nutritionalInfo?.sugars_100g || 0}g
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <AdditiveDetails
        additive={selectedAdditive}
        isOpen={!!selectedAdditive}
        onClose={() => setSelectedAdditive(null)}
      />
    </div>
  );
}