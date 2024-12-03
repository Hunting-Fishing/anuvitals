import { useState } from "react";
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import { useToast } from "@/hooks/use-toast";

export function useBarcodeScanner(onBarcodeDetected: (barcode: string) => void) {
  const [showCamera, setShowCamera] = useState(false);
  const [scanning, setScanning] = useState(false);
  const { toast } = useToast();

  const setupScanner = async (videoElement: HTMLVideoElement | null) => {
    if (!videoElement) {
      console.error("Video element is not initialized");
      return null;
    }

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ]);
    hints.set(DecodeHintType.TRY_HARDER, true);

    const codeReader = new BrowserMultiFormatReader(hints);
    
    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      console.log('Available camera devices:', devices);

      if (devices.length === 0) {
        throw new Error("No camera devices found");
      }

      // Try to find a back camera
      const backCamera = devices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear')
      );

      return { 
        codeReader, 
        deviceId: backCamera ? backCamera.deviceId : devices[0].deviceId 
      };
    } catch (error) {
      console.error("Scanner setup error:", error);
      throw error;
    }
  };

  const startCamera = async (videoElement: HTMLVideoElement | null) => {
    if (!videoElement) {
      console.error("Video element is not initialized");
      toast({
        title: "Camera Error",
        description: "Video element not initialized",
        variant: "destructive",
      });
      return;
    }

    try {
      setScanning(true);

      // First check camera permissions
      const permissionResult = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permissionResult.state === 'denied') {
        throw new Error("Camera permission is denied. Please enable it in your browser settings.");
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });

      videoElement.srcObject = stream;
      
      // Wait for video to be ready
      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => {
          resolve();
        };
      });

      await videoElement.play();
      console.log("Video element ready:", !videoElement.paused);

      const setup = await setupScanner(videoElement);
      if (!setup) {
        throw new Error("Failed to setup scanner");
      }

      const { codeReader, deviceId } = setup;
      setShowCamera(true);

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
        description: error.message || "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
      setScanning(false);
      setShowCamera(false);
    }
  };

  const stopCamera = (videoElement: HTMLVideoElement | null) => {
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoElement.srcObject = null;
    }
    setShowCamera(false);
    setScanning(false);
  };

  return {
    showCamera,
    scanning,
    startCamera,
    stopCamera
  };
}