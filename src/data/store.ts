import { TModel } from "@/data/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TModelStore = TModel & {
  setModel: (values: TModel) => void;
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
