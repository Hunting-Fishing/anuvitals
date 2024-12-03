import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Brain } from "lucide-react";

export function HealthAnalysisView() {
  const [query, setQuery] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleAnalysis = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('health-analysis', {
        body: { userId: user.id, query }
      });

      if (error) throw error;
      setAnalysis(data.analysis);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze health data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your health data, blood work results, or request personalized recommendations..."
          className="min-h-[100px] resize-none"
        />
        <Button 
          onClick={handleAnalysis}
          disabled={isLoading || !query.trim()}
          className="self-end"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Analyze Health Data
            </>
          )}
        </Button>
      </div>

      {analysis && (
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50">
          <CardContent className="p-6 space-y-4">
            <div className="prose prose-invert max-w-none">
              {analysis.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}