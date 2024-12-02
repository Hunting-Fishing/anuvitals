import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthMetricsFormProps {
  profile: any;
}

export function HealthMetricsForm({ profile }: HealthMetricsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="height_cm">Height (cm)</Label>
            <Input
              id="height_cm"
              name="height_cm"
              type="number"
              defaultValue={profile.height_cm || ""}
              placeholder="Enter height in cm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_weight_kg">Current Weight (kg)</Label>
            <Input
              id="current_weight_kg"
              name="current_weight_kg"
              type="number"
              step="0.1"
              defaultValue={profile.current_weight_kg || ""}
              placeholder="Enter current weight"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target_weight_kg">Target Weight (kg)</Label>
            <Input
              id="target_weight_kg"
              name="target_weight_kg"
              type="number"
              step="0.1"
              defaultValue={profile.target_weight_kg || ""}
              placeholder="Enter target weight"
            />
          </div>
        </div>
        {profile.bmi && (
          <div className="bg-secondary/10 p-4 rounded-lg">
            <Label>BMI</Label>
            <p className="text-2xl font-bold">{profile.bmi}</p>
            <p className="text-sm text-muted-foreground">
              Body Mass Index (automatically calculated)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}