import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { HomePage } from "@/components/Home/HomePage";
import { useDollarValue } from "@/customHooks/useDollarValue";

jest.mock("../../customHooks/useDollarValue");

describe("HomePage", () => {
  beforeEach(() => {
    (useDollarValue as jest.Mock).mockReturnValue(() => ({
      isLoading: false,
      value: 5,
      lastUpdated: new Date(),
      refetch: () => {},
      error: null,
    }));
  });

  test("renders the Settings button", () => {
    render(<HomePage />);
    const settingsButton = screen.getByText("Settings");
    expect(settingsButton).toBeInTheDocument();
  });

  test("renders the CalculationResult component", () => {
    render(<HomePage />);
    const calculationResult = screen.getByRole("calculation-result");
    expect(calculationResult).toBeInTheDocument();
  });

  test("renders the DollarView component", () => {
    render(<HomePage />);
    const DollarView = screen.getByRole("dolar-view");
    expect(DollarView).toBeInTheDocument();
  });
});
