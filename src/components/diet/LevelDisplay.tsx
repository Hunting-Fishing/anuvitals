import { cn } from "@/lib/utils";
import { getLevelColor, getLevelIcon } from "@/utils/dietLevels";

interface LevelDisplayProps {
  label: string;
  level: string;
}

export function LevelDisplay({ label, level }: LevelDisplayProps) {
  const Icon = getLevelIcon(level);
  
  return (
    <div className="flex items-center gap-2 bg-secondary/5 px-3 py-2 rounded-lg">
      <span className="text-sm font-medium">{label}:</span>
      <div className={cn("flex items-center gap-1 font-semibold", getLevelColor(level))}>
        <Icon className="h-4 w-4" />
        <span>{level}</span>
      </div>
    </div>
  );
}