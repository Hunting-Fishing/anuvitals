
import { Loader2 } from "lucide-react";

interface BloodWorkLoadingProps {
  message?: string;
}

export function BloodWorkLoading({ message = "Processing your blood work results..." }: BloodWorkLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
