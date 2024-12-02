import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AssistantMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AssistantRequest {
  userId: string;
  assistantType: 'chef' | 'fitness' | 'health' | 'diet';
  message: string;
  context?: {
    bloodwork?: any;
    dietaryPreferences?: string[];
    healthConditions?: string[];
  };
}

const getSystemPrompt = (type: string, context?: any) => {
  const basePrompts = {
    chef: "You are an AI Chef specialized in creating healthy, personalized meal plans. ",
    fitness: "You are an AI Fitness Coach helping users achieve their fitness goals safely and effectively. ",
    health: "You are an AI Health Advisor providing evidence-based health recommendations. ",
    diet: "You are an AI Diet Planner specialized in creating personalized nutrition plans. "
  };

  let prompt = basePrompts[type as keyof typeof basePrompts];
  
  if (context) {
    if (context.bloodwork) {
      prompt += "Consider the user's blood work results in your recommendations. ";
    }
    if (context.dietaryPreferences?.length) {
      prompt += `Consider these dietary preferences: ${context.dietaryPreferences.join(', ')}. `;
    }
    if (context.healthConditions?.length) {
      prompt += `Consider these health conditions: ${context.healthConditions.join(', ')}. `;
    }
  }

  return prompt + "Provide clear, actionable advice based on the user's specific situation.";
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    const { userId, assistantType, message, context } = await req.json() as AssistantRequest;

    // Fetch conversation history
    const { data: configData, error: configError } = await supabase
      .from('ai_assistants_config')
      .select('conversation_history')
      .eq('user_id', userId)
      .eq('assistant_type', assistantType)
      .single();

    if (configError && configError.code !== 'PGRST116') {
      throw configError;
    }

    const conversationHistory = configData?.conversation_history || [];
    const systemPrompt = getSystemPrompt(assistantType, context);

    const messages: AssistantMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-5), // Keep last 5 messages for context
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Update conversation history
    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    ];

    // Update or create assistant config
    const { error: upsertError } = await supabase
      .from('ai_assistants_config')
      .upsert({
        user_id: userId,
        assistant_type: assistantType,
        conversation_history: newHistory,
      });

    if (upsertError) throw upsertError;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});