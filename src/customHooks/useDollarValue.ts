"use client";

import { useQuery } from "@tanstack/react-query";

export type TDolarValue = {
  isLoading: boolean;
  value?: number;
  lastUpdated?: Date;
  refetch: () => void;
  error: Error | null;
};

export const useDollarValue = (): TDolarValue => {
  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ["dolar"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      return {
        value: data.rates.BRL,
        lastUpdated: new Date(),
      };
    },
  });

  return {
    value: data?.value,
    lastUpdated: data?.lastUpdated,
    isLoading: isFetching,
    refetch,
    error,
  };
};
