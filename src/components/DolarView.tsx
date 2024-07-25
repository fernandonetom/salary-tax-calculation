"use client";
import { RefreshIcon } from "@/components/icons/RefreshIcon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDolarValue } from "@/data/customHooks/useDolarValue";
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
  } = useDolarValue();

  return (
    <div
      className={cn("flex min-w-96 justify-between items-center", className)}
    >
      {isLoading && <Loading />}
      {!isLoading && (
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
    </div>
  );
};
