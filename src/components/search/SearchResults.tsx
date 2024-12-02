import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/services/OpenFoodFactsService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Beaker, Droplet, Flame, Fish, Wheat, Package } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface SearchResultsProps {
  results: ProductDetails[];
  onPageChange: (newPage: number) => void;
  currentPage: number;
}

const getHealthRatingColor = (rating: number) => {
  if (rating >= 70) return "text-green-500";
  if (rating >= 40) return "text-orange-500";
  return "text-red-500";
};

const getMetricColor = (value: number, type: 'positive' | 'negative') => {
  if (type === 'positive') {
    return value >= 70 ? "text-green-500" : value >= 40 ? "text-orange-500" : "text-red-500";
  }
  return value >= 70 ? "text-red-500" : value >= 40 ? "text-orange-500" : "text-green-500";
};

export function SearchResults({ results, onPageChange, currentPage }: SearchResultsProps) {
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const toggleOpen = (productId: string) => {
    setOpenStates(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const calculateHealthScore = (product: ProductDetails) => {
    // This is a simplified scoring system - you might want to adjust the weights
    let score = 50; // Base score
    const nutrition = product.nutritional_info || {};
    
    // Positive factors
    if (nutrition.proteins_100g > 5) score += 10;
    if (nutrition.fiber_100g > 3) score += 10;
    if (nutrition.sugars_100g < 5) score += 10;
    
    // Negative factors
    if (nutrition.salt_100g > 1.5) score -= 10;
    if (nutrition.fat_100g > 17.5) score -= 10;
    if (nutrition.saturated_fat_100g > 5) score -= 10;

    return Math.min(Math.max(score, 0), 100);
  };

  return (
    <div className="space-y-4">
      {results.map((product: ProductDetails) => {
        const healthScore = calculateHealthScore(product);
        const productId = product.barcode || product.name;
        
        return (
          <Card key={productId} className="w-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                <CardDescription>
                  {product.barcode && `Barcode: ${product.barcode}`}
                </CardDescription>
              </div>
              <div className={`text-2xl font-bold ${getHealthRatingColor(healthScore)}`}>
                {healthScore}/100
              </div>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-4">
              <Dialog>
                <DialogTrigger>
                  <div className="relative group">
                    <img 
                      src={product.image_url || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-full h-48 object-contain rounded-lg transition-transform group-hover:scale-105"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
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
                            {product.nutritional_info?.salt_100g || 0}g
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Flame className="h-5 w-5" />
                            <span>Calories</span>
                          </div>
                          <span className={getMetricColor(60, 'negative')}>
                            {product.nutritional_info?.energy_100g || 0} kcal
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
                            {product.nutritional_info?.proteins_100g || 0}g
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wheat className="h-5 w-5" />
                            <span>Fiber</span>
                          </div>
                          <span className={getMetricColor(60, 'positive')}>
                            {product.nutritional_info?.fiber_100g || 0}g
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            <span>Sugar</span>
                          </div>
                          <span className={getMetricColor(90, 'positive')}>
                            {product.nutritional_info?.sugars_100g || 0}g
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-4">
                <Collapsible
                  open={openStates[productId]}
                  onOpenChange={() => toggleOpen(productId)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-secondary rounded-lg">
                    <span className="font-medium">Ingredients & Nutrition</span>
                    {openStates[productId] ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-2 space-y-2">
                    <div>
                      <h4 className="font-semibold">Ingredients:</h4>
                      <p className="text-sm text-muted-foreground">{product.ingredients || "No ingredients listed"}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-500">Known Hazard Ingredients:</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.ingredients?.split(',')
                          .filter(i => i.toLowerCase().includes('artificial') || 
                                     i.toLowerCase().includes('preservative'))
                          .join(', ') || "None identified"}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold">Nutrition Guide:</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>Calories: {product.nutritional_info?.energy_100g || 0} kcal</p>
                        <p>Protein: {product.nutritional_info?.proteins_100g || 0}g</p>
                        <p>Carbs: {product.nutritional_info?.carbohydrates_100g || 0}g</p>
                        <p>Fat: {product.nutritional_info?.fat_100g || 0}g</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={results.length < 10}
        >
          Next
        </Button>
      </div>
    </div>
  );
}