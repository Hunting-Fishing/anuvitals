export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type AssistantType = 'chef' | 'fitness' | 'health' | 'diet' | 'health-analysis';

export interface AIAssistantProps {
  initialType?: AssistantType;
}