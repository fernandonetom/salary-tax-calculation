import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { HomePage } from "@/components/Home/HomePage";
import { useDolarValue } from "@/customHooks/useDolarValue";

jest.mock("../../customHooks/useDolarValue");

describe("HomePage", () => {
  beforeEach(() => {
    (useDolarValue as jest.Mock).mockReturnValue(() => ({
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

  test("renders the DolarView component", () => {
    render(<HomePage />);
    const dolarView = screen.getByRole("dolar-view");
    expect(dolarView).toBeInTheDocument();
  });
});
