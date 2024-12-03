import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchUSDAFoods, USDAFoodItem } from "@/services/USDAService";

interface USDAFoodSearchProps {
  onFoodSelect?: (food: USDAFoodItem) => void;
}

export function USDAFoodSearch({ onFoodSelect }: USDAFoodSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["usda-foods", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return { foods: [], totalHits: 0 };
      return searchUSDAFoods({
        query: searchQuery,
        pageSize: 10,
      });
    },
    enabled: searchQuery.length > 2,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length < 3) {
      toast({
        title: "Search query too short",
        description: "Please enter at least 3 characters to search",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="search"
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span className="ml-2">Search</span>
        </Button>
      </form>

      <ScrollArea className="h-[400px] rounded-md border">
        {searchResults?.foods && searchResults.foods.length > 0 ? (
          <div className="p-4 space-y-4">
            {searchResults.foods.map((food) => (
              <Card
                key={food.fdcId}
                className="p-4 cursor-pointer hover:bg-secondary/10 transition-colors"
                onClick={() => onFoodSelect?.(food)}
              >
                <h3 className="font-medium">{food.description}</h3>
                {food.foodCategory && (
                  <p className="text-sm text-muted-foreground">
                    Category: {food.foodCategory}
                  </p>
                )}
              </Card>
            ))}
          </div>
        ) : searchQuery.length > 2 && !isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            No foods found matching your search
          </div>
        ) : null}
      </ScrollArea>
    </div>
  );
}