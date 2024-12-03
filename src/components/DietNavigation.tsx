import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface DietCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

/**
 * DietNavigation component displays a scrollable list of diet categories
 * with navigation capabilities
 */
export function DietNavigation() {
  const navigate = useNavigate();
  
  const { data: categories, isLoading } = useQuery({
    queryKey: ["dietCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("diet_categories")
        .select("*")
        .order("order_index");
      
      if (error) throw error;
      return data as DietCategory[];
    }
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" aria-label="Loading diet categories">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ScrollArea 
      className="h-[calc(100vh-4rem)] px-4"
      aria-label="Diet categories navigation"
    >
      <nav className="space-y-6 py-4">
        {categories?.map((category) => (
          <div 
            key={category.id} 
            className="space-y-2 animate-fade-in"
          >
            <h2 className="text-lg font-semibold tracking-tight">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start group hover:bg-primary/5"
              onClick={() => navigate(`/diets/category/${category.slug}`)}
              aria-label={`View diets in ${category.name} category`}
            >
              <ChevronRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              View Diets
            </Button>
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
}