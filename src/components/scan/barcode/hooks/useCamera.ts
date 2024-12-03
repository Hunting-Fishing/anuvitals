import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useCamera() {
  const { toast } = useToast();

  const initializeCamera = async (videoElement: HTMLVideoElement): Promise<MediaStream | null> => {
    try {
      console.log("Requesting camera permissions...");
      
      // Request camera access with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      console.log("Camera permission granted, setting up video element");
      
      // Set up video element
      videoElement.srcObject = stream;
      
      // Wait for video to be ready
      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          resolve();
        };
      });

      await videoElement.play();
      console.log("Video playback started");
      
      return stream;
    } catch (error: any) {
      console.error("Camera initialization error:", error);
      toast({
        title: "Camera Error",
        description: error.message || "Failed to initialize camera",
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