import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface BloodWorkResult {
  id: string;
  test_date: string;
  results: Record<string, { value: number; unit: string }>;
}

export function BloodWorkTrends() {
  const [results, setResults] = useState<BloodWorkResult[]>([]);
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("blood_work_results")
        .select("*")
        .order("test_date", { ascending: true });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load blood work trends.",
          variant: "destructive",
        });
        return;
      }

      setResults(data);
    };

    fetchResults();
  }, [user, supabase, toast]);

  const chartData = results.map((result) => ({
    date: format(new Date(result.test_date), "MMM d"),
    Hemoglobin: result.results.Hemoglobin?.value,
    Glucose: result.results.Glucose?.value,
    Cholesterol: result.results.Cholesterol?.value,
  }));

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Blood Work Trends</h3>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Hemoglobin" stroke="#8884d8" />
              <Line type="monotone" dataKey="Glucose" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Cholesterol" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}