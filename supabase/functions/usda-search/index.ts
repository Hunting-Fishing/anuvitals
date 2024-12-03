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
    const { query, dataType, pageSize = 25, pageNumber = 1, sortBy, sortOrder } = await req.json();

    const params = new URLSearchParams({
      api_key: USDA_API_KEY,
      query,
      pageSize: pageSize.toString(),
      pageNumber: pageNumber.toString(),
    });

    if (dataType) {
      dataType.forEach((type: string) => params.append('dataType', type));
    }
    if (sortBy) params.append('sortBy', sortBy);
    if (sortOrder) params.append('sortOrder', sortOrder);

    console.log('Fetching USDA food data...');
    const response = await fetch(
      `${USDA_API_BASE_URL}/foods/search?${params.toString()}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error(`USDA API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched USDA food data');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in USDA search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});