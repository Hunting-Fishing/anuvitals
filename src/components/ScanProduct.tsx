import { useState, useEffect } from "react";
import { fetchCategories, fetchAllergens, fetchBrands } from "@/services/OpenFoodFactsService";
import { useToast } from "@/hooks/use-toast";
import { SearchForm } from "./search/SearchForm";
import { ScanForm } from "./scan/ScanForm";

export function ScanProduct() {
  const [categories, setCategories] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const [categoriesData, allergensData, brandsData] = await Promise.all([
        fetchCategories(),
        fetchAllergens(),
        fetchBrands()
      ]);
      setCategories(categoriesData);
      setAllergens(allergensData);
      setBrands(brandsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load filters",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-8">
      <SearchForm 
        categories={categories}
        allergens={allergens}
        brands={brands}
      />
      <ScanForm />
    </div>
  );
}