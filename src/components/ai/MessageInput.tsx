import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Mic, StopCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  message: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function MessageInput({ message, onChange, onSend, isLoading }: MessageInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Voice input is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      onChange(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      toast({
        title: "Error",
        description: "Failed to record voice input.",
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          className="flex-1 min-h-[80px] resize-none transition-all focus:min-h-[120px] bg-background/50 backdrop-blur-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          disabled={isLoading}
        />
        <div className="flex flex-col gap-2">
          <Button
            onClick={onSend}
            disabled={isLoading || !message.trim()}
            className="px-4 h-10"
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
          <Button
            onClick={handleVoiceInput}
            variant="outline"
            className="px-4 h-10"
            disabled={isLoading}
          >
            {isRecording ? (
              <>
                <StopCircle className="w-4 h-4 mr-2 text-destructive" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Voice
              </>
            )}
          </Button>
        </div>
      </div>
      {isRecording && (
        <div className="text-xs text-muted-foreground animate-pulse">
          Listening... Click "Stop" when you're done speaking
        </div>
      )}
    </div>
  );
}