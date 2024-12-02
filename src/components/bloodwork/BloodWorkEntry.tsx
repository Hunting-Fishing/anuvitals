import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { bloodWorkCategories } from "@/utils/bloodWorkCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BloodWorkMarker {
  id: string;
  code: string;
  name: string;
  unit: string;
  min_range: number;
  max_range: number;
}

export function BloodWorkEntry() {
  const [markers, setMarkers] = useState<BloodWorkMarker[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [testDate, setTestDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase
        .from("blood_work_markers")
        .select("*")
        .order("name");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load blood work markers.",
          variant: "destructive",
        });
        return;
      }

      setMarkers(data);
    };

    fetchMarkers();
  }, [supabase, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const results: Record<string, { value: number; unit: string }> = {};
    markers.forEach((marker) => {
      if (values[marker.code]) {
        results[marker.code] = {
          value: parseFloat(values[marker.code]),
          unit: marker.unit,
        };
      }
    });

    try {
      const { error } = await supabase.from("blood_work_results").insert({
        user_id: user.id,
        test_date: testDate,
        results,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your blood work results have been saved.",
      });
      
      // Clear form
      setValues({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blood work results.",
        variant: "destructive",
      });
    }
  };

  const filteredMarkers = markers.filter((marker) => {
    if (selectedGender === "male" && marker.code === "CA125") return false;
    if (selectedGender === "female" && marker.code === "PSA") return false;
    return true;
  });

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Enter Blood Work Values</h3>
          
          <div className="space-y-2">
            <Label htmlFor="test-date">Test Date</Label>
            <Input
              id="test-date"
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender-Specific Markers</Label>
            <Select
              value={selectedGender}
              onValueChange={setSelectedGender}
            >
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder="Select gender for specific markers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markers</SelectItem>
                <SelectItem value="male">Male-Specific</SelectItem>
                <SelectItem value="female">Female-Specific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {Object.entries(bloodWorkCategories).map(([category, data]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger>{data.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {filteredMarkers
                      .filter((marker) => data.markers.includes(marker.code))
                      .map((marker) => (
                        <div key={marker.code} className="grid grid-cols-3 gap-4 items-center">
                          <Label className="col-span-1">{marker.name}</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={values[marker.code] || ""}
                            onChange={(e) => {
                              setValues({
                                ...values,
                                [marker.code]: e.target.value,
                              });
                            }}
                            placeholder={`${marker.min_range} - ${marker.max_range}`}
                            className="col-span-1"
                          />
                          <span className="text-sm text-gray-500 col-span-1">
                            {marker.unit}
                          </span>
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Button type="submit">Save Results</Button>
      </form>
    </Card>
  );
}