import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FitnessGoalsFormProps {
  profile: any;
}

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Improve Endurance",
  "Increase Flexibility",
  "Better Posture",
  "Reduce Body Fat",
  "Build Strength",
  "Improve Balance",
  "Sports Performance",
  "General Fitness",
  "Stress Reduction",
  "Better Sleep",
  "Increase Energy",
  "Heart Health",
  "Mental Clarity"
];

export function FitnessGoalsForm({ profile }: FitnessGoalsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fitness Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fitness_goals">Select Your Fitness Goals</Label>
          <Input
            id="fitness_goals"
            name="fitness_goals"
            defaultValue={profile.fitness_goals?.join(", ") || ""}
            placeholder="Enter or select fitness goals (comma-separated)"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {FITNESS_GOALS.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={(e) => {
                  const input = document.getElementById("fitness_goals") as HTMLInputElement;
                  const currentGoals = input.value.split(",").map(g => g.trim()).filter(Boolean);
                  if (currentGoals.includes(goal)) {
                    input.value = currentGoals.filter(g => g !== goal).join(", ");
                  } else {
                    input.value = [...currentGoals, goal].join(", ");
                  }
                }}
                className={`p-2 text-sm rounded-md border transition-colors
                  ${profile.fitness_goals?.includes(goal) 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background hover:bg-secondary"}`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}