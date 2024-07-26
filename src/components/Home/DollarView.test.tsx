import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { DollarView } from "@/components/Home/DollarView";
import { useDollarValue } from "@/customHooks/useDollarValue";
import { toBrazilianCurrency } from "@/lib/utils";

jest.mock("../../customHooks/useDollarValue", () => ({
  useDollarValue: jest.fn(),
}));

describe("DollarView", () => {
  test("renders loading state", () => {
    (useDollarValue as jest.Mock).mockReturnValue({
      isLoading: true,
      value: null,
      lastUpdated: null,
      refetch: jest.fn(),
      error: null,
    });

    render(<DollarView />);

    expect(screen.getByRole("loading-dollar-view")).toBeInTheDocument();
  });

  test("renders loaded state", () => {
    const mockDollarValue = 5.3;
    const mockLastUpdated = new Date();
    const mockRefetch = jest.fn();

    (useDollarValue as jest.Mock).mockReturnValue({
      isLoading: false,
      value: mockDollarValue,
      lastUpdated: mockLastUpdated,
      refetch: mockRefetch,
      error: null,
    });

    render(<DollarView />);

    const dollarValue = screen.getByRole("dollar-value");
    expect(dollarValue).toBeInTheDocument();
    expect(dollarValue.textContent).toBe(
      toBrazilianCurrency(mockDollarValue).toString()
    );
    expect(
      screen.getByText(`Last updated at ${mockLastUpdated.toLocaleString()}`)
    ).toBeInTheDocument();
  });

  test("renders error state", () => {
    const mockErrorMessage = "Error loading the dollar value.";
    const mockError = new Error(mockErrorMessage);
    const mockRefetch = jest.fn();

    (useDollarValue as jest.Mock).mockReturnValue({
      isLoading: false,
      value: null,
      lastUpdated: null,
      refetch: mockRefetch,
      error: mockError,
    });

    render(<DollarView />);

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Try again"));
    expect(mockRefetch).toHaveBeenCalled();
  });
});
