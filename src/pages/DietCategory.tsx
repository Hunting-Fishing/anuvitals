import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DietDetails } from "@/components/DietDetails";
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
        <div className="space-y-6">
          {diets?.diets?.map((diet) => (
            <DietDetails key={diet.id} dietId={diet.id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}