import React, { useEffect } from "react";

interface VideoPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function VideoPreview({ videoRef }: VideoPreviewProps) {
  useEffect(() => {
    // Log when video element is mounted
    console.log("Video element mounted:", videoRef.current);
    return () => {
      // Cleanup on unmount
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        autoPlay
        muted
      />
    </div>
  );
}