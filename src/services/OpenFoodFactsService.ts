
import { API_ENDPOINTS, FALLBACK_ALLERGENS, FALLBACK_BRANDS, FALLBACK_CATEGORIES } from './constants/OpenFoodFactsConstants';
import { supabase } from "@/integrations/supabase/client";

export interface ProductDetails {
  name: string;
  ingredients: string;
  nutritional_info: Record<string, any>;
  image_url: string;
  barcode: string;
}

export interface SearchFilters {
  brands?: string;
  categories?: string;
  ingredients?: string;
  allergens?: string;
  page?: number;
  pageSize?: number;
}

export interface SearchResponse {
  count: number;
  page: number;
  products: ProductDetails[];
}

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'User-Agent': 'NourishNavigator/1.0 (https://lovable.dev)',
    'Accept': 'application/json',
  }
};

const callOpenFoodApi = async (endpoint: string) => {
  // Get the session token for authentication
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    throw new Error(`Authentication error: ${sessionError.message}`);
  }

  if (!session?.access_token) {
    throw new Error('No active session found');
  }

  const { data, error } = await supabase.functions.invoke('openfood-proxy', {
    body: { endpoint },
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });

  if (error) throw error;
  return data;
};

export async function fetchProductDetails(barcode: string): Promise<ProductDetails> {
  try {
    const endpoint = `/api/v0/product/${barcode}.json`;
    const data = await callOpenFoodApi(endpoint);
    
    if (data.status !== 1) {
      throw new Error("Product not found!");
    }

    const product = data.product;
    return {
      name: product.product_name || "N/A",
      ingredients: product.ingredients_text || "N/A",
      nutritional_info: product.nutriments || {},
      image_url: product.image_url || "N/A",
      barcode: product.code || barcode
    };
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export async function searchProducts(query: string, filters: SearchFilters = {}): Promise<SearchResponse> {
  const searchParams = new URLSearchParams({
    search_terms: query,
    json: '1',
    page_size: (filters.pageSize || 20).toString(),
    page: (filters.page || 1).toString(),
    search_simple: '1',
  });

  if (filters.brands) {
    searchParams.append('brands_tags', filters.brands);
  }
  if (filters.categories) {
    searchParams.append('categories_tags', filters.categories);
  }
  if (filters.allergens) {
    searchParams.append('allergens_tags', filters.allergens);
  }

  try {
    const endpoint = `/cgi/search.pl?${searchParams.toString()}`;
    const data = await callOpenFoodApi(endpoint);
    console.log("API Search Results:", data);

    return {
      count: data.count,
      page: data.page,
      products: data.products.map((product: any) => ({
        name: product.product_name || "N/A",
        ingredients: product.ingredients_text || "N/A",
        nutritional_info: product.nutriments || {},
        image_url: product.image_url || "N/A",
        barcode: product.code || "N/A"
      }))
    };
  } catch (error) {
    console.error("Error searching products:", error);
    return {
      count: 0,
      page: 1,
      products: []
    };
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    console.log("Fetching categories...");
    const data = await callOpenFoodApi('/categories.json');
    return data.tags.map((tag: any) => tag.name);
  } catch (error) {
    console.warn("Failed to fetch categories, using fallback data:", error);
    return FALLBACK_CATEGORIES;
  }
}

export async function fetchAllergens(): Promise<string[]> {
  try {
    console.log("Fetching allergens...");
    const data = await callOpenFoodApi('/allergens.json');
    return data.tags.map((tag: any) => tag.name);
  } catch (error) {
    console.warn("Failed to fetch allergens, using fallback data:", error);
    return FALLBACK_ALLERGENS;
  }
}

export async function fetchBrands(): Promise<string[]> {
  try {
    console.log("Fetching brands...");
    const data = await callOpenFoodApi('/brands.json');
    return data.tags.map((tag: any) => tag.name);
  } catch (error) {
    console.warn("Failed to fetch brands, using fallback data:", error);
    return FALLBACK_BRANDS;
  }
}

export async function contributeProduct(productData: Partial<ProductDetails>, barcode: string): Promise<void> {
  try {
    const formData = new FormData();
    formData.append('code', barcode);
    formData.append('product_name', productData.name || '');
    formData.append('ingredients_text', productData.ingredients || '');
    
    const endpoint = '/cgi/product_jqm2.pl';
    const response = await callOpenFoodApi(endpoint);

    if (response.status !== 1) {
      throw new Error("Failed to contribute product!");
    }
  } catch (error) {
    throw new Error(`Failed to contribute product: ${error.message}`);
  }
}
