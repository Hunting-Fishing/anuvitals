import { DietNavigation } from "@/components/DietNavigation";
import { useImplementedDiets } from "@/hooks/useImplementedDiets";
import { DietImplementationProgress } from "@/components/diet/DietImplementationProgress";

// Diet data
const plannedDiets = [
  // General and Balanced Diets
  { name: "Balanced Diet", category: "General and Balanced", implemented: false },
  { name: "Mediterranean Diet", category: "General and Balanced", implemented: true },
  { name: "DASH Diet", category: "General and Balanced", implemented: true },
  { name: "Flexitarian Diet", category: "General and Balanced", implemented: false },
  { name: "Pescatarian Diet", category: "General and Balanced", implemented: false },
  { name: "Pegan Diet", category: "General and Balanced", implemented: false },
  { name: "Plant-Based Diet", category: "General and Balanced", implemented: false },
  { name: "Macrobiotic Diet", category: "General and Balanced", implemented: false },
  { name: "Nordic Diet", category: "General and Balanced", implemented: true },
  { name: "Clean Eating Diet", category: "General and Balanced", implemented: false },

  // Weight Loss and Low-Calorie Diets
  { name: "Low-Carb Diet", category: "Weight Loss", implemented: false },
  { name: "Ketogenic Diet", category: "Weight Loss", implemented: false },
  { name: "Atkins Diet", category: "Weight Loss", implemented: false },
  { name: "Low-Fat Diet", category: "Weight Loss", implemented: false },
  { name: "Weight Watchers Diet", category: "Weight Loss", implemented: false },
  { name: "Zone Diet", category: "Weight Loss", implemented: false },
  { name: "HCG Diet", category: "Weight Loss", implemented: false },
  { name: "Raw Food Diet", category: "Weight Loss", implemented: false },
  { name: "South Beach Diet", category: "Weight Loss", implemented: false },
  { name: "SlimFast Diet", category: "Weight Loss", implemented: false },
  { name: "Optavia Diet", category: "Weight Loss", implemented: false },
  { name: "Nutrisystem Diet", category: "Weight Loss", implemented: false },
  { name: "Jenny Craig Diet", category: "Weight Loss", implemented: false },
  { name: "Military Diet", category: "Weight Loss", implemented: false },
  { name: "1200-Calorie Diet", category: "Weight Loss", implemented: false },

  // Therapeutic and Medical Diets
  { name: "Diabetic Diet", category: "Therapeutic", implemented: false },
  { name: "Gluten-Free Diet", category: "Therapeutic", implemented: false },
  { name: "Dairy-Free Diet", category: "Therapeutic", implemented: false },
  { name: "Low-FODMAP Diet", category: "Therapeutic", implemented: false },
  { name: "Anti-Inflammatory Diet", category: "Therapeutic", implemented: false },
  { name: "Heart-Healthy Diet", category: "Therapeutic", implemented: false },
  { name: "Renal Diet", category: "Therapeutic", implemented: false },
  { name: "Autoimmune Protocol Diet", category: "Therapeutic", implemented: false },
  { name: "Liver-Cleansing Diet", category: "Therapeutic", implemented: false },
  { name: "Low-Sodium Diet", category: "Therapeutic", implemented: false },
  { name: "PCOS-Friendly Diet", category: "Therapeutic", implemented: false },
  { name: "Acid Reflux Diet", category: "Therapeutic", implemented: false },
  { name: "GERD-Friendly Diet", category: "Therapeutic", implemented: false },

  // Intermittent and Fasting Diets
  { name: "16/8 Intermittent Fasting", category: "Fasting", implemented: false },
  { name: "5:2 Diet", category: "Fasting", implemented: false },
  { name: "Eat-Stop-Eat", category: "Fasting", implemented: false },
  { name: "Alternate Day Fasting", category: "Fasting", implemented: false },
  { name: "OMAD Diet", category: "Fasting", implemented: false },
  { name: "Warrior Diet", category: "Fasting", implemented: false },
  { name: "Fasting Mimicking Diet", category: "Fasting", implemented: false },

  // Cultural and Regional Diets
  { name: "Asian Diet", category: "Cultural", implemented: false },
  { name: "Latin American Diet", category: "Cultural", implemented: false },
  { name: "African Heritage Diet", category: "Cultural", implemented: false },
  { name: "Traditional Japanese Diet", category: "Cultural", implemented: false },
  { name: "Indigenous Diets", category: "Cultural", implemented: false },

  // Specialized and Ethical Diets
  { name: "Vegan Diet", category: "Ethical", implemented: false },
  { name: "Vegetarian Diet", category: "Ethical", implemented: false },
  { name: "Lacto-Vegetarian Diet", category: "Ethical", implemented: false },
  { name: "Ovo-Vegetarian Diet", category: "Ethical", implemented: false },
  { name: "Lacto-Ovo Vegetarian Diet", category: "Ethical", implemented: false },
  { name: "Fruitarian Diet", category: "Ethical", implemented: false },
  { name: "Whole-Foods Plant-Based Diet", category: "Ethical", implemented: false },
  { name: "Ethical Omnivore Diet", category: "Ethical", implemented: false },

  // Performance and Athletic Diets
  { name: "High-Protein Diet", category: "Athletic", implemented: false },
  { name: "Bodybuilding Diet", category: "Athletic", implemented: false },
  { name: "Carb Cycling Diet", category: "Athletic", implemented: false },
  { name: "Athletic Plant-Based Diet", category: "Athletic", implemented: false },
  { name: "Paleo Diet", category: "Athletic", implemented: false },
  { name: "Carnivore Diet", category: "Athletic", implemented: false },

  // Detox and Gut Health Diets
  { name: "Elimination Diet", category: "Detox & Gut Health", implemented: false },
  { name: "Alkaline Diet", category: "Detox & Gut Health", implemented: false },
  { name: "Juice Cleanse", category: "Detox & Gut Health", implemented: false },
  { name: "Detox Diet", category: "Detox & Gut Health", implemented: false },
  { name: "GAPS Diet", category: "Detox & Gut Health", implemented: false },
  { name: "Candida Diet", category: "Detox & Gut Health", implemented: false },
  { name: "SIBO Diet", category: "Detox & Gut Health", implemented: false },

  // Trend-Based Diets
  { name: "Whole30 Diet", category: "Trending", implemented: false },
  { name: "Blood Type Diet", category: "Trending", implemented: false },
  { name: "MIND Diet", category: "Trending", implemented: true }
];

// Group diets by category
const groupedDiets = plannedDiets.reduce((acc, diet) => {
  if (!acc[diet.category]) {
    acc[diet.category] = [];
  }
  acc[diet.category].push(diet);
  return acc;
}, {} as Record<string, typeof plannedDiets>);

export default function DietOverview() {
  const { data: implementedDiets, isLoading: isLoadingImplemented } = useImplementedDiets();

  const getDietImplementationStatus = (dietName: string) => {
    if (!implementedDiets) return false;
    return implementedDiets.includes(dietName);
  };

  return (
    <div className="flex h-full">
      <DietNavigation />
      <div className="flex flex-1 p-8 gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Diet Guide</h1>
          <p className="text-muted-foreground">
            Select a diet category from the sidebar to explore different dietary approaches and their benefits.
          </p>
        </div>
        
        <DietImplementationProgress
          groupedDiets={groupedDiets}
          isLoadingImplemented={isLoadingImplemented}
          getDietImplementationStatus={getDietImplementationStatus}
        />
      </div>
    </div>
  );
}
