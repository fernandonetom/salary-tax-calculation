import { z } from "zod";

export const modelSchema = z.object({
  salaries: z.array(
    z.object({
      value: z.coerce.number(),
      tax: z.coerce.number().min(0).max(100),
      currency: z.enum(["BRL", "USD"]),
    })
  ),
  taxes: z.array(
    z.object({
      name: z.string(),
      value: z.coerce.number().min(0),
      type: z.enum(["FIXED", "PERCENT"]),
    })
  ),
});

export type TModel = z.infer<typeof modelSchema>;
