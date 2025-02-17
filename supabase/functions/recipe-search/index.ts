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
      .rpc('get_api_configuration', { service: 'edamam_recipe' });

    if (!config) {
      throw new Error('API configuration not found');
    }

    const { query, diet, health, cuisineType, mealType, calories } = await req.json();
    
    const params = new URLSearchParams({
      type: 'public',
      app_id: Deno.env.get('EDAMAM_APP_ID')!,
      app_key: Deno.env.get('EDAMAM_APP_KEY')!,
      q: query,
    });

    if (diet) params.append('diet', diet);
    if (health) health.forEach((h: string) => params.append('health', h));
    if (cuisineType) cuisineType.forEach((c: string) => params.append('cuisineType', c));
    if (mealType) mealType.forEach((m: string) => params.append('mealType', m));
    if (calories) params.append('calories', calories);

    console.log('Fetching recipes from Edamam API...');
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?${params.toString()}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error(`Edamam API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched recipes');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in recipe-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});