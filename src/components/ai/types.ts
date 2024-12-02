export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type AssistantType = 'chef' | 'fitness' | 'health' | 'diet';

export interface AIAssistantProps {
  initialType?: AssistantType;
}