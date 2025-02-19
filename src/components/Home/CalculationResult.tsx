"use client";

import { AlertIcon } from "@/components/icons/AlertIcon";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useDollarValue } from "@/customHooks/useDollarValue";
import { SalaryCalculator } from "@/domain/services/salaryCalculator";
import { toBrazilianCurrency, cn } from "@/lib/utils";
import { useModelStore } from "@/store/store";
import Link from "next/link";

const Loading = () => (
  <div className="space-y-2" role="loading-result">
    <Skeleton className="w-28 h-6 rounded-lg" />
    <Skeleton className="w-full h-14 rounded-lg" />
    <div className="flex justify-end">
      <Skeleton className="w-28 h-6 rounded-lg" />
    </div>
  </div>
);

export const CalculationResult = ({
  className,
  role,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { salaries, taxes } = useModelStore();
  const { isLoading, value: usdValue, error } = useDollarValue();

  return (
    <div className={cn("min-w-96", className)} role={role}>
      {(salaries.length === 0 || taxes.length === 0) && (
        <Alert className="max-w-96 flex items-center justify-center space-x-4">
          <AlertIcon className="size-10 -mt-2" />
          <div>
            <AlertTitle>No salaries or taxes registered</AlertTitle>
            <AlertDescription>
              Your should insert at least one salary and one tax to see the
              <Link href={"/settings"}>click here</Link> to add them.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {isLoading && <Loading />}

      {!isLoading && !error && salaries.length > 0 && taxes.length > 0 && (
        <>
          <p>You will receive:</p>
          <p className="text-6xl text-right" role="result">
            {toBrazilianCurrency(
              SalaryCalculator.calculate({
                salaries,
                taxes,
                conversionRate: {
                  USD: usdValue!,
                },
              })
            )}
          </p>
          <p className="text-right">After all taxes</p>
        </>
      )}
    </div>
  );
};
