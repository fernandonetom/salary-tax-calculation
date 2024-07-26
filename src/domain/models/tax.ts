import { z } from "zod";

export const taxSchema = z.object({
  name: z.string(),
  value: z.coerce.number().min(0),
  type: z.enum(["FIXED", "PERCENT"]),
});

export type TTax = z.infer<typeof taxSchema>;
