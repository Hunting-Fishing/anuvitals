import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCamera } from "./hooks/useCamera";
import { useScanner } from "./hooks/useScanner";

export function useBarcodeScanner(onBarcodeDetected: (barcode: string) => void) {
  const [showCamera, setShowCamera] = useState(false);
  const [scanning, setScanning] = useState(false);
  const { toast } = useToast();
  const { initializeCamera, stopCamera } = useCamera();
  const { setupScanner } = useScanner();

  const startCamera = async (videoElement: HTMLVideoElement | null) => {
    if (!videoElement) {
      console.error("Video element is not initialized");
      return;
    }

    try {
      setScanning(true);

      // Initialize camera
      const stream = await initializeCamera(videoElement);
      if (!stream) {
        throw new Error("Failed to initialize camera");
      }

      // Setup barcode scanner
      const setup = await setupScanner();
      if (!setup) {
        throw new Error("Failed to setup scanner");
      }

      const { codeReader, deviceId } = setup;
      setShowCamera(true);

      // Start scanning
      await codeReader.decodeFromVideoDevice(
        deviceId,
        videoElement,
        (result, err) => {
          if (result) {
            const barcode = result.getText();
            console.log("Barcode detected:", barcode);
            onBarcodeDetected(barcode);
            stopCamera(videoElement);
            toast({
              title: "Success",
              description: `Barcode detected: ${barcode}`,
            });
          }
          if (err && !(err instanceof TypeError)) {
            console.error("Scanning error:", err);
          }
        }
      );

      toast({
        title: "Scanner Active",
        description: "Point the camera at a barcode to scan",
      });
    } catch (error: any) {
      console.error("Camera error:", error);
      toast({
        title: "Camera Error",
        description: error.message || "Unable to access camera",
        variant: "destructive",
      });
      setScanning(false);
      setShowCamera(false);
    }
  };

  return {
    showCamera,
    scanning,
    startCamera,
    stopCamera: (videoElement: HTMLVideoElement | null) => {
      stopCamera(videoElement);
      setShowCamera(false);
      setScanning(false);
    }
  };
}