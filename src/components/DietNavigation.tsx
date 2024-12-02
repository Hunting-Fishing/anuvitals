import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      return data;
    }
  });

  if (isLoading) {
    return <div className="p-4">Loading categories...</div>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] px-4">
      <div className="space-y-6 py-4">
        {categories?.map((category) => (
          <div key={category.id} className="space-y-2">
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
              className="w-full justify-start"
              onClick={() => navigate(`/diets/category/${category.slug}`)}
            >
              <ChevronRight className="mr-2 h-4 w-4" />
              View Diets
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}