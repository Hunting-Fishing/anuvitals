
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface BloodWorkProgressProps {
  isUploading: boolean;
  progress: string;
  progressPercent: number;
  batchStatus: Record<string, string>;
}

export function BloodWorkProgress({
  isUploading,
  progress,
  progressPercent,
  batchStatus
}: BloodWorkProgressProps) {
  return (
    <>
      {(isUploading || progress) && (
        <div className="space-y-2">
          <Alert>
            <AlertDescription className="flex items-center gap-2">
              {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
              {progress}
            </AlertDescription>
          </Alert>
          <Progress value={progressPercent} className="w-full" />
        </div>
      )}

      {Object.keys(batchStatus).length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Processing Status:</h4>
          {Object.entries(batchStatus).map(([filename, status]) => (
            <div key={filename} className="flex items-center justify-between">
              <span className="text-sm truncate max-w-[200px]">{filename}</span>
              <span className={cn(
                "text-sm",
                status === 'completed' && "text-green-500",
                status === 'failed' && "text-red-500",
                status === 'processing' && "text-blue-500"
              )}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
