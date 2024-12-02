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
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";
import { bloodWorkCategories } from "@/utils/bloodWorkCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BloodWorkMarker {
  id: string;
  code: string;
  name: string;
  unit: string;
  min_range: number;
  max_range: number;
}

export function BloodWorkTrends() {
  const [results, setResults] = useState<any[]>([]);
  const [markers, setMarkers] = useState<BloodWorkMarker[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("cbc");
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

      const formattedData = data.map((result) => ({
        date: format(new Date(result.test_date), "MMM d"),
        ...Object.entries(result.results).reduce((acc, [code, data]: [string, any]) => ({
          ...acc,
          [code]: data.value,
        }), {}),
      }));

      setResults(formattedData);
    };

    fetchData();
  }, [user, supabase, toast]);

  const getCategoryMarkers = () => {
    return markers.filter(
      marker => bloodWorkCategories[selectedCategory]?.markers.includes(marker.code)
    );
  };

  const colors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000",
    "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Blood Work Trends</h3>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(bloodWorkCategories).map(([key, data]) => (
                <SelectItem key={key} value={key}>
                  {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {getCategoryMarkers().map((marker, index) => (
                <React.Fragment key={marker.code}>
                  <ReferenceLine
                    y={marker.min_range}
                    stroke={colors[index]}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                  <ReferenceLine
                    y={marker.max_range}
                    stroke={colors[index]}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                  <Line
                    type="monotone"
                    dataKey={marker.code}
                    name={marker.name}
                    stroke={colors[index]}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </React.Fragment>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}