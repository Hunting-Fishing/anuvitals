import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '@/hooks/use-toast';
import { useAI } from './AIContext';
import { Message } from './types';

export function useConversation() {
  const [message, setMessage] = useState('');
  const { messages, setMessages, assistantType, isLoading, setIsLoading } = useAI();
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
      const { error: upsertError } = await supabase
        .from('ai_assistants_config')
        .upsert({
          user_id: user.id,
          assistant_type: assistantType,
          conversation_history: [],
        }, {
          onConflict: 'user_id,assistant_type'
        });

      if (upsertError) throw upsertError;

      const { data, error } = await supabase
        .from('ai_assistants_config')
        .select('conversation_history')
        .eq('user_id', user.id)
        .eq('assistant_type', assistantType)
        .single();

      if (error) throw error;

      if (data?.conversation_history) {
        setMessages(data.conversation_history as Message[]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load conversation history",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage('');

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('dietary_preferences, health_conditions')
        .eq('id', user.id)
        .single();

      const { data: bloodworkData } = await supabase
        .from('blood_work_results')
        .select('results')
        .eq('user_id', user.id)
        .order('test_date', { ascending: false })
        .limit(1)
        .single();

      const response = await supabase.functions.invoke('ai-assistant', {
        body: {
          userId: user.id,
          assistantType,
          message: message.trim(),
          context: {
            bloodwork: bloodworkData?.results,
            dietaryPreferences: profileData?.dietary_preferences,
            healthConditions: profileData?.health_conditions,
          },
        },
      });

      if (response.error) throw response.error;

      const aiMessage: Message = {
        role: 'assistant',
        content: response.data.response,
      };

      const newHistory = [...updatedMessages, aiMessage];
      setMessages(newHistory);

      const { error: updateError } = await supabase
        .from('ai_assistants_config')
        .update({ conversation_history: newHistory })
        .eq('user_id', user.id)
        .eq('assistant_type', assistantType);

      if (updateError) throw updateError;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    setMessage,
    sendMessage,
    isLoading
  };
}