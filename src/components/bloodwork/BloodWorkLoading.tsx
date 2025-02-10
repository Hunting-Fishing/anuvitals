
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface BloodWorkLoadingProps {
  message?: string;
}

export function BloodWorkLoading({ message = "Processing your blood work results..." }: BloodWorkLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <LoadingSpinner size="lg" message={message} />
    </div>
  );
}
