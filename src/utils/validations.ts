import { z } from "zod";

export const healthMetricSchema = z.object({
  health_score: z.number()
    .min(0, "Health score must be at least 0")
    .max(100, "Health score must be at most 100"),
  date: z.string(),
  user_id: z.string()
});

export const bloodWorkResultSchema = z.object({
  marker: z.string(),
  value: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Value must be a valid number"
  }),
  unit: z.string()
});

export const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  height_cm: z.number().positive("Height must be positive").optional(),
  current_weight_kg: z.number().positive("Weight must be positive").optional(),
  target_weight_kg: z.number().positive("Target weight must be positive").optional(),
  dietary_preferences: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  fitness_goals: z.array(z.string()).optional()
});
