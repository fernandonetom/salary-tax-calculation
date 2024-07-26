"use client";

import { useQuery } from "@tanstack/react-query";

export type TDolarValue = {
  isLoading: boolean;
  value?: number;
  lastUpdated?: Date;
  refetch: () => void;
};

export const useDolarValue = (): TDolarValue => {
  const { data, isFetching, refetch } = useQuery({
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
  };
};
