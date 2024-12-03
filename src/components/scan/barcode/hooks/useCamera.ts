import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useCamera() {
  const { toast } = useToast();

  const initializeCamera = async (videoElement: HTMLVideoElement | null): Promise<MediaStream | null> => {
    if (!videoElement) {
      console.error("Video element reference is missing");
      return null;
    }

    try {
      // Check camera permissions
      const permissionResult = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permissionResult.state === 'denied') {
        throw new Error("Camera permission is denied");
      }

      // Request camera access with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      // Set up video element
      videoElement.srcObject = stream;
      
      // Wait for video to be ready
      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = () => resolve();
      });

      await videoElement.play();
      console.log("Camera initialized successfully");
      
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

  const stopCamera = (videoElement: HTMLVideoElement | null) => {
    if (videoElement?.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoElement.srcObject = null;
    }
  };

  return {
    initializeCamera,
    stopCamera
  };
}