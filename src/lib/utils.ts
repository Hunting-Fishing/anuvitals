import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHealthRatingColor(rating: number) {
  if (rating >= 70) return "text-green-500";
  if (rating >= 40) return "text-orange-500";
  return "text-red-500";
}

export function getMetricColor(value: number, type: 'positive' | 'negative') {
  if (type === 'positive') {
    return value >= 70 ? "text-green-500" : value >= 40 ? "text-orange-500" : "text-red-500";
  }
  return value >= 70 ? "text-red-500" : value >= 40 ? "text-orange-500" : "text-green-500";
}