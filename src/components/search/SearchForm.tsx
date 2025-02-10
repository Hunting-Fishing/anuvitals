
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { searchProducts, type SearchFilters as SearchFiltersType } from "@/services/OpenFoodFactsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { useSession } from "@supabase/auth-helpers-react";

interface SearchFormProps {
  categories: string[];
  allergens: string[];
  brands: string[];
}

export function SearchForm({ categories, allergens, brands }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAllergen, setSelectedAllergen] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const session = useSession();

  const logSearchMetrics = async (query: string, filters: SearchFiltersType, resultsCount: number, executionTime: number) => {
    if (!session?.user?.id) return;

    try {
      await supabase.from('search_history').insert({
        user_id: session.user.id,
        query,
        filters,
        results_count: resultsCount,
        execution_time: executionTime
      });
    } catch (error) {
      console.error('Error logging search metrics:', error);
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
    const startTime = performance.now();
    
    try {
      const formattedQuery = searchQuery
        .split(' ')
        .filter(term => term.length > 0)
        .map(term => term + ':*')
        .join(' & ');

      const filters: SearchFiltersType = {
        page,
        pageSize: 10,
        categories: selectedCategory === "all" ? "" : selectedCategory,
        allergens: selectedAllergen === "all" ? "" : selectedAllergen,
        brands: selectedBrand === "all" ? "" : selectedBrand
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

      // Log search metrics
      const executionTime = (performance.now() - startTime) / 1000; // Convert to seconds
      await logSearchMetrics(searchQuery, filters, uniqueResults.length, executionTime);
      
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

  return (
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

      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onPageChange={setPage}
          currentPage={page}
        />
      )}
    </div>
  );
}
