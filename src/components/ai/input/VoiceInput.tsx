import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  isLoading: boolean;
}

export function VoiceInput({ onTranscript, isLoading }: VoiceInputProps) {
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const { toast } = useToast();

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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
      
      onTranscript(transcript);
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
    <>
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
      {isRecording && (
        <div className="text-xs text-muted-foreground animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Listening... Click "Stop" when you're done speaking
        </div>
      )}
    </>
  );
}