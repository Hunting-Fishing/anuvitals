export interface DietCategory {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  order_index: number | null;
  created_at: string;
}

export interface Diet {
  id: string;
  name: string;
  description: string | null;
  core_principles: string | null;
  primary_goal: string | null;
  target_demographic: string | null;
  origin: string | null;
  is_therapeutic: boolean | null;
  category_id: string | null;
  created_at: string;
  updated_at: string;
}