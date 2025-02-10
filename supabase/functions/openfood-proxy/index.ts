
import { serve } from "https://deno.fresh.dev/std@v9.6.1/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENFOOD_API_BASE = "https://world.openfoodfacts.org";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get("endpoint");
    
    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: "endpoint parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check cache first
    const { data: cachedData } = await supabaseClient
      .from('api_cache')
      .select('response')
      .eq('url', `${OPENFOOD_API_BASE}${endpoint}`)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cachedData) {
      return new Response(
        JSON.stringify(cachedData.response),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Make the actual API call
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
    await supabaseClient
      .from('api_cache')
      .upsert({
        url: `${OPENFOOD_API_BASE}${endpoint}`,
        response: data,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
