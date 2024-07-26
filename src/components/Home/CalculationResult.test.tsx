import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { CalculationResult } from "@/components/Home/CalculationResult";
import { useModelStore } from "@/store/store";
import { useDollarValue } from "@/customHooks/useDollarValue";
import { SalaryCalculator } from "@/domain/services/salaryCalculator";
import { toBrazilianCurrency } from "@/lib/utils";

jest.mock("../../store/store", () => ({
  useModelStore: jest.fn(),
}));

jest.mock("../../customHooks/useDollarValue", () => ({
  useDollarValue: jest.fn(),
}));

jest.mock("../../domain/services/salaryCalculator", () => ({
  SalaryCalculator: {
    calculate: jest.fn(),
  },
}));

describe("CalculationResult", () => {
  beforeEach(() => {
    (useModelStore as unknown as jest.Mock).mockReturnValue({
      salaries: [],
      taxes: [],
    });

    (useDollarValue as jest.Mock).mockReturnValue({
      isLoading: false,
      value: 5.3,
      error: null,
    });

    (SalaryCalculator.calculate as jest.Mock).mockReturnValue(1000);
  });

  test("renders loading state", () => {
    (useDollarValue as jest.Mock).mockReturnValue({
      isLoading: true,
      value: null,
      error: null,
    });

    render(<CalculationResult />);

    expect(screen.getByRole("loading-result")).toBeInTheDocument();
  });

  test("renders no salaries or taxes registered alert", () => {
    (useModelStore as unknown as jest.Mock).mockReturnValue({
      salaries: [],
      taxes: [],
    });

    render(<CalculationResult />);

    expect(
      screen.getByText("No salaries or taxes registered")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your should insert at least one salary and one tax to see the/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("click here")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/settings");
  });

  test("renders calculation result", () => {
    (useModelStore as unknown as jest.Mock).mockReturnValue({
      salaries: [1000, 2000],
      taxes: [10, 20],
    });

    render(<CalculationResult />);

    const resultElement = screen.getByRole("result");
    expect(resultElement).toBeInTheDocument();
    expect(resultElement.textContent).toBe(toBrazilianCurrency(1000));
    expect(screen.getByText("You will receive:")).toBeInTheDocument();
    expect(screen.getByText("After all taxes")).toBeInTheDocument();
  });
});
