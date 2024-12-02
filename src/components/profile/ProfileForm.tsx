import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { HealthMetricsForm } from "./forms/HealthMetricsForm";
import { DietaryPreferencesForm } from "./forms/DietaryPreferencesForm";
import { FitnessGoalsForm } from "./forms/FitnessGoalsForm";
import { BrandPreferencesForm } from "./forms/BrandPreferencesForm";

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
      <PersonalInfoForm profile={profile} />
      <HealthMetricsForm profile={profile} />
      <DietaryPreferencesForm profile={profile} />
      <FitnessGoalsForm profile={profile} />
      <BrandPreferencesForm profile={profile} />
      
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}