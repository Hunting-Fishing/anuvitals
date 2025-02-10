
import React from "react";
import { Card } from "@/components/ui/card";
import { MessageList } from "./message/MessageList";
import { MessageInput } from "./MessageInput";
import { AssistantHeader } from "./AssistantHeader";
import { AIVisualization } from "./AIVisualization";
import { HealthDataView } from "./health-analysis/HealthDataView";
import { useConversation } from "./useConversation";
import { useToast } from "@/hooks/use-toast";
import { useAI } from "./AIContext";
import { Button } from "@/components/ui/button";
import { useVirtualizer } from '@tanstack/react-virtual';
import { AISearchPanel } from "./search/AISearchPanel";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { FilterType } from "./filters/MessageFilters";

export function AIAssistant() {
  const { message, setMessage, sendMessage, messages, isLoading, retryMessage } = useConversation();
  const { assistantType } = useAI();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [filterType, setFilterType] = React.useState<FilterType>("all");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 100,
    overscan: 5
  });

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFilters(false);
      }
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setShowFilters(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    try {
      await sendMessage();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Failed to send message. Click to retry.",
        variant: "destructive",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => retryMessage()}
            aria-label="Retry sending message"
          >
            Retry
          </Button>
        ),
      });
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" ? true : 
                       filterType === "ai" ? msg.role === "assistant" : 
                       msg.role === "user";
    return matchesSearch && matchesType;
  });

  if (assistantType === 'health-analysis') {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 animate-fade-in">
        <Card className="flex-1 p-6 space-y-4 overflow-hidden shadow-lg border-2 bg-gradient-to-b from-gray-900/50 to-black/50">
          <AssistantHeader />
          <AIVisualization />
          <HealthDataView />
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="flex-1 p-6 space-y-4 overflow-hidden shadow-lg border-2 bg-gradient-to-b from-gray-900/50 to-black/50 relative">
        <AssistantHeader />
        <AIVisualization />
        
        <div className="flex flex-col h-full space-y-4">
          {showFilters && (
            <AISearchPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterType={filterType}
              onFilterChange={setFilterType}
              onClose={() => setShowFilters(false)}
            />
          )}

          <div 
            ref={containerRef}
            className="flex-1 overflow-auto"
          >
            <MessageList 
              messages={filteredMessages}
              virtualizer={rowVirtualizer}
            />
          </div>
          
          <div className="pt-4 border-t border-gray-800">
            <MessageInput
              message={message}
              onChange={setMessage}
              onSend={handleSend}
              isLoading={isLoading}
            />
          </div>
        </div>

        {isLoading && <LoadingSpinner message="Processing your request..." />}
      </Card>
    </div>
  );
}
