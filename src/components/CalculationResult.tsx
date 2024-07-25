"use client";
import { AlertIcon } from "@/components/icons/AlertIcon";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useTaxCalculator } from "@/data/customHooks/useTaxCalculator";
import { useModelStore } from "@/data/store";
import { toBrazilianCurrency, cn } from "@/lib/utils";
import Link from "next/link";

const Loading = () => (
  <div className="space-y-2">
    <Skeleton className="w-28 h-6 rounded-lg" />
    <Skeleton className="w-full h-14 rounded-lg" />
    <div className="flex justify-end">
      <Skeleton className="w-28 h-6 rounded-lg" />
    </div>
  </div>
);

export const CalculationResult = ({
  className,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { salaries, taxes } = useModelStore();
  const { value: salaryCalculation } = useTaxCalculator();

  return (
    <div className={cn("min-w-96", className)}>
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

      {!salaryCalculation && <Loading />}

      {salaryCalculation && salaries.length > 0 && taxes.length > 0 && (
        <>
          <p>You will receive:</p>
          <p className="text-6xl text-right">
            {toBrazilianCurrency(salaryCalculation)}
          </p>
          <p className="text-right">After all taxes</p>
        </>
      )}
    </div>
  );
};
