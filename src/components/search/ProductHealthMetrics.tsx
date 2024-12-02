import { getMetricColor } from "@/lib/utils";
import { Beaker, Droplet, Flame, Fish, Wheat, Package } from "lucide-react";

interface ProductHealthMetricsProps {
  nutritionalInfo: Record<string, any>;
}

export function ProductHealthMetrics({ nutritionalInfo }: ProductHealthMetricsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Product Analysis</h3>
      
      <div className="space-y-2">
        <h4 className="font-semibold">Negatives</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Beaker className="h-5 w-5" />
              <span>Additives</span>
            </div>
            <span className={getMetricColor(70, 'negative')}>
              Contains additives to avoid
            </span>
          </div>
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

        <h4 className="font-semibold mt-4">Positives</h4>
        <div className="space-y-2">
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
      </div>
    </div>
  );
}