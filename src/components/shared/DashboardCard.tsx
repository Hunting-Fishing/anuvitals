
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ children, className = "" }: DashboardCardProps) {
  return (
    <Card className={`p-6 border-2 shadow-md ${className}`}>
      {children}
    </Card>
  );
}
