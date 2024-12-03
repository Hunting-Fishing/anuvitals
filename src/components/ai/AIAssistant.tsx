import React from "react";
import { Card } from "@/components/ui/card";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { AssistantHeader } from "./AssistantHeader";
import { useConversation } from "./useConversation";
import { useToast } from "@/hooks/use-toast";

export function AIAssistant() {
  const { message, setMessage, sendMessage, messages, isLoading } = useConversation();
  const { toast } = useToast();

  const handleSend = async () => {
    try {
      await sendMessage();
      toast({
        title: "Message sent",
        description: "Your message has been sent to the AI assistant.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="flex-1 p-6 space-y-4 overflow-hidden">
        <AssistantHeader />
        
        <div className="flex flex-col h-full space-y-4">
          <div className="flex-1 overflow-auto">
            <MessageList messages={messages} />
          </div>
          
          <div className="pt-4 border-t">
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