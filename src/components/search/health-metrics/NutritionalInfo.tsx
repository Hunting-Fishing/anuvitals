interface NutritionalInfoProps {
  nutritionalInfo: Record<string, any>;
}

export function NutritionalInfo({ nutritionalInfo }: NutritionalInfoProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <span>Energy</span>
        <span>{nutritionalInfo?.energy_100g || 0} kcal</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Proteins</span>
        <span>{nutritionalInfo?.proteins_100g || 0}g</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Carbohydrates</span>
        <span>{nutritionalInfo?.carbohydrates_100g || 0}g</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Fat</span>
        <span>{nutritionalInfo?.fat_100g || 0}g</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Fiber</span>
        <span>{nutritionalInfo?.fiber_100g || 0}g</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Sugar</span>
        <span>{nutritionalInfo?.sugars_100g || 0}g</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Salt</span>
        <span>{nutritionalInfo?.salt_100g || 0}g</span>
      </div>
    </div>
  );
}