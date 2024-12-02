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
import { bloodWorkCategories } from "@/utils/bloodWorkCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BloodWorkResult {
  id: string;
  test_date: string;
  results: Record<string, { value: number; unit: string }>;
}

interface BloodWorkMarker {
  id: string;
  code: string;
  name: string;
  unit: string;
  min_range: number;
  max_range: number;
}

export function BloodWorkHistory() {
  const [results, setResults] = useState<BloodWorkResult[]>([]);
  const [markers, setMarkers] = useState<BloodWorkMarker[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Fetch markers
      const { data: markersData, error: markersError } = await supabase
        .from("blood_work_markers")
        .select("*")
        .order("name");

      if (markersError) {
        toast({
          title: "Error",
          description: "Failed to load blood work markers.",
          variant: "destructive",
        });
        return;
      }

      setMarkers(markersData);

      // Fetch results
      const { data: resultsData, error: resultsError } = await supabase
        .from("blood_work_results")
        .select("*")
        .order("test_date", { ascending: false });

      if (resultsError) {
        toast({
          title: "Error",
          description: "Failed to load blood work history.",
          variant: "destructive",
        });
        return;
      }

      setResults(resultsData);
    };

    fetchData();
  }, [user, supabase, toast]);

  const getDisplayMarkers = () => {
    if (selectedCategory === "all") return markers;
    return markers.filter(marker => {
      for (const [category, data] of Object.entries(bloodWorkCategories)) {
        if (category === selectedCategory && data.markers.includes(marker.code)) {
          return true;
        }
      }
      return false;
    });
  };

  const getCellClass = (value: number, min_range: number, max_range: number) => {
    if (value < min_range) return "text-yellow-600 dark:text-yellow-400";
    if (value > max_range) return "text-red-600 dark:text-red-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Blood Work History</h3>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(bloodWorkCategories).map(([key, data]) => (
                <SelectItem key={key} value={key}>
                  {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Date</TableHead>
                {getDisplayMarkers().map((marker) => (
                  <TableHead key={marker.code} title={`${marker.min_range} - ${marker.max_range} ${marker.unit}`}>
                    {marker.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    {format(new Date(result.test_date), "MMM d, yyyy")}
                  </TableCell>
                  {getDisplayMarkers().map((marker) => {
                    const value = result.results[marker.code]?.value;
                    return (
                      <TableCell
                        key={marker.code}
                        className={value ? getCellClass(value, marker.min_range, marker.max_range) : ""}
                      >
                        {value ? `${value} ${marker.unit}` : "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}