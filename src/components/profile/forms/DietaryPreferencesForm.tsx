import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DietaryPreferencesFormProps {
  profile: any;
}

const COMMON_ALLERGIES = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
  "Celery",
  "Mustard",
  "Lupin",
  "Sulfites",
  "Gluten",
  "Corn",
  "Berries",
  "Citrus Fruits",
  "Other"
];

export function DietaryPreferencesForm({ profile }: DietaryPreferencesFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="preferred_diet_type">Preferred Diet Type</Label>
          <Select name="preferred_diet_type" defaultValue={profile.preferred_diet_type || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="none">No Specific Diet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Input
            id="allergies"
            name="allergies"
            defaultValue={profile.allergies?.join(", ") || ""}
            placeholder="Enter or select allergies (comma-separated)"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {COMMON_ALLERGIES.map((allergy) => (
              <button
                key={allergy}
                type="button"
                onClick={(e) => {
                  const input = document.getElementById("allergies") as HTMLInputElement;
                  const currentAllergies = input.value.split(",").map(a => a.trim()).filter(Boolean);
                  if (currentAllergies.includes(allergy)) {
                    input.value = currentAllergies.filter(a => a !== allergy).join(", ");
                  } else {
                    input.value = [...currentAllergies, allergy].join(", ");
                  }
                }}
                className={`p-2 text-sm rounded-md border transition-colors
                  ${profile.allergies?.includes(allergy) 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background hover:bg-secondary"}`}
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dietary_preferences">Dietary Preferences</Label>
          <Input
            id="dietary_preferences"
            name="dietary_preferences"
            defaultValue={profile.dietary_preferences?.join(", ") || ""}
            placeholder="Enter dietary preferences (comma-separated)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additives_to_avoid">Additives to Avoid</Label>
          <Select name="additives_to_avoid" defaultValue={profile.additives_to_avoid?.length === 0 ? "none" : "custom"}>
            <SelectTrigger>
              <SelectValue placeholder="Select additives preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Avoid All Additives</SelectItem>
              <SelectItem value="harmful">Avoid Harmful Additives Only</SelectItem>
              <SelectItem value="custom">Custom Selection</SelectItem>
              <SelectItem value="none">No Restrictions</SelectItem>
            </SelectContent>
          </Select>
          {profile.additives_to_avoid?.length > 0 && (
            <Input
              className="mt-2"
              name="additives_custom"
              defaultValue={profile.additives_to_avoid?.join(", ") || ""}
              placeholder="Enter specific additives to avoid (comma-separated)"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}