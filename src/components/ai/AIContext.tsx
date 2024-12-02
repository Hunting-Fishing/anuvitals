import { createContext, useContext, useState } from 'react';
import { Message, AssistantType } from './types';

interface AIContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  assistantType: AssistantType;
  setAssistantType: (type: AssistantType) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [assistantType, setAssistantType] = useState<AssistantType>('health');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AIContext.Provider 
      value={{ 
        messages, 
        setMessages, 
        assistantType, 
        setAssistantType,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}