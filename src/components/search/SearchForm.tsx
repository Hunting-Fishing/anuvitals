
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SearchFilters } from "./SearchFilters";
import { SearchResults } from "./SearchResults";
import { useSearch } from "@/hooks/use-search";

interface SearchFormProps {
  categories: string[];
  allergens: string[];
  brands: string[];
}

export function SearchForm({ categories, allergens, brands }: SearchFormProps) {
  const {
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
  } = useSearch();

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
