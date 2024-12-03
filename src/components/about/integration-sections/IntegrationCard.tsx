import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface IntegrationFeature {
  feature: string;
}

interface IntegrationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export function IntegrationCard({ icon, title, description, features }: IntegrationCardProps) {
  return (
    <div className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 transform transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
        {description}
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {features.map((feature, featureIndex) => (
          <li key={featureIndex} className="group-hover:text-foreground transition-colors">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}