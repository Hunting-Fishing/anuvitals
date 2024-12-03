import { useState } from "react";
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import { useToast } from "@/hooks/use-toast";

export function useBarcodeScanner(onBarcodeDetected: (barcode: string) => void) {
  const [showCamera, setShowCamera] = useState(false);
  const [scanning, setScanning] = useState(false);
  const { toast } = useToast();

  const setupScanner = async (videoElement: HTMLVideoElement | null) => {
    if (!videoElement) return null;

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
      // First check if we have camera permissions
      const permissionResult = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permissionResult.state === 'denied') {
        throw new Error("Camera permission is denied. Please enable it in your browser settings.");
      }

      // Get list of available video devices
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      console.log('Available devices:', devices);

      if (devices.length === 0) {
        throw new Error("No camera devices found");
      }

      // Try to find a back camera
      const backCamera = devices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear')
      );

      // Use back camera if found, otherwise use first available camera
      const selectedDevice = backCamera || devices[0];
      console.log('Selected device:', selectedDevice);

      return { codeReader, deviceId: selectedDevice.deviceId };
    } catch (error) {
      console.error("Failed to setup scanner:", error);
      throw error;
    }
  };

  const startCamera = async (videoElement: HTMLVideoElement | null) => {
    try {
      setScanning(true);

      // Request camera permissions explicitly first
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });

      if (!videoElement) {
        throw new Error("Video element not found");
      }

      // Attach stream to video element
      videoElement.srcObject = stream;
      await videoElement.play();

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
              title: "Barcode Detected",
              description: `Found barcode: ${barcode}`,
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
      const tracks = (videoElement.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
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