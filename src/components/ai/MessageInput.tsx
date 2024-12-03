import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Mic, StopCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  message: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function MessageInput({ message, onChange, onSend, isLoading }: MessageInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  
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
      setRecordingTime(0);
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
      setRecordingTime(0);
      toast({
        title: "Error",
        description: "Failed to record voice input.",
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsRecording(false);
      setRecordingTime(0);
    };

    recognition.start();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <Button
            onClick={handleVoiceInput}
            variant={isRecording ? "destructive" : "outline"}
            className={`px-4 h-10 transition-all duration-200 hover:scale-105 ${
              isRecording ? 'animate-pulse' : ''
            }`}
            disabled={isLoading}
          >
            {isRecording ? (
              <>
                <StopCircle className="w-4 h-4 mr-2" />
                {formatTime(recordingTime)}
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
        <div className="text-xs text-muted-foreground animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Listening... Click "Stop" when you're done speaking
        </div>
      )}
    </div>
  );
}