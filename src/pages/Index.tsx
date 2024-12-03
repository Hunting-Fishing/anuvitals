import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { QuickActionCards } from "@/components/home/QuickActionCards";
import { HealthOverview } from "@/components/home/HealthOverview";
import { GettingStartedGuide } from "@/components/home/GettingStartedGuide";

export default function IndexPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <WelcomeHeader />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <QuickActionCards />
          <HealthOverview />
        </div>
        <div className="md:pl-4">
          <GettingStartedGuide />
        </div>
      </div>
    </div>
  );
}