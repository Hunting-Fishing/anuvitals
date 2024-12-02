const API_BASE_URL = "https://world.openfoodfacts.org";

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

export async function fetchProductDetails(barcode: string): Promise<ProductDetails> {
  const url = `${API_BASE_URL}/api/v0/product/${barcode}.json`;
  
  try {
    const response = await fetch(url);
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

  const url = `${API_BASE_URL}/cgi/search.pl?${searchParams.toString()}`;
  
  try {
    const response = await fetch(url);
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

// Common categories that we'll use as fallback
const FALLBACK_CATEGORIES = [
  "Snacks",
  "Beverages",
  "Dairy",
  "Bread",
  "Cereals",
  "Fruits",
  "Vegetables",
  "Meat",
  "Fish",
  "Sweets"
];

// Common allergens that we'll use as fallback
const FALLBACK_ALLERGENS = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans"
];

// Common brands that we'll use as fallback
const FALLBACK_BRANDS = [
  "Nestle",
  "Kellogg's",
  "Kraft",
  "General Mills",
  "Pepsi",
  "Coca-Cola",
  "Unilever",
  "Mars",
  "Danone",
  "Campbell's"
];

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.json`);
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
    const response = await fetch(`${API_BASE_URL}/allergens.json`);
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
    const response = await fetch(`${API_BASE_URL}/brands.json`);
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
  const url = `${API_BASE_URL}/cgi/product_jqm2.pl`;
  
  try {
    const formData = new FormData();
    formData.append('code', barcode);
    formData.append('product_name', productData.name || '');
    formData.append('ingredients_text', productData.ingredients || '');
    
    const response = await fetch(url, {
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