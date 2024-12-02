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
      weight_goals: formData.get("weight_goals"),
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
    <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="grid gap-4 md:grid-cols-2">
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
              <Label htmlFor="weight_goals">Weight Goals</Label>
              <Select name="weight_goals" defaultValue={profile.weight_goals || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select weight goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                  <SelectItem value="none">No Specific Goal</SelectItem>
                </SelectContent>
              </Select>
            </div>
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