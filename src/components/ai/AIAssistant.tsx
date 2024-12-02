import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Message, AssistantType, AIAssistantProps } from "./types";
import { AssistantHeader } from "./AssistantHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

export function AIAssistant({ initialType = 'health' }: AIAssistantProps) {
  const [assistantType, setAssistantType] = useState<AssistantType>(initialType);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
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

    const { data, error } = await supabase
      .from('ai_assistants_config')
      .select('conversation_history')
      .eq('user_id', user.id)
      .eq('assistant_type', assistantType)
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        title: "Error",
        description: "Failed to load conversation history",
        variant: "destructive",
      });
      return;
    }

    if (data?.conversation_history) {
      setConversation(data.conversation_history);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    setIsLoading(true);
    const userMessage = { role: 'user' as const, content: message };
    setConversation(prev => [...prev, userMessage]);
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

      const aiMessage = {
        role: 'assistant' as const,
        content: response.data.response,
      };
      setConversation(prev => [...prev, aiMessage]);
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

  if (!user) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Please log in to use the AI Assistant
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 flex flex-col h-[600px]">
      <AssistantHeader 
        assistantType={assistantType}
        onTypeChange={(value: AssistantType) => setAssistantType(value)}
      />
      <MessageList messages={conversation} />
      <MessageInput
        message={message}
        onChange={setMessage}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </Card>
  );
}