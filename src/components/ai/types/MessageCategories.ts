export type MessageCategory = 'general' | 'health' | 'nutrition' | 'exercise' | 'medication';

export interface MessageMetadata {
  category?: MessageCategory;
  shared?: boolean;
  sharedWith?: string[];
  sharedAt?: string;
}