import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProductDetails } from "@/services/OpenFoodFactsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export function ScanForm() {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { toast } = useToast();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode) {
      toast({
        title: "Error",
        description: "Please enter a barcode",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const productDetails = await fetchProductDetails(barcode);
      
      const { error } = await supabase.from("products").insert({
        user_id: session?.user.id,
        barcode,
        ...productDetails,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product scanned and saved successfully!",
      });
      
      setBarcode("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Scan New Product</h2>
      <form onSubmit={handleScan} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter product barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Scanning..." : "Scan Product"}
        </Button>
      </form>

      <Alert>
        <AlertDescription>
          Enter a product barcode to fetch nutritional information from Open Food Facts database.
        </AlertDescription>
      </Alert>
    </div>
  );
}