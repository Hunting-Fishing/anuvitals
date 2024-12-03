import { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAI } from './AIContext';
import { Message } from './types';
import { useConversationHistory } from './hooks/useConversationHistory';
import { useAIResponse } from './hooks/useAIResponse';
import { useMessageCategorization } from './hooks/useMessageCategorization';
import { MessageCategory } from './types/MessageCategories';

export function useConversation() {
  const [message, setMessage] = useState('');
  const { assistantType, isLoading, setIsLoading } = useAI();
  const user = useUser();
  const supabase = useSupabaseClient();
  const { messages, setMessages, updateConversationHistory } = useConversationHistory(assistantType);
  const { getAIResponse } = useAIResponse();
  const { categorizeMessage } = useMessageCategorization();
  const [lastAttempt, setLastAttempt] = useState<{
    message: string;
    updatedMessages: Message[];
  } | null>(null);

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    setIsLoading(true);
    
    // Get message category
    const category = await categorizeMessage(message, {
      previousMessages: messages.slice(-5).map(m => ({
        role: m.role,
        content: m.content
      })),
      userPreferences: {
        dietaryPreferences: [], // Will be populated from profile
        healthConditions: []    // Will be populated from profile
      }
    });

    const userMessage: Message = { 
      role: 'user', 
      content: message,
      metadata: {
        category,
        timestamp: new Date().toISOString()
      }
    };

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
        // Get category for AI response
        const aiCategory = await categorizeMessage(aiResponse);
        
        const aiMessage: Message = {
          role: 'assistant',
          content: aiResponse,
          metadata: {
            category: aiCategory,
            timestamp: new Date().toISOString()
          }
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