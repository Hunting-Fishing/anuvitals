import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface BloodWorkValue {
  marker: string;
  value: string;
  unit: string;
}

export function BloodWorkEntry() {
  const [values, setValues] = useState<BloodWorkValue[]>([
    { marker: "Hemoglobin", value: "", unit: "g/dL" },
    { marker: "Glucose", value: "", unit: "mg/dL" },
    { marker: "Cholesterol", value: "", unit: "mg/dL" },
  ]);
  const [testDate, setTestDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.from("blood_work_results").insert({
        user_id: user.id,
        test_date: testDate,
        results: values.reduce((acc, { marker, value, unit }) => {
          acc[marker] = { value: parseFloat(value), unit };
          return acc;
        }, {} as Record<string, { value: number; unit: string }>),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your blood work results have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blood work results.",
        variant: "destructive",
      });
    }
  };

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

          {values.map((value, index) => (
            <div key={value.marker} className="grid grid-cols-3 gap-4">
              <Label className="self-center">{value.marker}</Label>
              <Input
                type="number"
                step="0.01"
                value={value.value}
                onChange={(e) => {
                  const newValues = [...values];
                  newValues[index].value = e.target.value;
                  setValues(newValues);
                }}
                placeholder={`Enter ${value.marker}`}
              />
              <span className="self-center text-sm text-gray-500">{value.unit}</span>
            </div>
          ))}
        </div>

        <Button type="submit">Save Results</Button>
      </form>
    </Card>
  );
}