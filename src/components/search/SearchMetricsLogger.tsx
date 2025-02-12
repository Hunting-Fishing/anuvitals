
import { supabase } from "@/integrations/supabase/client";
import { SearchFilters } from "@/services/OpenFoodFactsService";

interface LogSearchMetricsProps {
  query: string;
  filters: SearchFilters;
  resultsCount: number;
  executionTime: number;
  userId: string;
}

export async function logSearchMetrics({ 
  query, 
  filters, 
  resultsCount, 
  executionTime,
  userId 
}: LogSearchMetricsProps) {
  if (!userId) return;

  try {
    // Convert filters to a plain object that can be serialized as JSON
    const filtersJson = {
      page: filters.page,
      pageSize: filters.pageSize,
      categories: filters.categories,
      allergens: filters.allergens,
      brands: filters.brands
    };

    await supabase.from('search_analytics').insert({
      user_id: userId,
      search_query: query,
      filters: filtersJson,
      results_count: resultsCount,
      session_id: window.sessionStorage.getItem('sessionId') || crypto.randomUUID()
    });
  } catch (error) {
    console.error('Error logging search metrics:', error);
  }
}
