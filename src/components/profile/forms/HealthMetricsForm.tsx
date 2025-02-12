
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Info, Ruler, Weight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HealthMetricsFormProps {
  profile: any;
}

export function HealthMetricsForm({ profile }: HealthMetricsFormProps) {
  const [useMetric, setUseMetric] = useState(true);
  
  // Conversion functions
  const cmToFeet = (cm: number) => {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return { feet, inches: remainingInches };
  };

  const feetToCm = (feet: number, inches: number) => {
    return Math.round((feet * 12 + inches) * 2.54);
  };

  const kgToLbs = (kg: number) => Math.round(kg * 2.20462);
  const lbsToKg = (lbs: number) => Math.round(lbs / 2.20462 * 10) / 10;

  // Convert height for display
  const heightInFeet = profile.height_cm ? cmToFeet(profile.height_cm) : { feet: 0, inches: 0 };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obese", color: "text-red-500" };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Health Metrics</CardTitle>
          <div className="flex items-center gap-2">
            <Toggle
              pressed={useMetric}
              onPressedChange={setUseMetric}
              aria-label="Toggle metric/imperial"
            >
              {useMetric ? "Metric" : "Imperial"}
            </Toggle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              <Label htmlFor="height">Height</Label>
            </div>
            {useMetric ? (
              <Input
                id="height_cm"
                name="height_cm"
                type="number"
                defaultValue={profile.height_cm || ""}
                placeholder="Enter height in cm"
              />
            ) : (
              <div className="flex gap-2">
                <Input
                  id="height_feet"
                  name="height_feet"
                  type="number"
                  defaultValue={heightInFeet.feet}
                  placeholder="Feet"
                  className="w-20"
                />
                <Input
                  id="height_inches"
                  name="height_inches"
                  type="number"
                  defaultValue={heightInFeet.inches}
                  placeholder="Inches"
                  className="w-20"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4" />
              <Label htmlFor="current_weight">Current Weight</Label>
            </div>
            <Input
              id="current_weight"
              name="current_weight"
              type="number"
              step="0.1"
              defaultValue={useMetric ? 
                profile.current_weight_kg : 
                (profile.current_weight_kg ? kgToLbs(profile.current_weight_kg) : "")}
              placeholder={`Enter weight in ${useMetric ? 'kg' : 'lbs'}`}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4" />
              <Label htmlFor="target_weight">Target Weight</Label>
            </div>
            <Input
              id="target_weight"
              name="target_weight"
              type="number"
              step="0.1"
              defaultValue={useMetric ? 
                profile.target_weight_kg : 
                (profile.target_weight_kg ? kgToLbs(profile.target_weight_kg) : "")}
              placeholder={`Enter target weight in ${useMetric ? 'kg' : 'lbs'}`}
            />
          </div>
        </div>
        {profile.bmi && (
          <div className="bg-secondary/10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Label>BMI (Body Mass Index)</Label>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Understanding BMI</h4>
                      <p className="text-sm">BMI is a measure of body fat based on height and weight. Categories:</p>
                      <ul className="text-sm space-y-1">
                        <li className="text-blue-500">Underweight: Below 18.5</li>
                        <li className="text-green-500">Normal weight: 18.5-24.9</li>
                        <li className="text-yellow-500">Overweight: 25-29.9</li>
                        <li className="text-red-500">Obese: 30 or greater</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-2">
                        Note: BMI is a general indicator and doesn't account for factors like muscle mass, age, or gender.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <span className={`text-2xl font-bold ${getBMICategory(profile.bmi).color}`}>
                {profile.bmi}
              </span>
            </div>
            <p className={`text-sm ${getBMICategory(profile.bmi).color}`}>
              Category: {getBMICategory(profile.bmi).category}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
