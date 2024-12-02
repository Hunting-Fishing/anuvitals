import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileFormProps {
  profile: any;
  loading: boolean;
  onUpdateProfile: (updates: any) => Promise<void>;
}

export function ProfileForm({ profile, loading, onUpdateProfile }: ProfileFormProps) {
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const updates = {
      full_name: formData.get("full_name"),
      username: formData.get("username"),
      preferred_diet_type: formData.get("preferred_diet_type"),
      height_cm: Number(formData.get("height_cm")),
      current_weight_kg: Number(formData.get("current_weight_kg")),
      target_weight_kg: Number(formData.get("target_weight_kg")),
      avoid_harmful_additives: formData.get("avoid_harmful_additives") === "true",
      // Convert comma-separated strings to arrays
      allergies: formData.get("allergies")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [],
      dietary_preferences: formData.get("dietary_preferences")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [],
      fitness_goals: formData.get("fitness_goals")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [],
      brands_to_support: formData.get("brands_to_support")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [],
      brands_to_avoid: formData.get("brands_to_avoid")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [],
    };

    try {
      await onUpdateProfile(updates);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={profile.full_name || ""}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={profile.username || ""}
                placeholder="Choose a username"
              />
            </div>
          </div>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Brand Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brands_to_support">Brands to Support</Label>
            <Input
              id="brands_to_support"
              name="brands_to_support"
              defaultValue={profile.brands_to_support?.join(", ") || ""}
              placeholder="Enter brands to support (comma-separated)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brands_to_avoid">Brands to Avoid</Label>
            <Input
              id="brands_to_avoid"
              name="brands_to_avoid"
              defaultValue={profile.brands_to_avoid?.join(", ") || ""}
              placeholder="Enter brands to avoid (comma-separated)"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}