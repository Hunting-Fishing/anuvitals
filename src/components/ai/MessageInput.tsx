import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  message: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function MessageInput({ message, onChange, onSend, isLoading }: MessageInputProps) {
  return (
    <div className="flex gap-2">
      <Textarea
        value={message}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <Button
        onClick={onSend}
        disabled={isLoading || !message.trim()}
        className="self-end"
      >
        Send
      </Button>
    </div>
  );
}