import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DietCategory() {
  const { slug } = useParams();
  
  const { data: diets, isLoading } = useQuery({
    queryKey: ["diets", slug],
    queryFn: async () => {
      const { data: category } = await supabase
        .from("diet_categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!category) throw new Error("Category not found");

      const { data: diets } = await supabase
        .from("diets")
        .select("*")
        .eq("category_id", category.id);

      return { category, diets };
    }
  });

  if (isLoading) {
    return <div className="p-8">Loading diets...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{diets?.category.name}</h1>
        {diets?.category.description && (
          <p className="text-muted-foreground mt-2">{diets.category.description}</p>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diets?.diets?.map((diet) => (
            <Card key={diet.id}>
              <CardHeader>
                <CardTitle>{diet.name}</CardTitle>
                <CardDescription>{diet.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {diet.is_therapeutic && (
                  <Badge variant="secondary" className="mb-2">Therapeutic</Badge>
                )}
                {diet.core_principles && (
                  <p className="text-sm text-muted-foreground">{diet.core_principles}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}