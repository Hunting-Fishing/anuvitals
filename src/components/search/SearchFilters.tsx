import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  categories: string[];
  allergens: string[];
  brands: string[];
  selectedCategory: string;
  selectedAllergen: string;
  selectedBrand: string;
  onCategoryChange: (value: string) => void;
  onAllergenChange: (value: string) => void;
  onBrandChange: (value: string) => void;
}

export function SearchFilters({
  categories,
  allergens,
  brands,
  selectedCategory,
  selectedAllergen,
  selectedBrand,
  onCategoryChange,
  onAllergenChange,
  onBrandChange,
}: SearchFiltersProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedAllergen} onValueChange={onAllergenChange}>
        <SelectTrigger>
          <SelectValue placeholder="Allergen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Allergens</SelectItem>
          {allergens.map((allergen) => (
            <SelectItem key={allergen} value={allergen}>
              {allergen}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedBrand} onValueChange={onBrandChange}>
        <SelectTrigger>
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}