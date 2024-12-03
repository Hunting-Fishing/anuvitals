import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Virtualizer } from "@tanstack/react-virtual";
import { MessageItem } from "./MessageItem";
import { Message } from "../types";
import { WelcomeScreen } from "../welcome/WelcomeScreen";

interface MessageListProps {
  messages: Message[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

export function MessageList({ messages, virtualizer }: MessageListProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div 
        className="space-y-6"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
        role="list"
        aria-label="Message history"
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const message = messages[virtualRow.index];
          return (
            <MessageItem
              key={virtualRow.index}
              message={message}
              virtualRef={virtualizer.measureElement}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
              }}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}