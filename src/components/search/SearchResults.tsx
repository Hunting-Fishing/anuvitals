import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/services/OpenFoodFactsService";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResultsProps {
  results: ProductDetails[];
  onPageChange: (newPage: number) => void;
  currentPage: number;
  totalResults?: number;
}

/**
 * SearchResults component displays a paginated list of product search results
 */
export function SearchResults({ 
  results, 
  onPageChange, 
  currentPage,
  totalResults 
}: SearchResultsProps) {
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
    <div 
      className="space-y-4"
      role="region"
      aria-label="Search results"
    >
      {results.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No products found matching your search criteria
        </p>
      ) : (
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-4 animate-fade-in">
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
          </div>
        </ScrollArea>
      )}
      
      <div 
        className="flex justify-between mt-4 sticky bottom-0 bg-background p-4 border-t"
        aria-label="Pagination navigation"
      >
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <span className="flex items-center text-sm text-muted-foreground">
          Page {currentPage}
          {totalResults && ` of ${Math.ceil(totalResults / 10)}`}
        </span>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={results.length < 10}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
}