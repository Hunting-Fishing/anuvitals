
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
