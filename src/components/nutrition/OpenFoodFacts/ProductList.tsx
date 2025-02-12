
import { ProductDetails } from "@/services/types/OpenFoodFactsTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";

interface ProductListProps {
  products: ProductDetails[];
  isLoading: boolean;
  onProductSelect: (product: ProductDetails) => void;
  selectedProduct: ProductDetails | null;
}

export function ProductList({ products, isLoading, onProductSelect, selectedProduct }: ProductListProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Search Results</h3>
      {products.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No products found. Try searching for something else.
        </p>
      ) : (
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.barcode}
                onClick={() => onProductSelect(product)}
                className={cn(
                  "p-4 rounded-lg cursor-pointer transition-colors",
                  "hover:bg-secondary/10",
                  selectedProduct?.barcode === product.barcode && "bg-secondary/20"
                )}
              >
                <div className="flex items-center gap-4">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Barcode: {product.barcode}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
