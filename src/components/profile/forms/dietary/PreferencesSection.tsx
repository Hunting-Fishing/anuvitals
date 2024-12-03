import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PreferencesSectionProps {
  profile: any;
}

export function PreferencesSection({ profile }: PreferencesSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="dietary_preferences">Dietary Preferences</Label>
      <Input
        id="dietary_preferences"
        name="dietary_preferences"
        defaultValue={profile.dietary_preferences?.join(", ") || ""}
        placeholder="Enter dietary preferences (comma-separated)"
      />
    </div>
  );
}