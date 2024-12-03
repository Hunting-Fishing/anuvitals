import React from "react";

interface VideoPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function VideoPreview({ videoRef }: VideoPreviewProps) {
  return (
    <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
}