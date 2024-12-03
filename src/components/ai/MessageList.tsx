import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Brain, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp?: Date;
  error?: boolean;
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
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
        <Brain className="w-12 h-12 opacity-50" />
        <div className="text-center space-y-2">
          <h3 className="font-semibold">Welcome to AI Assistant</h3>
          <p className="text-sm">Start a conversation by typing a message below</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 group transition-opacity animate-fade-in [animation-delay:${index * 100}ms] ${
              message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <Avatar className={`h-8 w-8 ${message.role === 'assistant' ? 'bg-primary/10' : 'bg-secondary'}`}>
              {message.role === 'assistant' ? (
                <Brain className="h-4 w-4 text-primary" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </Avatar>
            <div className="flex flex-col gap-1 max-w-[80%]">
              <div
                className={`rounded-lg px-4 py-2 group relative ${
                  message.role === 'assistant'
                    ? 'bg-secondary hover:bg-secondary/90 transition-colors'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.content}
                {message.error && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="w-4 h-4 text-destructive absolute -right-6 top-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Error occurred during processing</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              {message.timestamp && (
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {format(message.timestamp, 'HH:mm')}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}