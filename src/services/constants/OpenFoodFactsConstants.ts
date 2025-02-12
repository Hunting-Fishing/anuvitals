
export const API_BASE_URL = "https://world.openfoodfacts.org";
export const API_ENDPOINTS = {
  PRODUCT: (barcode: string) => `${API_BASE_URL}/api/v0/product/${barcode}.json`,
  SEARCH: `${API_BASE_URL}/cgi/search.pl`,
  CATEGORIES: `${API_BASE_URL}/categories.json`,
  ALLERGENS: `${API_BASE_URL}/data/taxonomies/allergens.json`,
  BRANDS: `${API_BASE_URL}/brands.json`,
  CONTRIBUTE: `${API_BASE_URL}/cgi/product_jqm2.pl`
};

// Fallback data
export const FALLBACK_CATEGORIES = [
  "Snacks", "Beverages", "Dairy", "Bread", "Cereals",
  "Fruits", "Vegetables", "Meat", "Fish", "Sweets"
];

export const FALLBACK_ALLERGENS = [
  "Milk", "Eggs", "Fish", "Crustaceans", "Shellfish",
  "Tree nuts", "Almonds", "Brazil nuts", "Cashews",
  "Hazelnuts", "Macadamia", "Pecans", "Pine nuts",
  "Pistachios", "Walnuts", "Peanuts", "Wheat",
  "Soybeans", "Sesame", "Mustard", "Celery", "Lupin",
  "Molluscs", "Sulphites", "Gluten", "Lactose", "Corn",
  "Gelatin", "Coconut", "Sunflower seeds"
];

export const FALLBACK_BRANDS = [
  "Nestle", "Kellogg's", "Kraft", "General Mills", "Pepsi",
  "Coca-Cola", "Unilever", "Mars", "Danone", "Campbell's"
];
