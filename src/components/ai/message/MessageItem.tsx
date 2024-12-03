import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Brain, User, AlertCircle, Share2, Copy } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Message } from "../types";

interface MessageItemProps {
  message: Message;
  virtualRef?: (node: HTMLElement | null) => void;
  style?: React.CSSProperties;
}

export function MessageItem({ message, virtualRef, style }: MessageItemProps) {
  const { toast } = useToast();

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "Message content has been copied.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareMessage = async (content: string) => {
    try {
      await navigator.share({
        text: content,
      });
    } catch (err) {
      toast({
        title: "Failed to share",
        description: "Sharing is not supported on this device.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      ref={virtualRef}
      className={`flex gap-3 group transition-opacity animate-fade-in ${
        message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
      }`}
      style={style}
      role="listitem"
    >
      <Avatar 
        className={`h-8 w-8 ${message.role === 'assistant' ? 'bg-primary/10' : 'bg-secondary'}`}
        aria-label={message.role === 'assistant' ? 'AI Assistant' : 'You'}
      >
        {message.role === 'assistant' ? (
          <Brain className="h-4 w-4 text-primary" />
        ) : (
          <User className="h-4 h-4" />
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
          <div className="absolute right-0 top-0 -mr-12 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyMessage(message.content)}
                  aria-label="Copy message"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy message</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => shareMessage(message.content)}
                  aria-label="Share message"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share message</TooltipContent>
            </Tooltip>
          </div>
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
  );
}