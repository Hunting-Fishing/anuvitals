import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, Apple, Pill, Heart, Moon, Scale, Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HealthMetric {
  category: string;
  value: string;
  status: "good" | "warning" | "alert";
  icon: React.ReactNode;
  progress?: number;
  details?: string[];
  trend?: "up" | "down" | "stable";
  recommendation?: string;
}

export function HealthDataView() {
  const healthMetrics: HealthMetric[] = [
    { 
      category: "Blood Work", 
      value: "4 Recent Tests",
      status: "good",
      icon: <Brain className="w-4 h-4" />,
      progress: 85,
      details: [
        "Cholesterol levels optimal",
        "Vitamin D slightly low",
        "Iron levels normal",
        "Blood sugar stable"
      ],
      trend: "up",
      recommendation: "Consider vitamin D supplementation"
    },
    { 
      category: "Diet Goals", 
      value: "2 Active Goals",
      status: "warning",
      icon: <Apple className="w-4 h-4" />,
      progress: 65,
      details: [
        "Protein intake: 85% of goal",
        "Fiber intake: 70% of goal",
        "Water intake: 90% of goal",
        "Healthy fats: 75% of goal"
      ],
      trend: "up",
      recommendation: "Increase fiber-rich foods"
    },
    { 
      category: "Fitness", 
      value: "3 Goals Tracked",
      status: "good",
      icon: <Dumbbell className="w-4 h-4" />,
      progress: 78,
      details: [
        "Weekly workouts: 4/5",
        "Active minutes: 45/60 daily",
        "Steps: 8,500/10,000",
        "Strength training: 2/3 sessions"
      ],
      trend: "stable",
      recommendation: "Add one more strength session"
    },
    { 
      category: "Supplements", 
      value: "2 Recommended",
      status: "alert",
      icon: <Pill className="w-4 h-4" />,
      progress: 45,
      details: [
        "Vitamin D supplement needed",
        "Omega-3 recommended",
        "Magnesium levels good",
        "Iron supplementation not required"
      ],
      trend: "down",
      recommendation: "Start vitamin D supplementation"
    },
    {
      category: "Heart Health",
      value: "Good",
      status: "good",
      icon: <Heart className="w-4 h-4" />,
      progress: 92,
      details: [
        "Resting HR: 68 bpm",
        "BP: 120/80",
        "Recovery rate optimal",
        "HRV: 45ms (Good)"
      ],
      trend: "stable",
      recommendation: "Maintain current cardio routine"
    },
    {
      category: "Body Composition",
      value: "On Track",
      status: "good",
      icon: <Scale className="w-4 h-4" />,
      progress: 88,
      details: [
        "BMI: 22.5 (Healthy)",
        "Body fat: 18%",
        "Muscle mass: +2% this month",
        "Hydration: Optimal"
      ],
      trend: "up",
      recommendation: "Continue balanced nutrition plan"
    },
    {
      category: "Sleep Quality",
      value: "7.5 hrs avg",
      status: "warning",
      icon: <Moon className="w-4 h-4" />,
      progress: 75,
      details: [
        "Deep sleep: 2.5 hrs",
        "REM sleep: 1.8 hrs",
        "Sleep efficiency: 85%",
        "Wake episodes: 2 avg"
      ],
      trend: "stable",
      recommendation: "Improve sleep hygiene routine"
    },
    {
      category: "Activity Level",
      value: "Above Average",
      status: "good",
      icon: <Activity className="w-4 h-4" />,
      progress: 82,
      details: [
        "Daily steps: 8,500",
        "Active minutes: 45",
        "Exercise sessions: 4/week",
        "Recovery days: 2/week"
      ],
      trend: "up",
      recommendation: "Maintain current activity level"
    }
  ];

  const getStatusColor = (status: HealthMetric['status']) => {
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

  const getStatusBadge = (status: HealthMetric['status']) => {
    switch (status) {
      case 'good':
        return 'bg-green-500/10 text-green-500';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'alert':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getTrendIcon = (trend?: HealthMetric['trend']) => {
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
    <ScrollArea className="h-[calc(100vh-16rem)] w-full rounded-md border p-4">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Health Overview
          <Badge variant="secondary" className="ml-2">Real-time Analysis</Badge>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthMetrics.map((metric, index) => (
            <Card 
              key={metric.category} 
              className="p-4 hover:bg-accent/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${getStatusBadge(metric.status)}`}>
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{metric.category}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{metric.value}</span>
                        <Badge 
                          variant="secondary"
                          className={`text-xs ${getStatusBadge(metric.status)}`}
                        >
                          {metric.status}
                        </Badge>
                        {metric.trend && (
                          <span className="text-xs font-medium" title="Trend">
                            {getTrendIcon(metric.trend)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress 
                    value={metric.progress} 
                    className="h-1.5"
                    indicatorClassName={getStatusColor(metric.status)}
                  />
                  <div className="space-y-1 mt-2">
                    {metric.details?.map((detail, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        • {detail}
                      </p>
                    ))}
                    {metric.recommendation && (
                      <p className="text-xs font-medium mt-2 text-primary">
                        Recommendation: {metric.recommendation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="font-medium">AI Health Insights</h4>
          <Card className="p-4 bg-secondary/10">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Based on your recent health metrics, here are some key insights:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Overall health score shows positive progression</li>
                <li>Sleep quality could be improved with better sleep hygiene</li>
                <li>Vitamin D supplementation recommended based on blood work</li>
                <li>Cardiovascular health metrics are excellent</li>
                <li>Consider increasing fiber intake to meet dietary goals</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}