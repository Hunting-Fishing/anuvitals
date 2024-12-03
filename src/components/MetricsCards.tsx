import { CaloriesCard } from "./metrics/CaloriesCard";
import { NutrientBalanceCard } from "./metrics/NutrientBalanceCard";
import { WeeklyGoalsCard } from "./metrics/WeeklyGoalsCard";
import { HeartHealthCard } from "./metrics/HeartHealthCard";
import { SleepRecoveryCard } from "./metrics/SleepRecoveryCard";
import { FitnessActivityCard } from "./metrics/FitnessActivityCard";

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <CaloriesCard />
      <NutrientBalanceCard />
      <WeeklyGoalsCard />
      <HeartHealthCard />
      <SleepRecoveryCard />
      <FitnessActivityCard />
    </div>
  );
}