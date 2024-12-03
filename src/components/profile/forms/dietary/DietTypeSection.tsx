import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSuggestDietType } from "./hooks/useSuggestDietType";

interface DietTypeSectionProps {
  profile: any;
}

export function DietTypeSection({ profile }: DietTypeSectionProps) {
  const [showDietTypeInput, setShowDietTypeInput] = useState(false);
  const { suggestDietType, newDietType, setNewDietType } = useSuggestDietType();

  return (
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
            <Button type="button" onClick={suggestDietType}>
              Submit for Review
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowDietTypeInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}