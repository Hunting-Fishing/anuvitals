
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { corsHeaders } from "../_shared/cors.ts";
import { requireAuth, handleAuthError } from "../_shared/auth.ts";

const OPENFOOD_API_BASE = "https://world.openfoodfacts.org";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate request
    await requireAuth(req);

    const url = new URL(req.url);
    const endpoint = url.searchParams.get("endpoint");
    
    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: "endpoint parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Check cache first
    const { data: cachedData, error: cacheError } = await supabaseClient
      .from('api_cache')
      .select('response, expires_at')
      .eq('url', `${OPENFOOD_API_BASE}${endpoint}`)
      .single();

    if (cacheError) {
      console.error('Cache check error:', cacheError);
    }

    // Return cached data if valid
    if (cachedData && new Date(cachedData.expires_at) > new Date()) {
      console.log('Returning cached data for:', endpoint);
      return new Response(
        JSON.stringify(cachedData.response),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log('Making API request to:', endpoint);
    const response = await fetch(`${OPENFOOD_API_BASE}${endpoint}`, {
      headers: {
        "User-Agent": "NourishNavigator/1.0 (https://lovable.dev)",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`OpenFoodFacts API error: ${response.status}`);
    }

    const data = await response.json();

    // Cache the response
    const { error: upsertError } = await supabaseClient
      .from('api_cache')
      .upsert({
        url: `${OPENFOOD_API_BASE}${endpoint}`,
        response: data,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

    if (upsertError) {
      console.error('Cache upsert error:', upsertError);
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    if (error.message.includes('Auth failed')) {
      return handleAuthError(error);
    }
    
    console.error('Error in openfood-proxy:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
