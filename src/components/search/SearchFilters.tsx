import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  const [categorySearch, setCategorySearch] = useState("");
  const [allergenSearch, setAllergenSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const filterOptions = (options: string[], search: string) => {
    return ["all", ...options.sort()].filter(option => 
      option.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="Search categories..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="mb-2"
              />
            </div>
            {filterOptions(categories, categorySearch).map((category) => (
              <SelectItem 
                key={category} 
                value={category}
                className={category === "all" ? "font-bold" : ""}
              >
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Select value={selectedAllergen} onValueChange={onAllergenChange}>
          <SelectTrigger>
            <SelectValue placeholder="Allergen" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="Search allergens..."
                value={allergenSearch}
                onChange={(e) => setAllergenSearch(e.target.value)}
                className="mb-2"
              />
            </div>
            {filterOptions(allergens, allergenSearch).map((allergen) => (
              <SelectItem 
                key={allergen} 
                value={allergen}
                className={allergen === "all" ? "font-bold" : ""}
              >
                {allergen === "all" ? "All Allergens" : allergen}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Select value={selectedBrand} onValueChange={onBrandChange}>
          <SelectTrigger>
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="Search brands..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="mb-2"
              />
            </div>
            {filterOptions(brands, brandSearch).map((brand) => (
              <SelectItem 
                key={brand} 
                value={brand}
                className={brand === "all" ? "font-bold" : ""}
              >
                {brand === "all" ? "All Brands" : brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}