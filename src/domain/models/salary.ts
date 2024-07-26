import { z } from "zod";

export const salarySchema = z.object({
  value: z.coerce.number(),
  tax: z.coerce.number().min(0).max(100),
  currency: z.enum(["BRL", "USD"]),
});

export type TSalary = z.infer<typeof salarySchema>;
