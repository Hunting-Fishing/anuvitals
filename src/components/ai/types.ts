import { MessageCategory, MessageMetadata } from './types/MessageCategories';

export type AssistantType = 'health' | 'health-analysis';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  error?: boolean;
  metadata?: MessageMetadata;
}