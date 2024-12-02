import { useUser } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { AIAssistantProps } from "./types";
import { AssistantHeader } from "./AssistantHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { AIProvider, useAI } from "./AIContext";
import { useConversation } from "./useConversation";

function AIAssistantContent() {
  const user = useUser();
  const { messages } = useAI();
  const { message, setMessage, sendMessage, isLoading } = useConversation();

  if (!user) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Please log in to use the AI Assistant
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 flex flex-col h-[600px]">
      <AssistantHeader />
      <MessageList messages={messages} />
      <MessageInput
        message={message}
        onChange={setMessage}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </Card>
  );
}

export function AIAssistant({ initialType = 'health' }: AIAssistantProps) {
  return (
    <AIProvider>
      <AIAssistantContent />
    </AIProvider>
  );
}