import { FlaskConical } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";

const upcomingIntegrations = [
  {
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    title: "Nutritionix API (Coming Soon)",
    description: "Professional nutrition database integration.",
    features: [
      "Branded food database",
      "Restaurant menu items",
      "Exercise calorie tracking",
      "Natural language processing"
    ]
  }
];

export function UpcomingIntegrations() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-primary/80">Upcoming Integrations</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingIntegrations.map((integration, index) => (
          <IntegrationCard key={index} {...integration} />
        ))}
      </div>
    </div>
  );
}