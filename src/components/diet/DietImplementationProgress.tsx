import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DietCategoryGroup } from "./DietCategoryGroup";

interface DietImplementationProgressProps {
  groupedDiets: Record<string, Array<{ name: string; implemented: boolean }>>;
  isLoadingImplemented: boolean;
  getDietImplementationStatus: (dietName: string) => boolean;
}

export function DietImplementationProgress({ 
  groupedDiets, 
  isLoadingImplemented, 
  getDietImplementationStatus 
}: DietImplementationProgressProps) {
  return (
    <Card className="w-96 p-4">
      <h2 className="text-lg font-semibold mb-4">Implementation Progress</h2>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        {isLoadingImplemented ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedDiets).map(([category, diets]) => (
              <DietCategoryGroup
                key={category}
                category={category}
                diets={diets}
                getDietImplementationStatus={getDietImplementationStatus}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}