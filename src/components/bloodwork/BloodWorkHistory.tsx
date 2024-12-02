import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface BloodWorkResult {
  id: string;
  test_date: string;
  results: Record<string, { value: number; unit: string }>;
  created_at: string;
}

export function BloodWorkHistory() {
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
        .order("test_date", { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load blood work history.",
          variant: "destructive",
        });
        return;
      }

      setResults(data);
    };

    fetchResults();
  }, [user, supabase, toast]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Blood Work History</h3>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Date</TableHead>
                <TableHead>Hemoglobin</TableHead>
                <TableHead>Glucose</TableHead>
                <TableHead>Cholesterol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    {format(new Date(result.test_date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {result.results.Hemoglobin?.value} {result.results.Hemoglobin?.unit}
                  </TableCell>
                  <TableCell>
                    {result.results.Glucose?.value} {result.results.Glucose?.unit}
                  </TableCell>
                  <TableCell>
                    {result.results.Cholesterol?.value} {result.results.Cholesterol?.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}