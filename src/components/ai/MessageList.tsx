import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Brain, User } from "lucide-react";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Start a conversation with the AI assistant
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <Avatar className="h-8 w-8">
              {message.role === 'assistant' ? (
                <Brain className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </Avatar>
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-secondary'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}