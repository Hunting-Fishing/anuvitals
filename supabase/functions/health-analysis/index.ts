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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    const { userId, query } = await req.json();

    console.log('Fetching user health data for analysis...');

    // Fetch all relevant health data
    const { data: bloodwork } = await supabase
      .from('blood_work_results')
      .select('*')
      .eq('user_id', userId)
      .order('test_date', { ascending: false })
      .limit(1);

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Construct context for AI analysis
    const healthContext = {
      bloodwork: bloodwork?.[0]?.results || {},
      goals: {
        dietary: profile?.dietary_preferences || [],
        fitness: profile?.fitness_goals || [],
        weight: profile?.weight_goals,
        target_weight: profile?.target_weight_kg,
      },
      metrics: {
        height: profile?.height_cm,
        weight: profile?.current_weight_kg,
        bmi: profile?.bmi,
      },
      health_conditions: profile?.health_conditions || [],
      allergies: profile?.allergies || [],
    };

    console.log('Analyzing health data with AI...');

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a comprehensive health analysis AI that provides personalized recommendations based on blood work, health metrics, and personal goals. Focus on:
              1. Blood work analysis and trends
              2. Nutritional recommendations based on deficiencies
              3. Diet suggestions aligned with goals
              4. Supplement recommendations
              5. Exercise recommendations based on goals
              6. Lifestyle modifications
              
              Always provide evidence-based recommendations and note when medical consultation is advised.`
          },
          {
            role: 'user',
            content: `Analyze the following health data and provide recommendations. Query: ${query}\n\nHealth Data: ${JSON.stringify(healthContext, null, 2)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error('Failed to get AI recommendations');
    }

    const data = await openAIResponse.json();
    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in health-analysis function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});