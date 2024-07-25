import { useModelStore } from "@/data/store";
import { useDolarValue } from "@/data/customHooks/useDolarValue";
import { useCallback } from "react";

export const useTaxCalculator = () => {
  const { salaries, taxes } = useModelStore();
  const { value: dolarValue, isLoading } = useDolarValue();

  const calculate = useCallback(() => {
    const dolarCotation = dolarValue || 0;
    const totalOfSalaries = salaries.reduce((acc, salary) => {
      const value = salary.value - salary.value * (salary.tax / 100);
      if (salary.currency === "USD") {
        return acc + value * dolarCotation;
      }

      return acc + value;
    }, 0);

    const totalTaxes = taxes.reduce((acc, tax) => {
      if (tax.type === "FIXED") {
        return acc + tax.value;
      }

      return acc + totalOfSalaries * (tax.value / 100);
    }, 0);

    return totalOfSalaries - totalTaxes;
  }, [dolarValue, salaries, taxes]);

  return {
    value: isLoading ? undefined : calculate(),
  };
};
