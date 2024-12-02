import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/services/OpenFoodFactsService";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

interface SearchResultsProps {
  results: ProductDetails[];
  onPageChange: (newPage: number) => void;
  currentPage: number;
}

export function SearchResults({ results, onPageChange, currentPage }: SearchResultsProps) {
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const toggleOpen = (productId: string) => {
    setOpenStates(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const calculateHealthScore = (product: ProductDetails) => {
    let score = 50;
    const nutrition = product.nutritional_info || {};
    
    if (nutrition.proteins_100g > 5) score += 10;
    if (nutrition.fiber_100g > 3) score += 10;
    if (nutrition.sugars_100g < 5) score += 10;
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
          <ProductCard
            key={productId}
            product={product}
            healthScore={healthScore}
            isOpen={openStates[productId] || false}
            onToggleOpen={toggleOpen}
          />
        );
      })}
      
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