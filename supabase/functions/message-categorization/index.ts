import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MessageContext {
  previousMessages?: Array<{ role: string; content: string }>;
  userPreferences?: {
    dietaryPreferences?: string[];
    healthConditions?: string[];
  };
}

interface RequestBody {
  message: string;
  context?: MessageContext;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json() as RequestBody;

    // Simple categorization logic - can be enhanced later
    const category = determineCategory(message, context);

    return new Response(
      JSON.stringify({ category }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in message categorization:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});

function determineCategory(message: string, context?: MessageContext): string {
  const lowerMessage = message.toLowerCase();
  
  // Basic categorization logic
  if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    return 'dietary';
  }
  if (lowerMessage.includes('blood') || lowerMessage.includes('test') || lowerMessage.includes('result')) {
    return 'medical';
  }
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('activity')) {
    return 'fitness';
  }
  if (lowerMessage.includes('supplement') || lowerMessage.includes('vitamin')) {
    return 'supplements';
  }
  
  return 'general';
}