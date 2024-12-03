import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdditivesSectionProps {
  profile: any;
}

export function AdditivesSection({ profile }: AdditivesSectionProps) {
  return (
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
  );
}