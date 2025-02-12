
import { ProductDetails as IProductDetails } from "@/services/types/OpenFoodFactsTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";

interface ProductDetailsProps {
  product: IProductDetails;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-sm text-muted-foreground">Barcode: {product.barcode}</p>
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {/* Ingredients */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <p className="text-sm">{product.ingredients || "No ingredients information available"}</p>
          </section>

          {/* Nutritional Information */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
            {Object.entries(product.nutritional_info).length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.nutritional_info).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 bg-secondary/10 rounded">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertCircle className="h-4 w-4" />
                <span>No nutritional information available</span>
              </div>
            )}
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
