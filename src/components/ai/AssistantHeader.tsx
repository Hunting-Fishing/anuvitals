import { Brain, ChefHat, Dumbbell, Apple } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssistantType } from "./types";

interface AssistantHeaderProps {
  assistantType: AssistantType;
  onTypeChange: (value: AssistantType) => void;
}

export function AssistantHeader({ assistantType, onTypeChange }: AssistantHeaderProps) {
  const getAssistantIcon = (type: AssistantType) => {
    switch (type) {
      case 'chef':
        return <ChefHat className="w-5 h-5" />;
      case 'fitness':
        return <Dumbbell className="w-5 h-5" />;
      case 'health':
        return <Brain className="w-5 h-5" />;
      case 'diet':
        return <Apple className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        {getAssistantIcon(assistantType)}
        AI Assistant
      </h2>
      <Select 
        value={assistantType} 
        onValueChange={onTypeChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="chef">AI Chef</SelectItem>
          <SelectItem value="fitness">Fitness Coach</SelectItem>
          <SelectItem value="health">Health Advisor</SelectItem>
          <SelectItem value="diet">Diet Planner</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}