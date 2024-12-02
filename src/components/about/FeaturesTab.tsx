import { Brain, Dna, FlaskConical, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Product Scanning",
    description: "Scan food products to get detailed nutritional information and health analysis.",
  },
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "Blood Work Analysis",
    description: "Upload and track your blood work results with automated analysis and recommendations.",
  },
  {
    icon: <Dna className="w-8 h-8 text-primary" />,
    title: "Diet Guides",
    description: "Access comprehensive diet guides and nutritional recommendations.",
  },
  {
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    title: "Health Tracking",
    description: "Monitor your nutritional progress and health metrics over time.",
  },
];

export function FeaturesTab() {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Key Features
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 transform transition-transform group-hover:scale-110">
              {feature.icon}
            </div>
            <h3 className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors">
              {feature.title}
            </h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}