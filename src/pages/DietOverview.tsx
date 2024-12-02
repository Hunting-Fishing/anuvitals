import { DietNavigation } from "@/components/DietNavigation";
import { Card } from "@/components/ui/card";
import { Check, Circle } from "lucide-react";

// List of all planned diets with their implementation status
const plannedDiets = [
  { name: "Mediterranean Diet", implemented: true },
  { name: "DASH Diet", implemented: true },
  { name: "Nordic Diet", implemented: true },
  { name: "MIND Diet", implemented: true },
  { name: "Flexitarian Diet", implemented: false },
  { name: "Plant-Based Diet", implemented: false },
  { name: "Paleo Diet", implemented: false },
  { name: "Ketogenic Diet", implemented: false },
  { name: "Anti-Inflammatory Diet", implemented: false },
  { name: "Low FODMAP Diet", implemented: false },
  { name: "Whole30 Diet", implemented: false },
  { name: "Zone Diet", implemented: false },
  { name: "Volumetrics Diet", implemented: false },
  { name: "South Beach Diet", implemented: false },
  { name: "Ornish Diet", implemented: false }
];

export default function DietOverview() {
  return (
    <div className="flex h-full">
      <DietNavigation />
      <div className="flex flex-1 p-8 gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Diet Guide</h1>
          <p className="text-muted-foreground">
            Select a diet category from the sidebar to explore different dietary approaches and their benefits.
          </p>
        </div>
        
        <Card className="w-72 p-4">
          <h2 className="text-lg font-semibold mb-4">Implementation Progress</h2>
          <div className="space-y-2">
            {plannedDiets.map((diet) => (
              <div 
                key={diet.name} 
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  diet.implemented ? 'bg-green-100 dark:bg-green-900/20' : ''
                }`}
              >
                {diet.implemented ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
                <span className={diet.implemented ? 'font-medium' : ''}>
                  {diet.name}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}