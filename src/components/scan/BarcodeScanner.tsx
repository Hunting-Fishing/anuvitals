import { useRef, useEffect } from "react";
import { VideoPreview } from "./barcode/VideoPreview";
import { BarcodeOverlay } from "./barcode/BarcodeOverlay";
import { ScannerControls } from "./barcode/ScannerControls";
import { useBarcodeScanner } from "./barcode/useBarcodeScanner";

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export function BarcodeScanner({ onBarcodeDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { showCamera, scanning, startCamera, stopCamera } = useBarcodeScanner(onBarcodeDetected);

  useEffect(() => {
    // Ensure video element is ready
    if (videoRef.current) {
      console.log("Video element initialized:", videoRef.current);
    }
  }, []);

  const handleStartScanning = async () => {
    if (!videoRef.current) {
      console.error("Video element not initialized");
      return;
    }
    await startCamera(videoRef.current);
  };

  const handleStopScanning = () => {
    if (!videoRef.current) {
      console.error("Video element not initialized");
      return;
    }
    stopCamera(videoRef.current);
  };

  return (
    <div className="space-y-4">
      {showCamera && (
        <div className="relative">
          <VideoPreview videoRef={videoRef} />
          <BarcodeOverlay />
          <ScannerControls
            showCamera={showCamera}
            scanning={scanning}
            onStartScanning={handleStartScanning}
            onStopScanning={handleStopScanning}
          />
        </div>
      )}

      {!showCamera && (
        <ScannerControls
          showCamera={showCamera}
          scanning={scanning}
          onStartScanning={handleStartScanning}
          onStopScanning={handleStopScanning}
        />
      )}
    </div>
  );
}