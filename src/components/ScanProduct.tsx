import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProductDetails } from "@/services/OpenFoodFactsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

export function ScanProduct() {
  const [barcode, setBarcode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const session = useSession();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      toast({
        title: "Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setSearching(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .textSearch('name', searchQuery)
        .limit(10);

      if (error) throw error;

      setSearchResults(data || []);
      
      if (data?.length === 0) {
        toast({
          title: "No Results",
          description: "No products found matching your search.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

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
    <div className="w-full max-w-md mx-auto p-4 space-y-8">
      {/* Search Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Search Products</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={searching}
            />
            <Button type="submit" disabled={searching}>
              <Search className="h-4 w-4 mr-2" />
              {searching ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Search Results</h3>
            <div className="space-y-2">
              {searchResults.map((product: any) => (
                <div key={product.id} className="border-b pb-2">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">Barcode: {product.barcode}</p>
                  {product.ingredients && (
                    <p className="text-sm text-gray-600">Ingredients: {product.ingredients}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scan Section */}
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
    </div>
  );
}