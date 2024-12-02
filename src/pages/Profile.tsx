import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    avatar_url: "",
    dietary_preferences: [] as string[],
    health_conditions: [] as string[],
    allergies: [] as string[],
    preferred_diet_type: "",
    weight_goals: "",
  });

  useEffect(() => {
    console.log("Current user:", user); // Debug log
    if (!user) {
      console.log("No user, redirecting to auth"); // Debug log
      navigate("/auth");
      return;
    }
    getProfile();
  }, [user]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!user) return;

      console.log("Fetching profile for user:", user.id); // Debug log

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("Profile data:", data); // Debug log
      console.log("Profile error:", error); // Debug log

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          username: data.username || "",
          avatar_url: data.avatar_url || "",
          dietary_preferences: data.dietary_preferences || [],
          health_conditions: data.health_conditions || [],
          allergies: data.allergies || [],
          preferred_diet_type: data.preferred_diet_type || "",
          weight_goals: data.weight_goals || "",
        });
      }
    } catch (error) {
      console.error("Profile fetch error:", error); // Debug log
      toast({
        title: "Error",
        description: "Error loading profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      if (!user) return;

      console.log("Updating profile for user:", user.id); // Debug log
      console.log("Update data:", profile); // Debug log

      const updates = {
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates)
        .eq("id", user.id);

      if (error) {
        console.error("Profile update error:", error); // Debug log
        throw error;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Error updating profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <Card className="p-6">
        <div className="space-y-6">
          {loading ? (
            <div>Loading profile...</div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  placeholder="Choose a username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_diet_type">Preferred Diet Type</Label>
                <Select
                  value={profile.preferred_diet_type}
                  onValueChange={(value) =>
                    setProfile({ ...profile, preferred_diet_type: value })
                  }
                >
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
                <Select
                  value={profile.weight_goals}
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
                    <SelectItem value="none">No Specific Goal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={updateProfile}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;