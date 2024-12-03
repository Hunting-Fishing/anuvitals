import { Microscope, Search, Cookie } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";

const currentIntegrations = [
  {
    icon: <Microscope className="w-8 h-8 text-primary" />,
    title: "OpenAI Integration",
    description: "Advanced AI-powered health analysis and recommendations.",
    features: [
      "GPT-4 powered diet recommendations",
      "Intelligent food analysis",
      "Personalized health insights"
    ]
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Edamam Recipe API",
    description: "Comprehensive recipe search and nutrition analysis.",
    features: [
      "Advanced recipe search",
      "Dietary preferences filtering",
      "Detailed nutritional information",
      "Health labels and allergens"
    ]
  },
  {
    icon: <Cookie className="w-8 h-8 text-primary" />,
    title: "Spoonacular API",
    description: "Rich food and recipe data integration.",
    features: [
      "Complex recipe search",
      "Cuisine-based filtering",
      "Meal type categorization",
      "Preparation time estimates"
    ]
  }
];

export function CurrentIntegrations() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-primary/80">Current Integrations</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentIntegrations.map((integration, index) => (
          <IntegrationCard key={index} {...integration} />
        ))}
      </div>
    </div>
  );
}