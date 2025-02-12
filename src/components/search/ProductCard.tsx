
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/services/OpenFoodFactsService";
import { ProductHealthMetrics } from "./ProductHealthMetrics";
import { ProductIngredients } from "./ProductIngredients";
import { getHealthRatingColor } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

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
  const user = useUser();
  const [viewStartTime, setViewStartTime] = useState<number | null>(null);

  useEffect(() => {
    // Start tracking view time when dialog opens
    if (isOpen) {
      setViewStartTime(Date.now());
    } else if (viewStartTime && user) {
      // Log view duration when dialog closes
      const duration = Math.round((Date.now() - viewStartTime) / 1000); // Convert to seconds
      supabase.from('product_views').insert({
        user_id: user.id,
        product_id: productId,
        view_duration: duration
      }).then(({ error }) => {
        if (error) console.error('Error logging product view:', error);
      });
      setViewStartTime(null);
    }
  }, [isOpen, productId, user, viewStartTime]);

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
            <ProductHealthMetrics 
              nutritionalInfo={product.nutritional_info || {}} 
              ingredients={product.ingredients}
              imageUrl={product.image_url}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
