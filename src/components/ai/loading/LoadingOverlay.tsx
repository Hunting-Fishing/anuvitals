import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
  return (
    <div 
      className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
      role="progressbar"
      aria-label="Processing request"
    >
      <div className="bg-background/95 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Processing your request...</span>
      </div>
    </div>
  );
}