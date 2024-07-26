import "@testing-library/jest-dom";

import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { useDollarValue, TDolarValue } from "./useDollarValue";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("useDollarValue", () => {
  const mockData = {
    rates: {
      BRL: 5.5,
    },
  };

  const refetch = jest.fn();

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        value: mockData.rates.BRL,
        lastUpdated: new Date(),
      },
      isFetching: false,
      refetch,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct dollar value", async () => {
    const { result } = renderHook(() => useDollarValue());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.value).toBe(mockData.rates.BRL);
    expect(result.current.lastUpdated).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it("should refetch the data when calling refetch", async () => {
    const { result } = renderHook(() => useDollarValue());

    result.current.refetch();
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
