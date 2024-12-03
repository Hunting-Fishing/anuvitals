import { Shield, Database, Zap } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";

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

export function InfrastructureIntegrations() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-primary/80">Infrastructure & Security</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {infrastructureIntegrations.map((integration, index) => (
          <IntegrationCard key={index} {...integration} />
        ))}
      </div>
    </div>
  );
}