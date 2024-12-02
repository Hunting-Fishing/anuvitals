import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/services/OpenFoodFactsService";
import { ProductHealthMetrics } from "./ProductHealthMetrics";
import { ProductIngredients } from "./ProductIngredients";
import { getHealthRatingColor } from "@/lib/utils";

interface ProductCardProps {
  product: ProductDetails;
  healthScore: number;
  isOpen: boolean;
  onToggleOpen: (productId: string) => void;
}

export function ProductCard({ 
  product, 
  healthScore, 
  isOpen, 
  onToggleOpen 
}: ProductCardProps) {
  const productId = product.barcode || product.name;

  return (
    <Card className="w-full">
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
            <ProductHealthMetrics nutritionalInfo={product.nutritional_info || {}} />
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          <ProductIngredients
            ingredients={product.ingredients}
            nutritionalInfo={product.nutritional_info || {}}
            isOpen={isOpen}
            onOpenChange={() => onToggleOpen(productId)}
          />
        </div>
      </CardContent>
    </Card>
  );
}