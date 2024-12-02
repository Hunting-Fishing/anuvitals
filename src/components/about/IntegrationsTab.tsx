import { Laptop, Microscope, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const integrations = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Supabase Integration",
    description: "Secure data storage and authentication powered by Supabase.",
    features: [
      "User authentication and profile management",
      "Secure storage of health data",
      "Real-time data synchronization"
    ]
  },
  {
    icon: <Microscope className="w-8 h-8 text-primary" />,
    title: "OpenAI Integration",
    description: "Advanced AI-powered analysis and recommendations.",
    features: [
      "GPT-4 powered diet recommendations",
      "Intelligent food analysis",
      "Personalized health insights"
    ]
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Open Food Facts API",
    description: "Comprehensive food database integration.",
    features: [
      "Access to global food database",
      "Detailed nutritional information",
      "Product barcode scanning"
    ]
  },
  {
    icon: <Laptop className="w-8 h-8 text-primary" />,
    title: "OCR Technology",
    description: "Advanced optical character recognition for blood work analysis.",
    features: [
      "Automated data extraction from medical reports",
      "High accuracy text recognition",
      "Support for multiple file formats"
    ]
  }
];

export function IntegrationsTab() {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Integrations
      </h2>
      <div className="space-y-6">
        {integrations.map((integration, index) => (
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
    </Card>
  );
}