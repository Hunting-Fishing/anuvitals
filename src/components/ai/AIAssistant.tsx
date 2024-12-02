import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Brain, ChefHat, Dumbbell, Apple } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type AssistantType = 'chef' | 'fitness' | 'health' | 'diet';

interface AIAssistantProps {
  initialType?: AssistantType;
}

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

  const getAssistantIcon = (type: AssistantType) => {
    switch (type) {
      case 'chef':
        return <ChefHat className="w-5 h-5" />;
      case 'fitness':
        return <Dumbbell className="w-5 h-5" />;
      case 'health':
        return <Brain className="w-5 h-5" />;
      case 'diet':
        return <Apple className="w-5 h-5" />;
      default:
        return null;
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          {getAssistantIcon(assistantType)}
          AI Assistant
        </h2>
        <Select 
          value={assistantType} 
          onValueChange={(value: AssistantType) => setAssistantType(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chef">AI Chef</SelectItem>
            <SelectItem value="fitness">Fitness Coach</SelectItem>
            <SelectItem value="health">Health Advisor</SelectItem>
            <SelectItem value="diet">Diet Planner</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading || !message.trim()}
          className="self-end"
        >
          Send
        </Button>
      </div>
    </Card>
  );
}