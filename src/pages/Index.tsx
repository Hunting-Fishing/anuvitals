import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Index() {
  const { data: diets, isLoading } = useQuery({
    queryKey: ['diets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('diets')
        .select(`
          *,
          food_recommendations(food_name, food_category, notes),
          food_restrictions(food_name, food_category, reason),
          goals_and_benefits(goal, description),
          diet_tags(tag)
        `);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Diet Plans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diets?.map((diet) => (
          <Card key={diet.id} className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{diet.name}</CardTitle>
                  <CardDescription>{diet.description}</CardDescription>
                </div>
                {diet.is_therapeutic && (
                  <Badge variant="secondary">Therapeutic</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="foods">Foods</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Core Principles</h4>
                    <p className="text-sm text-muted-foreground">{diet.core_principles}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Target Demographic</h4>
                    <p className="text-sm text-muted-foreground">{diet.target_demographic}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Origin</h4>
                    <p className="text-sm text-muted-foreground">{diet.origin}</p>
                  </div>
                </TabsContent>

                <TabsContent value="foods">
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Recommended Foods</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {diet.food_recommendations?.map((rec, index) => (
                            <li key={index}>
                              {rec.food_name} 
                              {rec.food_category && <span className="text-xs"> ({rec.food_category})</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">Restricted Foods</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {diet.food_restrictions?.map((res, index) => (
                            <li key={index}>
                              {res.food_name}
                              {res.reason && <span className="text-xs"> - {res.reason}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="goals">
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-2">
                      {diet.goals_and_benefits?.map((goal, index) => (
                        <div key={index} className="border-b pb-2">
                          <h4 className="font-semibold">{goal.goal}</h4>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="tags">
                  <div className="flex flex-wrap gap-2">
                    {diet.diet_tags?.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag.tag}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}