import { Laptop, Microscope, Shield, Zap, FlaskConical, Brain, Database, Search, Cookie } from "lucide-react";
import { Card } from "@/components/ui/card";

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

const infrastructureIntegrations = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Supabase Integration",
    description: "Secure data storage and authentication infrastructure.",
    features: [
      "User authentication and profile management",
      "Secure storage of health data",
      "Real-time data synchronization"
    ]
  },
  {
    icon: <Database className="w-8 h-8 text-primary" />,
    title: "Database Management",
    description: "Robust data management and storage solutions.",
    features: [
      "PostgreSQL database integration",
      "Automated backups",
      "Data encryption at rest"
    ]
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "API Infrastructure",
    description: "Modern API architecture and integrations.",
    features: [
      "RESTful API endpoints",
      "Real-time WebSocket connections",
      "Secure API authentication"
    ]
  }
];

export function IntegrationsTab() {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        Integrations
      </h2>

      {/* Current Integrations Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary/80">Current Integrations</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentIntegrations.map((integration, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 transform transition-transform group-hover:scale-110">
                {integration.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors">
                {integration.title}
              </h3>
              <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                {integration.description}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {integration.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="group-hover:text-foreground transition-colors">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Integrations Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-primary/80">Upcoming Integrations</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingIntegrations.map((integration, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 transform transition-transform group-hover:scale-110">
                {integration.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors">
                {integration.title}
              </h3>
              <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                {integration.description}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {integration.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="group-hover:text-foreground transition-colors">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary/80">Infrastructure & Security</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infrastructureIntegrations.map((integration, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 transform transition-transform group-hover:scale-110">
                {integration.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors">
                {integration.title}
              </h3>
              <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                {integration.description}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {integration.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="group-hover:text-foreground transition-colors">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}