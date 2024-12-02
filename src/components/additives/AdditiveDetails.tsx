import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Brain, Heart, Stomach } from "lucide-react";

interface AdditiveDetailsProps {
  additive: {
    code: string;
    name: string;
    description: string;
    health_impacts: {
      short_term: string[];
      long_term: string[];
    };
    risk_level: string;
    body_systems_affected: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const bodySystemIcons: Record<string, React.ReactNode> = {
  "nervous system": <Brain className="h-4 w-4" />,
  "digestive system": <Stomach className="h-4 w-4" />,
  "cardiovascular system": <Heart className="h-4 w-4" />,
};

export function AdditiveDetails({ additive, isOpen, onClose }: AdditiveDetailsProps) {
  if (!additive) return null;

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{additive.name}</span>
            <Badge variant="outline">{additive.code}</Badge>
            <Badge className={getRiskLevelColor(additive.risk_level)}>
              {additive.risk_level.toUpperCase()} RISK
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">{additive.description}</p>

          <div>
            <h4 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Health Impacts
            </h4>
            <div className="mt-2 space-y-2">
              <div>
                <h5 className="text-sm font-medium">Short Term:</h5>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {additive.health_impacts.short_term.map((impact) => (
                    <li key={impact}>{impact}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium">Long Term:</h5>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {additive.health_impacts.long_term.map((impact) => (
                    <li key={impact}>{impact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Affected Body Systems</h4>
            <div className="mt-2 flex gap-2 flex-wrap">
              {additive.body_systems_affected.map((system) => (
                <Badge key={system} variant="outline" className="flex items-center gap-1">
                  {bodySystemIcons[system]}
                  {system}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}