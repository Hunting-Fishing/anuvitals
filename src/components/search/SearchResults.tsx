import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/services/OpenFoodFactsService";

interface SearchResultsProps {
  results: ProductDetails[];
  onPageChange: (newPage: number) => void;
  currentPage: number;
}

export function SearchResults({ results, onPageChange, currentPage }: SearchResultsProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="font-medium">Search Results</h3>
      <div className="space-y-2">
        {results.map((product: any) => (
          <div key={product.id || product.name} className="border-b pb-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">
                  {product.barcode && `Barcode: ${product.barcode}`}
                </p>
                {product.ingredients && (
                  <p className="text-sm text-gray-600">
                    Ingredients: {product.ingredients}
                  </p>
                )}
              </div>
              {product.image_url && (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
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