import { useRef } from "react";
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

  return (
    <div className="space-y-4">
      {showCamera && (
        <div className="relative">
          <VideoPreview videoRef={videoRef} />
          <BarcodeOverlay />
          <ScannerControls
            showCamera={showCamera}
            scanning={scanning}
            onStartScanning={() => startCamera(videoRef.current)}
            onStopScanning={() => stopCamera(videoRef.current)}
          />
        </div>
      )}

      {!showCamera && (
        <ScannerControls
          showCamera={showCamera}
          scanning={scanning}
          onStartScanning={() => startCamera(videoRef.current)}
          onStopScanning={() => stopCamera(videoRef.current)}
        />
      )}
    </div>
  );
}