import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '@/hooks/use-toast';
import { Message } from '../types';

export function useAIResponse() {
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const getAIResponse = async (
    userId: string,
    assistantType: string,
    message: string,
    context: any
  ) => {
    try {
      const response = await supabase.functions.invoke('ai-assistant', {
        body: {
          userId,
          assistantType,
          message: message.trim(),
          context,
        },
      });

      if (response.error) {
        if (response.error.message?.includes('exceeded your current quota') || 
            response.error.message?.includes('check your plan and billing details') ||
            response.error.body?.includes('Quota exceeded')) {
          toast({
            title: "AI Credits Depleted",
            description: "AI Credits used up - Please Deposit Credits",
            variant: "destructive",
          });
          return null;
        }
        throw response.error;
      }

      return response.data.response;
    } catch (error: any) {
      if (error.message?.includes('exceeded your current quota') || 
          error.message?.includes('check your plan and billing details') ||
          error.body?.includes('Quota exceeded')) {
        toast({
          title: "AI Credits Depleted",
          description: "AI Credits used up - Please Deposit Credits",
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
      return null;
    }
  };

  return { getAIResponse };
}