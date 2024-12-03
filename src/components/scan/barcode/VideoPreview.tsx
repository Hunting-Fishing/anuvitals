import React, { useEffect, useRef } from "react";

interface VideoPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function VideoPreview({ videoRef }: VideoPreviewProps) {
  useEffect(() => {
    console.log("VideoPreview mounted, video element:", videoRef.current);
    
    return () => {
      console.log("VideoPreview unmounting, cleaning up...");
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
          console.log("Track stopped during cleanup");
        });
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