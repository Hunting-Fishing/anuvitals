import { useRef, useState } from "react";
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export function BarcodeScanner({ onBarcodeDetected }: BarcodeScannerProps) {
  const [showCamera, setShowCamera] = useState(false);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      setShowCamera(true);
      setScanning(true);

      // Configure hints for better barcode detection
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
      ]);
      hints.set(DecodeHintType.TRY_HARDER, true);

      const codeReader = new BrowserMultiFormatReader(hints);
      
      // Try to use the back camera if available
      const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear')
      )?.deviceId || videoInputDevices[0]?.deviceId;

      if (!selectedDeviceId) {
        throw new Error("No camera found");
      }

      if (videoRef.current) {
        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              const barcode = result.getText();
              console.log("Barcode detected:", barcode);
              onBarcodeDetected(barcode);
              stopCamera();
              toast({
                title: "Barcode Detected",
                description: `Found barcode: ${barcode}`,
              });
            }
            if (err && !(err instanceof TypeError)) {
              // Ignore TypeError as it's commonly thrown when scanning is in progress
              console.error("Scanning error:", err);
            }
          }
        );

        toast({
          title: "Scanner Active",
          description: "Point the camera at a barcode to scan",
        });
      }
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

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setScanning(false);
  };

  return (
    <div className="space-y-4">
      {showCamera && (
        <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none border-2 border-primary/50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-32 border-2 border-primary">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
            </div>
          </div>
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
          disabled={scanning}
        >
          <Camera className="mr-2 h-4 w-4" />
          {scanning ? "Starting Scanner..." : "Start Barcode Scanner"}
        </Button>
      )}
    </div>
  );
}