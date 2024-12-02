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

  let prompt = basePrompts[type as keyof typeof basePrompts] || basePrompts.health;
  
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
      ...conversationHistory.slice(-5),
      { role: 'user', content: message }
    ];

    try {
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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

      if (!openAIResponse.ok) {
        const errorData = await openAIResponse.json();
        console.error('OpenAI API Error:', errorData);
        
        // Handle quota exceeded error specifically
        if (errorData.error?.message?.includes('exceeded your current quota')) {
          return new Response(
            JSON.stringify({ 
              error: 'AI service is temporarily unavailable. Please try again later or contact support.',
              details: 'Quota exceeded'
            }),
            {
              status: 503,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await openAIResponse.json();
      
      if (!data.choices?.[0]?.message?.content) {
        console.error('Invalid OpenAI response format:', data);
        throw new Error('Invalid response format from OpenAI API');
      }

      const generatedText = data.choices[0].message.content;

      // Update conversation history
      const newHistory = [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: generatedText }
      ];

      // Update conversation history in database
      const { error: updateError } = await supabase
        .from('ai_assistants_config')
        .update({ conversation_history: newHistory })
        .eq('user_id', userId)
        .eq('assistant_type', assistantType);

      if (updateError) {
        console.error('Error updating conversation history:', updateError);
      }

      return new Response(JSON.stringify({ response: generatedText }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (openAIError) {
      console.error('OpenAI API call failed:', openAIError);
      throw openAIError;
    }
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.cause || error.stack
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});