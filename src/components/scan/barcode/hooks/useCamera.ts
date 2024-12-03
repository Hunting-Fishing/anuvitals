import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useCamera() {
  const { toast } = useToast();

  const initializeCamera = async (videoElement: HTMLVideoElement): Promise<MediaStream | null> => {
    try {
      console.log("Requesting camera permissions...");
      
      // First try to get the rear camera (preferred for barcode scanning)
      try {
        const mobileStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: "environment" }, // Specifically request rear camera
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        console.log("Rear camera initialized successfully");
        videoElement.srcObject = mobileStream;
        return mobileStream;
      } catch (mobileError) {
        console.log("Rear camera not available, falling back to any available camera");
        // If rear camera fails, fall back to any available camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // Prefer rear camera but don't require it
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        console.log("Fallback camera initialized successfully");
        videoElement.srcObject = stream;
        return stream;
      }

    } catch (error: any) {
      console.error("Camera initialization error:", error);
      let errorMessage = "Failed to initialize camera";
      
      // Provide more specific error messages for common issues
      if (error.name === "NotAllowedError") {
        errorMessage = "Camera access was denied. Please grant camera permissions to use the scanner.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No camera found on your device.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "Camera is already in use by another application.";
      }

      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  };

  const stopCamera = (videoElement: HTMLVideoElement) => {
    console.log("Stopping camera...");
    if (videoElement?.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        track.stop();
        console.log("Camera track stopped");
      });
      videoElement.srcObject = null;
    }
  };

  return {
    initializeCamera,
    stopCamera
  };
}