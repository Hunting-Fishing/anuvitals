export type MessageCategory = 'general' | 'health' | 'nutrition' | 'exercise' | 'medication';

export interface MessageMetadata {
  category?: MessageCategory;
  timestamp?: string;
  shared?: boolean;
  sharedWith?: string[];
  sharedAt?: string;
}