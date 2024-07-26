"use client";
import { AlertIcon } from "@/components/icons/AlertIcon";
import { RefreshIcon } from "@/components/icons/RefreshIcon";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDolarValue } from "@/customHooks/useDolarValue";
import { toBrazilianCurrency, cn } from "@/lib/utils";

const Loading = () => (
  <>
    <div className="space-y-2">
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-44 h-4" />
    </div>
    <Skeleton className="size-12 rounded-lg" />
  </>
);
export const DolarView = ({
  className,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const {
    value: dolarValue,
    lastUpdated,
    refetch,
    isLoading,
    error,
  } = useDolarValue();

  return (
    <div
      className={cn("flex min-w-96 justify-between items-center", className)}
    >
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <>
          <div>
            <p>{!isLoading && dolarValue && toBrazilianCurrency(dolarValue)}</p>
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
