import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecipeSearchParams {
  query: string;
  diet?: string;
  health?: string[];
  cuisineType?: string[];
  mealType?: string[];
  calories?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get API configuration
    const { data: config, error: configError } = await supabaseClient
      .rpc('get_api_configuration', { service: 'edamam_recipe' });

    if (configError) {
      console.error('Error fetching API configuration:', configError);
      throw new Error('Failed to fetch API configuration');
    }

    const { app_id, app_key } = config;
    const searchParams: RecipeSearchParams = await req.json();
    
    // Build query parameters
    const params = new URLSearchParams({
      type: 'public',
      app_id,
      app_key,
      q: searchParams.query,
    });

    if (searchParams.diet) params.append('diet', searchParams.diet);
    if (searchParams.health) {
      searchParams.health.forEach(h => params.append('health', h));
    }
    if (searchParams.cuisineType) {
      searchParams.cuisineType.forEach(c => params.append('cuisineType', c));
    }
    if (searchParams.mealType) {
      searchParams.mealType.forEach(m => params.append('mealType', m));
    }
    if (searchParams.calories) params.append('calories', searchParams.calories);

    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?${params.toString()}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Edamam API Error:', error);
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();

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