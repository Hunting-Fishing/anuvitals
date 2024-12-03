import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProductDetails } from "@/services/OpenFoodFactsService";
import { useToast } from "@/hooks/use-toast";
import { BarcodeScanner } from "./BarcodeScanner";
import { BarcodeInput } from "./BarcodeInput";
import { ScanInstructions } from "./ScanInstructions";

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
    } catch (error: any) {
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
      
      <div className="space-y-4">
        <BarcodeScanner onBarcodeDetected={setBarcode} />
        <BarcodeInput 
          barcode={barcode}
          onBarcodeChange={setBarcode}
          onSubmit={handleScan}
          loading={loading}
        />
      </div>

      <ScanInstructions />
    </div>
  );
}