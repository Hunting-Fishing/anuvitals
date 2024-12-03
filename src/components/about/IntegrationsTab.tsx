import { Card } from "@/components/ui/card";
import { CurrentIntegrations } from "./integration-sections/CurrentIntegrations";
import { UpcomingIntegrations } from "./integration-sections/UpcomingIntegrations";
import { InfrastructureIntegrations } from "./integration-sections/InfrastructureIntegrations";

export function IntegrationsTab() {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        Integrations
      </h2>

      <CurrentIntegrations />
      <UpcomingIntegrations />
      <InfrastructureIntegrations />
    </Card>
  );
}