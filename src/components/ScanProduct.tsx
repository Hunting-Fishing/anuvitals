import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { 
  fetchProductDetails, 
  searchProducts, 
  fetchCategories, 
  fetchAllergens,
  fetchBrands,
  SearchFilters 
} from "@/services/OpenFoodFactsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { SearchFilters } from "./search/SearchFilters";
import { SearchResults } from "./search/SearchResults";

export function ScanProduct() {
  const [barcode, setBarcode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [page, setPage] = useState(1);
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const [categoriesData, allergensData, brandsData] = await Promise.all([
        fetchCategories(),
        fetchAllergens(),
        fetchBrands()
      ]);
      setCategories(categoriesData);
      setAllergens(allergensData);
      setBrands(brandsData);
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
      // Format search query for Supabase full-text search
      const formattedQuery = searchQuery
        .split(' ')
        .filter(term => term.length > 0)
        .map(term => term + ':*')
        .join(' & ');

      const filters: SearchFilters = {
        page,
        pageSize: 10,
        categories: selectedCategory,
        allergens: selectedAllergen,
        brands: selectedBrand
      };
      
      const [offResults, supabaseResults] = await Promise.all([
        searchProducts(searchQuery, filters),
        supabase
          .from("products")
          .select("*")
          .textSearch('search_text', formattedQuery)
          .limit(10)
      ]);

      if (supabaseResults.error) throw supabaseResults.error;

      // Combine and deduplicate results
      const combinedResults = [...offResults.products, ...(supabaseResults.data || [])];
      const uniqueResults = Array.from(new Set(combinedResults.map(p => p.barcode)))
        .map(barcode => combinedResults.find(p => p.barcode === barcode))
        .filter(p => p);
      
      setSearchResults(uniqueResults);
      
      if (uniqueResults.length === 0) {
        toast({
          title: "No Results",
          description: `No products found matching "${searchQuery}". Try a different search term or check your filters.`,
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${uniqueResults.length} products matching "${searchQuery}"`,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
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

          <SearchFilters
            categories={categories}
            allergens={allergens}
            brands={brands}
            selectedCategory={selectedCategory}
            selectedAllergen={selectedAllergen}
            selectedBrand={selectedBrand}
            onCategoryChange={setSelectedCategory}
            onAllergenChange={setSelectedAllergen}
            onBrandChange={setSelectedBrand}
          />
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <SearchResults
            results={searchResults}
            onPageChange={setPage}
            currentPage={page}
          />
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