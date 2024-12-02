export interface ExtractedResult {
  marker: string;
  value: string;
  unit: string;
}

export interface BloodWorkMarker {
  name: string;
  variations: string[];
  unit: string;
  minRange?: number;
  maxRange?: number;
}