
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { searchProducts, type SearchFilters } from "@/services/OpenFoodFactsService";
import { useSession } from "@supabase/auth-helpers-react";
import { logSearchMetrics } from "@/components/search/SearchMetricsLogger";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAllergen, setSelectedAllergen] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const session = useSession();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
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

      const filters: SearchFilters = {
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
      if (session?.user?.id) {
        await logSearchMetrics({
          query: searchQuery,
          filters,
          resultsCount: uniqueResults.length,
          executionTime,
          userId: session.user.id
        });
      }
      
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
    } catch (error: any) {
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

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searching,
    selectedCategory,
    setSelectedCategory,
    selectedAllergen,
    setSelectedAllergen,
    selectedBrand,
    setSelectedBrand,
    page,
    setPage,
    handleSearch
  };
}
