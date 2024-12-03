import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: config } = await supabase
      .rpc('get_api_configuration', { service: 'spoonacular' });

    if (!config) {
      throw new Error('API configuration not found');
    }

    const { query, cuisine, diet, type, maxReadyTime } = await req.json();
    
    const params = new URLSearchParams({
      apiKey: Deno.env.get('SPOONACULAR_API_KEY')!,
      query: query,
      number: '10',
    });

    if (cuisine) params.append('cuisine', cuisine);
    if (diet) params.append('diet', diet);
    if (type) params.append('type', type);
    if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

    console.log('Fetching recipes from Spoonacular API...');
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched recipes');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in spoonacular-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});