import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '@/hooks/use-toast';
import { Message, AssistantType } from '../types';

export function useConversationHistory(assistantType: AssistantType) {
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useUser();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadConversationHistory();
    }
  }, [user, assistantType]);

  const loadConversationHistory = async () => {
    if (!user) return;

    try {
      // First ensure the config exists for this user and assistant type
      const { error: upsertError } = await supabase
        .from('ai_assistants_config')
        .upsert(
          {
            user_id: user.id,
            assistant_type: assistantType,
            conversation_history: [],
          },
          {
            onConflict: 'user_id,assistant_type',
          }
        );

      if (upsertError) {
        console.error('Error upserting config:', upsertError);
        throw upsertError;
      }

      // Then fetch the conversation history
      const { data, error } = await supabase
        .from('ai_assistants_config')
        .select('conversation_history')
        .eq('user_id', user.id)
        .eq('assistant_type', assistantType)
        .maybeSingle();

      if (error) {
        console.error('Error fetching history:', error);
        throw error;
      }

      if (data?.conversation_history) {
        setMessages(data.conversation_history as Message[]);
      }
    } catch (error: any) {
      console.error('Full error:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation history. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  };

  const updateConversationHistory = async (newHistory: Message[]) => {
    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from('ai_assistants_config')
        .update({ 
          conversation_history: newHistory,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('assistant_type', assistantType);

      if (updateError) {
        console.error('Error updating history:', updateError);
        throw updateError;
      }
    } catch (error: any) {
      console.error('Full error:', error);
      toast({
        title: "Error",
        description: "Failed to update conversation history",
        variant: "destructive",
      });
    }
  };

  return {
    messages,
    setMessages,
    updateConversationHistory
  };
}