import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAI } from './AIContext';
import { Message } from './types';
import { useConversationHistory } from './hooks/useConversationHistory';
import { useAIResponse } from './hooks/useAIResponse';

export function useConversation() {
  const [message, setMessage] = useState('');
  const { assistantType, isLoading, setIsLoading } = useAI();
  const user = useUser();
  const supabase = useSupabaseClient();
  const { messages, setMessages, updateConversationHistory } = useConversationHistory(assistantType);
  const { getAIResponse } = useAIResponse();
  const [lastAttempt, setLastAttempt] = useState<{
    message: string;
    updatedMessages: Message[];
  } | null>(null);

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLastAttempt({ message: message, updatedMessages });
    setMessage('');

    try {
      // Get profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('dietary_preferences, health_conditions')
        .eq('id', user.id)
        .single();

      // Get blood work data
      const { data: bloodworkData, error: bloodworkError } = await supabase
        .from('blood_work_results')
        .select('results')
        .eq('user_id', user.id)
        .order('test_date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (bloodworkError && bloodworkError.code !== 'PGRST116') {
        throw bloodworkError;
      }

      const aiResponse = await getAIResponse(
        user.id,
        assistantType,
        message,
        {
          bloodwork: bloodworkData?.results || null,
          dietaryPreferences: profileData?.dietary_preferences || [],
          healthConditions: profileData?.health_conditions || [],
        }
      );

      if (aiResponse) {
        const aiMessage: Message = {
          role: 'assistant',
          content: aiResponse,
        };

        const newHistory = [...updatedMessages, aiMessage];
        setMessages(newHistory);
        await updateConversationHistory(newHistory);
      }
      setLastAttempt(null);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const retryMessage = async () => {
    if (!lastAttempt) return;
    
    setMessage(lastAttempt.message);
    setMessages(lastAttempt.updatedMessages);
    await sendMessage();
  };

  return {
    message,
    setMessage,
    sendMessage,
    isLoading,
    messages,
    retryMessage
  };
}