import { useRef, useState } from "react";
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export function BarcodeScanner({ onBarcodeDetected }: BarcodeScannerProps) {
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      setShowCamera(true);
      const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear')
      )?.deviceId || videoInputDevices[0].deviceId;

      if (videoRef.current) {
        await codeReader.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          async (result, error) => {
            if (result) {
              onBarcodeDetected(result.getText());
              stopCamera();
            }
          }
        );
      }

      toast({
        title: "Camera activated",
        description: "Point the camera at a barcode to scan",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  return (
    <div className="space-y-4">
      {showCamera && (
        <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
          />
          <Button 
            onClick={stopCamera}
            variant="secondary"
            className="absolute top-2 right-2"
          >
            Stop Scanner
          </Button>
        </div>
      )}

      {!showCamera && (
        <Button 
          onClick={startCamera}
          type="button"
          className="w-full"
        >
          <Camera className="mr-2 h-4 w-4" />
          Start Barcode Scanner
        </Button>
      )}
    </div>
  );
}