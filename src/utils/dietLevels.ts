import { Leaf, Sun, Flame, AlertTriangle } from "lucide-react";

export const getLevelColor = (level: string): string => {
  switch(level) {
    case 'Beginner':
    case 'Very Low':
      return 'text-green-500';
    case 'Easy':
    case 'Low':
      return 'text-green-400';
    case 'Intermediate':
    case 'Moderate':
      return 'text-yellow-500';
    case 'Advanced':
    case 'High':
      return 'text-orange-500';
    case 'Expert':
    case 'Very High':
      return 'text-red-500';
    default:
      return 'text-muted-foreground';
  }
};

export const getLevelIcon = (level: string) => {
  switch(level) {
    case 'Beginner':
    case 'Very Low':
      return Leaf;
    case 'Easy':
    case 'Low':
      return Sun;
    case 'Intermediate':
    case 'Moderate':
      return Flame;
    case 'Advanced':
    case 'High':
      return AlertTriangle;
    case 'Expert':
    case 'Very High':
      return Flame;
    default:
      return Sun;
  }
};