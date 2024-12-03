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
      const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear')
      )?.deviceId || videoInputDevices[0]?.deviceId;

      if (!selectedDeviceId) {
        throw new Error("No camera found");
      }

      return { codeReader, selectedDeviceId };
    } catch (error) {
      console.error("Failed to setup scanner:", error);
      return null;
    }
  };

  const startCamera = async (videoElement: HTMLVideoElement | null) => {
    try {
      setShowCamera(true);
      setScanning(true);

      const setup = await setupScanner(videoElement);
      if (!setup || !videoElement) {
        throw new Error("Failed to setup scanner");
      }

      const { codeReader, selectedDeviceId } = setup;

      await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
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
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
      setScanning(false);
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