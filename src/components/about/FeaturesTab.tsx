import { Brain, Dna, FlaskConical, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Feature data structure defining the properties of each feature card
 */
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** Optional link to more detailed documentation */
  learnMoreLink?: string;
}

const features: Feature[] = [
  {
    icon: <Search className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Product Scanning",
    description: "Scan food products to get detailed nutritional information and health analysis.",
    learnMoreLink: "/scan"
  },
  {
    icon: <Brain className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Blood Work Analysis",
    description: "Upload and track your blood work results with automated analysis and recommendations.",
    learnMoreLink: "/bloodwork"
  },
  {
    icon: <Dna className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Diet Guides",
    description: "Access comprehensive diet guides and nutritional recommendations.",
    learnMoreLink: "/diets/category/all"
  },
  {
    icon: <FlaskConical className="w-8 h-8 text-primary" aria-hidden="true" />,
    title: "Health Tracking",
    description: "Monitor your nutritional progress and health metrics over time.",
    learnMoreLink: "/profile"
  },
];

/**
 * FeaturesTab component displays the main features of the application
 * in a responsive grid layout with animated cards
 */
export function FeaturesTab() {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
      <h2 
        className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        id="features-section"
      >
        Key Features
      </h2>
      <div 
        className="grid gap-6 md:grid-cols-2"
        role="list"
        aria-labelledby="features-section"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in"
            role="listitem"
            tabIndex={0}
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
            {feature.learnMoreLink && (
              <a 
                href={feature.learnMoreLink}
                className="mt-4 inline-block text-sm text-primary hover:text-accent transition-colors story-link"
                aria-label={`Learn more about ${feature.title}`}
              >
                Learn more →
              </a>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}