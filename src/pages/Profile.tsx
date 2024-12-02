import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const session = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    allergies: [] as string[],
    dietary_preferences: [] as string[],
    health_conditions: [] as string[],
    preferred_diet_type: "",
    weight_goals: "",
  });
  const [newAllergy, setNewAllergy] = useState("");
  const [newDietaryPreference, setNewDietaryPreference] = useState("");
  const [newHealthCondition, setNewHealthCondition] = useState("");

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      if (!session?.user) throw new Error("No user");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error loading profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      if (!session?.user) throw new Error("No user");

      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  const addItem = (field: keyof typeof profile, value: string) => {
    if (value && Array.isArray(profile[field])) {
      setProfile({
        ...profile,
        [field]: [...(profile[field] as string[]), value],
      });
    }
  };

  const removeItem = (field: keyof typeof profile, index: number) => {
    if (Array.isArray(profile[field])) {
      const newArray = [...(profile[field] as string[])];
      newArray.splice(index, 1);
      setProfile({
        ...profile,
        [field]: newArray,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input
              value={profile.username || ""}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              value={profile.full_name || ""}
              onChange={(e) =>
                setProfile({ ...profile, full_name: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Information</CardTitle>
          <CardDescription>Manage your health preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Allergies</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergy"
              />
              <Button
                onClick={() => {
                  addItem("allergies", newAllergy);
                  setNewAllergy("");
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.allergies.map((allergy, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeItem("allergies", index)}
                >
                  {allergy} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Dietary Preferences
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newDietaryPreference}
                onChange={(e) => setNewDietaryPreference(e.target.value)}
                placeholder="Add dietary preference"
              />
              <Button
                onClick={() => {
                  addItem("dietary_preferences", newDietaryPreference);
                  setNewDietaryPreference("");
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.dietary_preferences.map((pref, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeItem("dietary_preferences", index)}
                >
                  {pref} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Health Conditions
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newHealthCondition}
                onChange={(e) => setNewHealthCondition(e.target.value)}
                placeholder="Add health condition"
              />
              <Button
                onClick={() => {
                  addItem("health_conditions", newHealthCondition);
                  setNewHealthCondition("");
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.health_conditions.map((condition, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeItem("health_conditions", index)}
                >
                  {condition} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Diet Type
            </label>
            <Select
              value={profile.preferred_diet_type || ""}
              onValueChange={(value) =>
                setProfile({ ...profile, preferred_diet_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="omnivore">Omnivore</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="pescatarian">Pescatarian</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Weight Goals</label>
            <Select
              value={profile.weight_goals || ""}
              onValueChange={(value) =>
                setProfile({ ...profile, weight_goals: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={updateProfile} className="w-full md:w-auto">
          Save Changes
        </Button>
      </div>
    </div>
  );
}