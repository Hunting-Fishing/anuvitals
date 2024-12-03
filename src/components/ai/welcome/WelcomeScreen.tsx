import React from "react";
import { Brain } from "lucide-react";

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
      <Brain className="w-12 h-12 opacity-50" />
      <div className="text-center space-y-2">
        <h3 className="font-semibold">Welcome to AI Assistant</h3>
        <p className="text-sm">Start a conversation by typing a message below</p>
      </div>
    </div>
  );
}