import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BrandPreferencesFormProps {
  profile: any;
}

export function BrandPreferencesForm({ profile }: BrandPreferencesFormProps) {
  return (
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
  );
}