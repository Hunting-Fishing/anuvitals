
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ProductSearch } from "./ProductSearch";
import { ProductDetails } from "./ProductDetails";
import { ProductList } from "./ProductList";
import { useToast } from "@/hooks/use-toast";
import { ProductDetails as IProductDetails } from "@/services/types/OpenFoodFactsTypes";

export function OpenFoodAnalyzer() {
  const [searchResults, setSearchResults] = useState<IProductDetails[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearchError = (error: Error) => {
    toast({
      title: "Search Error",
      description: error.message,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <ProductSearch 
        onResultsFound={setSearchResults}
        onError={handleSearchError}
        onLoadingChange={setIsLoading}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <ProductList
            products={searchResults}
            isLoading={isLoading}
            onProductSelect={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        </Card>

        {selectedProduct && (
          <Card className="p-4">
            <ProductDetails product={selectedProduct} />
          </Card>
        )}
      </div>
    </div>
  );
}
