import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { 
  fetchProductDetails, 
  searchProducts, 
  fetchCategories, 
  fetchAllergens,
  SearchFilters 
} from "@/services/OpenFoodFactsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ScanProduct() {
  const [barcode, setBarcode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const [page, setPage] = useState(1);
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const [categoriesData, allergensData] = await Promise.all([
        fetchCategories(),
        fetchAllergens()
      ]);
      setCategories(categoriesData);
      setAllergens(allergensData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load filters",
        variant: "destructive",
      });
    }
  };

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
      // First try Open Food Facts API
      const filters: SearchFilters = {
        page,
        pageSize: 10,
        categories: selectedCategory,
        allergens: selectedAllergen
      };
      
      const offResults = await searchProducts(searchQuery, filters);
      
      // Then search local database
      const { data: localResults, error } = await supabase
        .from("products")
        .select("*")
        .textSearch('search_text', searchQuery)
        .limit(10);

      if (error) throw error;

      // Combine and deduplicate results
      const combinedResults = [...offResults.products, ...(localResults || [])];
      const uniqueResults = Array.from(new Set(combinedResults.map(p => p.name)))
        .map(name => combinedResults.find(p => p.name === name));
      
      setSearchResults(uniqueResults);
      
      if (uniqueResults.length === 0) {
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

          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAllergen} onValueChange={setSelectedAllergen}>
              <SelectTrigger>
                <SelectValue placeholder="Allergen" />
              </SelectTrigger>
              <SelectContent>
                {allergens.map((allergen) => (
                  <SelectItem key={allergen} value={allergen}>
                    {allergen}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Search Results</h3>
            <div className="space-y-2">
              {searchResults.map((product: any) => (
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
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage(p => p + 1)}
                disabled={searchResults.length < 10}
              >
                Next
              </Button>
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