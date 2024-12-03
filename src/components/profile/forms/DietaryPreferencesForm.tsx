import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DietTypeSection } from "./dietary/DietTypeSection";
import { AllergiesSection } from "./dietary/AllergiesSection";
import { PreferencesSection } from "./dietary/PreferencesSection";
import { AdditivesSection } from "./dietary/AdditivesSection";
import { COMMON_ALLERGIES } from "./dietary/constants";

interface DietaryPreferencesFormProps {
  profile: any;
}

export function DietaryPreferencesForm({ profile }: DietaryPreferencesFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DietTypeSection profile={profile} />
        <AllergiesSection profile={profile} commonAllergies={COMMON_ALLERGIES} />
        <PreferencesSection profile={profile} />
        <AdditivesSection profile={profile} />
      </CardContent>
    </Card>
  );
}