import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const USDA_API_KEY = Deno.env.get('USDA_Food_data_Central_ API');
const USDA_API_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fdcId } = await req.json();

    console.log(`Fetching details for food ID: ${fdcId}`);
    const response = await fetch(
      `${USDA_API_BASE_URL}/food/${fdcId}?api_key=${USDA_API_KEY}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error(`USDA API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched food details');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in USDA food details function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});