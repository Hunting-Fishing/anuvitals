import { API_ENDPOINTS, FALLBACK_ALLERGENS, FALLBACK_BRANDS, FALLBACK_CATEGORIES } from './constants/OpenFoodFactsConstants';
import type { ProductDetails, SearchFilters, SearchResponse } from './types/OpenFoodFactsTypes';

export async function fetchProductDetails(barcode: string): Promise<ProductDetails> {
  try {
    const response = await fetch(API_ENDPOINTS.PRODUCT(barcode));
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
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
  } catch (error) {
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
    const response = await fetch(`${API_ENDPOINTS.SEARCH}?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error(`Search API Error: ${response.status}`);
    }
    
    const data = await response.json();
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
    const response = await fetch(API_ENDPOINTS.CATEGORIES);
    if (!response.ok) {
      throw new Error(`Categories API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.tags.map((tag: any) => tag.name);
  } catch (error) {
    console.warn("Failed to fetch categories, using fallback data:", error);
    return FALLBACK_CATEGORIES;
  }
}

export async function fetchAllergens(): Promise<string[]> {
  try {
    const response = await fetch(API_ENDPOINTS.ALLERGENS);
    if (!response.ok) {
      throw new Error(`Allergens API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.tags.map((tag: any) => tag.name);
  } catch (error) {
    console.warn("Failed to fetch allergens, using fallback data:", error);
    return FALLBACK_ALLERGENS;
  }
}

export async function fetchBrands(): Promise<string[]> {
  try {
    const response = await fetch(API_ENDPOINTS.BRANDS);
    if (!response.ok) {
      throw new Error(`Brands API Error: ${response.status}`);
    }

    const data = await response.json();
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
    
    const response = await fetch(API_ENDPOINTS.CONTRIBUTE, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Contribution API Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 1) {
      throw new Error("Failed to contribute product!");
    }
  } catch (error) {
    throw new Error(`Failed to contribute product: ${error.message}`);
  }
}