import { BloodWorkMarker } from "@/types/bloodwork";

export const bloodWorkMarkers: BloodWorkMarker[] = [
  {
    name: 'Hemoglobin',
    variations: ['HGB', 'Hgb', 'Hemoglobin'],
    unit: 'g/dL',
    minRange: 12,
    maxRange: 16
  },
  {
    name: 'White Blood Cells',
    variations: ['WBC', 'White Blood Cells', 'Leukocytes'],
    unit: 'K/µL',
    minRange: 4,
    maxRange: 11
  },
  // ... Add more markers here
];