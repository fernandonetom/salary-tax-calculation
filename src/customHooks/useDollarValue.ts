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
        "https://economia.awesomeapi.com.br/json/last/USD-BRL"
      );
      const {USDBRL} = await response.json();
      return {
        value: Number(Number(USDBRL?.bid).toFixed(2)),
        lastUpdated: USDBRL?.create_date ? new Date(USDBRL.create_date) : new Date()
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
