import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSuggestAllergy } from "./hooks/useSuggestAllergy";

interface AllergiesSectionProps {
  profile: any;
  commonAllergies: string[];
}

export function AllergiesSection({ profile, commonAllergies }: AllergiesSectionProps) {
  const [showAllergyInput, setShowAllergyInput] = useState(false);
  const { suggestAllergy, newAllergy, setNewAllergy } = useSuggestAllergy();

  return (
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
        {commonAllergies.map((allergy) => (
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
            <Button type="button" onClick={suggestAllergy}>
              Submit for Review
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowAllergyInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}