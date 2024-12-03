import { Alert, AlertDescription } from "@/components/ui/alert";

export function ScanInstructions() {
  return (
    <Alert>
      <AlertDescription>
        Use your camera to scan a product barcode or enter it manually.
      </AlertDescription>
    </Alert>
  );
}