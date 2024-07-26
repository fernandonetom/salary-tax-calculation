"use client";

import { AlertIcon } from "@/components/icons/AlertIcon";
import { RefreshIcon } from "@/components/icons/RefreshIcon";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDollarValue } from "@/customHooks/useDollarValue";
import { toBrazilianCurrency, cn } from "@/lib/utils";

const Loading = () => (
  <>
    <div className="space-y-2" role="loading-dollar-view">
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-44 h-4" />
    </div>
    <Skeleton className="size-12 rounded-lg" />
  </>
);

export const DollarView = ({
  className,
  role,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const {
    value: dollarValue,
    lastUpdated,
    refetch,
    isLoading,
    error,
  } = useDollarValue();

  return (
    <div
      className={cn("flex min-w-96 justify-between items-center", className)}
      role={role}
    >
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <>
          <div>
            <p role="dollar-value">
              {!isLoading && dollarValue && toBrazilianCurrency(dollarValue)}
            </p>
            <p>{isLoading && "Loading..."}</p>
            <p className="text-xs">
              {lastUpdated && `Last updated at ${lastUpdated.toLocaleString()}`}
            </p>
          </div>
          <Button
            variant="ghost"
            className="border-none"
            onClick={() => refetch()}
          >
            <RefreshIcon />
          </Button>
        </>
      )}
      {!isLoading && error && (
        <Alert className="max-w-96 flex items-center justify-center space-x-4">
          <AlertIcon className="size-10 -mt-2" />
          <div>
            <AlertTitle>Error loading the dollar value.</AlertTitle>
            <AlertDescription>
              Error message: {error.message}
              <Button variant="ghost" onClick={() => refetch()}>
                Try again
              </Button>
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
};
