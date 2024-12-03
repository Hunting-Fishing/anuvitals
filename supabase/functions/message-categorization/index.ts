import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CategoryRequest {
  message: string;
  context?: {
    previousMessages?: Array<{
      role: string;
      content: string;
    }>;
    userPreferences?: {
      dietaryPreferences?: string[];
      healthConditions?: string[];
    }>;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json() as CategoryRequest;

    const systemPrompt = `You are a health and nutrition AI assistant that categorizes messages. 
    Categories are: general, health, nutrition, exercise, medication.
    Consider the message context and user preferences when categorizing.
    Respond with ONLY the category name in lowercase.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...(context?.previousMessages || []),
          { role: 'user', content: message }
        ],
        max_tokens: 10,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const category = data.choices[0].message.content.trim().toLowerCase();

    return new Response(
      JSON.stringify({ category }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in message categorization:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});