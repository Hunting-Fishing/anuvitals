import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricCardProps {
  category: string;
  value: string;
  status: "good" | "warning" | "alert";
  icon: React.ReactNode;
  progress?: number;
  details?: string[];
  trend?: "up" | "down" | "stable";
  recommendation?: string;
}

export function MetricCard({
  category,
  value,
  status,
  icon,
  progress,
  details,
  trend,
  recommendation
}: MetricCardProps) {
  const getStatusColor = (status: MetricCardProps["status"]) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'alert':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend?: MetricCardProps["trend"]) => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'stable':
        return '→';
      default:
        return '';
    }
  };

  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${getStatusColor(status)}/10 text-${getStatusColor(status)}`}>
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{category}</p>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{recommendation}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{value}</span>
                <Badge variant="secondary" className={`text-xs ${getStatusColor(status)}`}>
                  {status}
                </Badge>
                {trend && (
                  <span className="text-xs font-medium" title="Trend">
                    {getTrendIcon(trend)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {progress !== undefined && (
          <Progress 
            value={progress} 
            className="h-1.5"
            indicatorClassName={getStatusColor(status)}
          />
        )}

        {details && (
          <div className="space-y-1">
            {details.map((detail, index) => (
              <p key={index} className="text-xs text-muted-foreground">
                • {detail}
              </p>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}