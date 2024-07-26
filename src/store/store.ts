import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { salarySchema } from "@/domain/models/salary";
import { taxSchema } from "@/domain/models/tax";

export const salariesModelSchema = z.object({
  salaries: z.array(salarySchema),
  taxes: z.array(taxSchema),
});

export type TSalariesModel = z.infer<typeof salariesModelSchema>;

type TModelStore = TSalariesModel & {
  setModel: (values: TSalariesModel) => void;
};

export const useModelStore = create<TModelStore>()(
  persist(
    (set) => ({
      salaries: [
        {
          currency: "USD",
          tax: 0.5,
          value: 4684.88,
        },
        {
          currency: "BRL",
          tax: 0,
          value: 4785,
        },
      ],
      taxes: [
        {
          name: "Government",
          type: "PERCENT",
          value: 6,
        },
        {
          name: "Consulting",
          type: "FIXED",
          value: 300,
        },
        {
          name: "INSS",
          type: "FIXED",
          value: 400,
        },
      ],
      setModel: (values) => set(values),
    }),
    {
      name: "model-storage",
    }
  )
);
