import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BarcodeInputProps {
  barcode: string;
  onBarcodeChange: (barcode: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function BarcodeInput({ barcode, onBarcodeChange, onSubmit, loading }: BarcodeInputProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter product barcode"
          value={barcode}
          onChange={(e) => onBarcodeChange(e.target.value)}
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Scanning..." : "Scan Product"}
      </Button>
    </form>
  );
}