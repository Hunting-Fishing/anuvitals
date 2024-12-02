const API_BASE_URL = "https://world.openfoodfacts.org/api/v0/product";

export interface ProductDetails {
  name: string;
  ingredients: string;
  nutritional_info: Record<string, any>;
  image_url: string;
}

export async function fetchProductDetails(barcode: string): Promise<ProductDetails> {
  const url = `${API_BASE_URL}/${barcode}.json`;
  
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
      image_url: product.image_url || "N/A"
    };
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}