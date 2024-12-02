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
            placeholder="Enter allergies (comma-separated)"
          />
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

        <div className="flex items-center space-x-2">
          <Switch
            id="avoid_harmful_additives"
            name="avoid_harmful_additives"
            defaultChecked={profile.avoid_harmful_additives}
          />
          <Label htmlFor="avoid_harmful_additives">Avoid products with harmful additives</Label>
        </div>
      </CardContent>
    </Card>
  );
}