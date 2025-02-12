
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchProducts } from "@/services/OpenFoodFactsService";
import { ProductDetails } from "@/services/types/OpenFoodFactsTypes";

interface ProductSearchProps {
  onResultsFound: (results: ProductDetails[]) => void;
  onError: (error: Error) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export function ProductSearch({ onResultsFound, onError, onLoadingChange }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    onLoadingChange(true);
    try {
      const response = await searchProducts(searchQuery);
      onResultsFound(response.products);
    } catch (error) {
      onError(error instanceof Error ? error : new Error("Failed to search products"));
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search for food products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <Button type="submit" className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
