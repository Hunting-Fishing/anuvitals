import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useRef, useEffect } from "react";
import { VoiceInput } from "./input/VoiceInput";

interface MessageInputProps {
  message: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function MessageInput({ message, onChange, onSend, isLoading }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="min-h-[80px] resize-none transition-all focus:min-h-[120px] bg-background/50 backdrop-blur-sm pr-20"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {message.length > 0 && `${message.length} characters`}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={onSend}
            disabled={isLoading || !message.trim()}
            className="px-4 h-10 transition-all duration-200 hover:scale-105"
            variant={message.trim() ? "default" : "secondary"}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send
              </>
            )}
          </Button>
          <VoiceInput onTranscript={onChange} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}