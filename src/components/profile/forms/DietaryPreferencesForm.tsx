import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  const { toast } = useToast();
  const [newAllergy, setNewAllergy] = useState("");
  const [newDietType, setNewDietType] = useState("");
  const [showAllergyInput, setShowAllergyInput] = useState(false);
  const [showDietTypeInput, setShowDietTypeInput] = useState(false);

  const handleSuggestAllergy = async () => {
    try {
      const { error } = await supabase
        .from('suggested_health_items')
        .insert({
          item_type: 'allergy',
          suggestion: newAllergy,
        });

      if (error) throw error;

      toast({
        title: "Suggestion submitted",
        description: "Your allergy suggestion has been submitted for review.",
      });
      setNewAllergy("");
      setShowAllergyInput(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSuggestDietType = async () => {
    try {
      const { error } = await supabase
        .from('suggested_health_items')
        .insert({
          item_type: 'diet_type',
          suggestion: newDietType,
        });

      if (error) throw error;

      toast({
        title: "Suggestion submitted",
        description: "Your diet type suggestion has been submitted for review.",
      });
      setNewDietType("");
      setShowDietTypeInput(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit suggestion. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="preferred_diet_type">Preferred Diet Type</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowDietTypeInput(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Suggest New
            </Button>
          </div>
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
          {showDietTypeInput && (
            <div className="mt-2 space-y-2">
              <Input
                value={newDietType}
                onChange={(e) => setNewDietType(e.target.value)}
                placeholder="Enter new diet type"
              />
              <div className="flex space-x-2">
                <Button type="button" onClick={handleSuggestDietType}>
                  Submit for Review
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowDietTypeInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="allergies">Allergies</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAllergyInput(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Suggest New
            </Button>
          </div>
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
          {showAllergyInput && (
            <div className="mt-2 space-y-2">
              <Input
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Enter new allergy"
              />
              <div className="flex space-x-2">
                <Button type="button" onClick={handleSuggestAllergy}>
                  Submit for Review
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowAllergyInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
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