import { useState, useRef } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProductDetails } from "@/services/OpenFoodFactsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import { BrowserMultiFormatReader } from '@zxing/browser';

export function ScanForm() {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const session = useSession();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

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
              setBarcode(result.getText());
              stopCamera();
              // Automatically submit the form when barcode is detected
              handleScan(new Event('submit') as any);
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
    codeReader.current.stopAsyncDecode();
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode) {
      toast({
        title: "Error",
        description: "Please enter a barcode",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const productDetails = await fetchProductDetails(barcode);
      
      const { error } = await supabase.from("products").insert({
        user_id: session?.user.id,
        barcode,
        ...productDetails,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product scanned and saved successfully!",
      });
      
      setBarcode("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Scan New Product</h2>
      
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

        <form onSubmit={handleScan} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter product barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Scanning..." : "Scan Product"}
          </Button>
        </form>
      </div>

      <Alert>
        <AlertDescription>
          Use your camera to scan a product barcode or enter it manually.
        </AlertDescription>
      </Alert>
    </div>
  );
}