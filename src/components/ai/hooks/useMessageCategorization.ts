import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { MessageCategory } from '../types/MessageCategories';
import { useToast } from '@/hooks/use-toast';

export function useMessageCategorization() {
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const categorizeMessage = async (
    message: string,
    context?: {
      previousMessages?: Array<{ role: string; content: string }>;
      userPreferences?: {
        dietaryPreferences?: string[];
        healthConditions?: string[];
      };
    }
  ): Promise<MessageCategory | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('message-categorization', {
        body: { message, context }
      });

      if (error) {
        console.error('Error categorizing message:', error);
        toast({
          title: 'Categorization failed',
          description: 'Message will be marked as general category',
          variant: 'destructive',
        });
        return 'general';
      }

      return data.category as MessageCategory;
    } catch (error) {
      console.error('Error in categorizeMessage:', error);
      return 'general';
    }
  };

  return { categorizeMessage };
}