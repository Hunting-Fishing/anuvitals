import { Card } from "@/components/ui/card";

/**
 * Properties for the IntegrationCard component
 */
interface IntegrationCardProps {
  /** Icon component to display */
  icon: React.ReactNode;
  /** Integration title */
  title: string;
  /** Description of the integration */
  description: string;
  /** List of features or capabilities */
  features: string[];
}

/**
 * IntegrationCard component displays information about a specific integration
 * with its features and description in an animated, interactive card
 */
export function IntegrationCard({ icon, title, description, features }: IntegrationCardProps) {
  const titleId = `integration-title-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div 
      className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in"
      role="article"
      aria-labelledby={titleId}
    >
      <div 
        className="mb-4 transform transition-transform group-hover:scale-110" 
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 
        id={titleId}
        className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors"
      >
        {title}
      </h3>
      <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
        {description}
      </p>
      <ul 
        className="list-disc list-inside space-y-2 text-muted-foreground"
        aria-label={`${title} features`}
      >
        {features.map((feature, featureIndex) => (
          <li 
            key={featureIndex} 
            className="group-hover:text-foreground transition-colors"
          >
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}