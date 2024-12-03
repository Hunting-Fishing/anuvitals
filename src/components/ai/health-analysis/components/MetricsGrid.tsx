import { Brain, Activity, Apple, Pill, Heart, Moon, Scale, Dumbbell } from "lucide-react";
import { MetricCard } from "./MetricCard";

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

export function MetricsGrid() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {healthMetrics.map((metric, index) => (
        <MetricCard
          key={metric.category}
          {...metric}
        />
      ))}
    </div>
  );
}
