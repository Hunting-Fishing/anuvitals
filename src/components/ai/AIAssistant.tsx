import React from "react";
import { Card } from "@/components/ui/card";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { AssistantHeader } from "./AssistantHeader";
import { AIVisualization } from "./AIVisualization";
import { HealthAnalysisView } from "./HealthAnalysisView";
import { useConversation } from "./useConversation";
import { useToast } from "@/hooks/use-toast";
import { useAI } from "./AIContext";

export function AIAssistant() {
  const { message, setMessage, sendMessage, messages, isLoading } = useConversation();
  const { assistantType } = useAI();
  const { toast } = useToast();

  const handleSend = async () => {
    if (!message.trim()) return;
    
    try {
      await sendMessage();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (assistantType === 'health-analysis') {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 animate-fade-in">
        <Card className="flex-1 p-6 space-y-4 overflow-hidden shadow-lg border-2 bg-gradient-to-b from-gray-900/50 to-black/50">
          <AssistantHeader />
          <AIVisualization />
          <HealthAnalysisView />
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="flex-1 p-6 space-y-4 overflow-hidden shadow-lg border-2 bg-gradient-to-b from-gray-900/50 to-black/50">
        <AssistantHeader />
        <AIVisualization />
        
        <div className="flex flex-col h-full space-y-4">
          <div className="flex-1 overflow-auto">
            <MessageList messages={messages.map(msg => ({
              ...msg,
              timestamp: new Date()
            }))} />
          </div>
          
          <div className="pt-4 border-t border-gray-800">
            <MessageInput
              message={message}
              onChange={setMessage}
              onSend={handleSend}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}