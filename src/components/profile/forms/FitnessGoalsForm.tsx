import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FitnessGoalsFormProps {
  profile: any;
}

export function FitnessGoalsForm({ profile }: FitnessGoalsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fitness Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fitness_goals">Fitness Goals</Label>
          <Input
            id="fitness_goals"
            name="fitness_goals"
            defaultValue={profile.fitness_goals?.join(", ") || ""}
            placeholder="Enter fitness goals (comma-separated)"
          />
        </div>
      </CardContent>
    </Card>
  );
}