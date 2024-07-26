import { TSalary } from "@/domain/models/salary";
import { TTax } from "@/domain/models/tax";

export type TCalculateProps = {
  salaries: TSalary[];
  taxes: TTax[];
  conversionRate: {
    USD: number;
  };
};

export class SalaryCalculator {
  static calculate({
    salaries,
    taxes,
    conversionRate,
  }: TCalculateProps): number {
    const totalOfSalaries = salaries.reduce((acc, salary) => {
      const value = salary.value - salary.value * (salary.tax / 100);
      if (salary.currency === "USD") {
        return acc + value * conversionRate.USD;
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
  }
}
