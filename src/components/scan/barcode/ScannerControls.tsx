import React from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScannerControlsProps {
  showCamera: boolean;
  scanning: boolean;
  onStartScanning: () => void;
  onStopScanning: () => void;
}

export function ScannerControls({ 
  showCamera, 
  scanning, 
  onStartScanning, 
  onStopScanning 
}: ScannerControlsProps) {
  if (showCamera) {
    return (
      <Button 
        onClick={onStopScanning}
        variant="secondary"
        className="absolute top-2 right-2"
      >
        Stop Scanner
      </Button>
    );
  }

  return (
    <Button 
      onClick={onStartScanning}
      type="button"
      className="w-full"
      disabled={scanning}
    >
      <Camera className="mr-2 h-4 w-4" />
      {scanning ? "Starting Scanner..." : "Start Barcode Scanner"}
    </Button>
  );
}