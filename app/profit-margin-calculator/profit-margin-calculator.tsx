"use client";

import { useMemo, useState } from "react";

type MarginValues = {
  costPrice: string;
  sellingPrice: string;
  quantity: string;
  additionalCosts: string;
};

type TargetPriceValues = {
  costPrice: string;
  desiredProfitMarginPercent: string;
};

type MarginInput = {
  id: keyof MarginValues;
  label: string;
  helper: string;
  prefix?: string;
};

type TargetPriceInput = {
  id: keyof TargetPriceValues;
  label: string;
  helper: string;
  suffix?: string;
};

type Result = {
  label: string;
  value: string;
  helper: string;
  tone?: "strong" | "warning";
};

const marginInputs: MarginInput[] = [
  {
    id: "costPrice",
    label: "Cost Price",
    helper: "Cost to buy or produce one unit.",
    prefix: "$",
  },
  {
    id: "sellingPrice",
    label: "Selling Price",
    helper: "Price charged for one unit.",
    prefix: "$",
  },
  {
    id: "quantity",
    label: "Quantity",
    helper: "Number of units sold.",
  },
  {
    id: "additionalCosts",
    label: "Optional Additional Costs",
    helper: "Extra order-level costs such as packaging, fees, or handling.",
    prefix: "$",
  },
];

const targetPriceInputs: TargetPriceInput[] = [
  {
    id: "costPrice",
    label: "Cost Price",
    helper: "Cost to buy or produce one unit.",
  },
  {
    id: "desiredProfitMarginPercent",
    label: "Desired Profit Margin %",
    helper: "The margin you want on the final selling price.",
    suffix: "%",
  },
];

const defaultMarginValues: MarginValues = {
  costPrice: "40",
  sellingPrice: "100",
  quantity: "10",
  additionalCosts: "25",
};

const defaultTargetPriceValues: TargetPriceValues = {
  costPrice: "40",
  desiredProfitMarginPercent: "60",
};

function parsePositiveInput(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function safeDivide(numerator: number, denominator: number) {
  if (
    !Number.isFinite(numerator) ||
    !Number.isFinite(denominator) ||
    denominator <= 0
  ) {
    return null;
  }

  return numerator / denominator;
}

function formatCurrency(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "Not available";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "Not available";
  }

  return `${value.toFixed(2)}%`;
}

export function ProfitMarginCalculator() {
  const [marginValues, setMarginValues] =
    useState<MarginValues>(defaultMarginValues);
  const [targetPriceValues, setTargetPriceValues] = useState<TargetPriceValues>(
    defaultTargetPriceValues,
  );

  const marginCalculations = useMemo(() => {
    const costPrice = parsePositiveInput(marginValues.costPrice);
    const sellingPrice = parsePositiveInput(marginValues.sellingPrice);
    const quantity = parsePositiveInput(marginValues.quantity);
    const additionalCosts = parsePositiveInput(marginValues.additionalCosts);

    const revenue = sellingPrice * quantity;
    const totalCost = costPrice * quantity + additionalCosts;
    const profit = revenue - totalCost;
    const profitMargin = safeDivide(profit, revenue);
    const markup = safeDivide(sellingPrice - costPrice, costPrice);
    const profitPerUnit = quantity > 0 ? profit / quantity : null;

    return {
      revenue,
      totalCost,
      profit,
      profitMargin,
      markup,
      profitPerUnit,
    };
  }, [marginValues]);

  const targetPriceCalculation = useMemo(() => {
    const costPrice = parsePositiveInput(targetPriceValues.costPrice);
    const desiredMargin =
      parsePositiveInput(targetPriceValues.desiredProfitMarginPercent) / 100;
    const denominator = 1 - desiredMargin;

    return denominator > 0 ? safeDivide(costPrice, denominator) : null;
  }, [targetPriceValues]);

  const marginResults: Result[] = [
    {
      label: "Revenue",
      value: formatCurrency(marginCalculations.revenue),
      helper: "Selling price multiplied by quantity.",
    },
    {
      label: "Total Cost",
      value: formatCurrency(marginCalculations.totalCost),
      helper: "Unit cost multiplied by quantity, plus additional costs.",
    },
    {
      label: "Profit",
      value: formatCurrency(marginCalculations.profit),
      helper: "Revenue minus total cost.",
      tone: marginCalculations.profit < 0 ? "warning" : "strong",
    },
    {
      label: "Profit Margin %",
      value: formatPercent(
        marginCalculations.profitMargin === null
          ? null
          : marginCalculations.profitMargin * 100,
      ),
      helper: "Profit as a percentage of revenue.",
    },
    {
      label: "Markup %",
      value: formatPercent(
        marginCalculations.markup === null
          ? null
          : marginCalculations.markup * 100,
      ),
      helper: "Price increase over cost price.",
    },
    {
      label: "Profit Per Unit",
      value: formatCurrency(marginCalculations.profitPerUnit),
      helper: "Average profit earned on each unit sold.",
    },
  ];

  function updateMarginValue(id: keyof MarginValues, value: string) {
    setMarginValues((current) => ({ ...current, [id]: value }));
  }

  function updateTargetPriceValue(id: keyof TargetPriceValues, value: string) {
    setTargetPriceValues((current) => ({ ...current, [id]: value }));
  }

  return (
    <div className="space-y-6">
      <section
        aria-labelledby="calculator-heading"
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]"
      >
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2
              id="calculator-heading"
              className="text-2xl font-bold tracking-tight text-slate-950"
            >
              Profit Margin Calculator
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your cost, selling price, quantity, and optional costs to
              calculate profit, margin, markup, and profit per unit.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {marginInputs.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={input.id}
                  className="block text-sm font-semibold text-slate-800"
                >
                  {input.label}
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex min-w-10 items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                    {input.prefix ?? ""}
                  </span>
                  <input
                    id={input.id}
                    name={input.id}
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={marginValues[input.id]}
                    onChange={(event) =>
                      updateMarginValue(input.id, event.target.value)
                    }
                    aria-describedby={`${input.id}-helper`}
                    className="block min-w-0 flex-1 rounded-r-md border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                  />
                </div>
                <p
                  id={`${input.id}-helper`}
                  className="mt-1 text-xs text-slate-500"
                >
                  {input.helper}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:p-6">
          <h2 className="text-xl font-bold tracking-tight">Results</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Results update instantly and show Not available when a percentage
            cannot be calculated safely.
          </p>

          <div className="mt-6 grid gap-3">
            {marginResults.map((result) => (
              <div
                key={result.label}
                className="rounded-md border border-white/10 bg-white/[0.06] p-4"
              >
                <p className="text-sm text-slate-300">{result.label}</p>
                <p
                  className={
                    result.tone === "warning"
                      ? "mt-1 text-2xl font-bold text-amber-200"
                      : "mt-1 text-2xl font-bold text-white"
                  }
                >
                  {result.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {result.helper}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section
        aria-labelledby="target-selling-price-heading"
        className="grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)]"
      >
        <div>
          <h2
            id="target-selling-price-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Target Selling Price
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Work backward from a desired profit margin to find the required
            selling price.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {targetPriceInputs.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={`target-${input.id}`}
                  className="block text-sm font-semibold text-slate-800"
                >
                  {input.label}
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex min-w-10 items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-white px-3 text-sm text-slate-500">
                    {input.suffix ? "" : "$"}
                  </span>
                  <input
                    id={`target-${input.id}`}
                    name={`target-${input.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={targetPriceValues[input.id]}
                    onChange={(event) =>
                      updateTargetPriceValue(input.id, event.target.value)
                    }
                    aria-describedby={`target-${input.id}-helper`}
                    className="block min-w-0 flex-1 border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                  />
                  <span className="inline-flex min-w-10 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-white px-3 text-sm text-slate-500">
                    {input.suffix ?? ""}
                  </span>
                </div>
                <p
                  id={`target-${input.id}-helper`}
                  className="mt-1 text-xs text-slate-500"
                >
                  {input.helper}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Required Selling Price
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {formatCurrency(targetPriceCalculation)}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Required selling price = cost price / (1 - desired margin).
          </p>
        </div>
      </section>
    </div>
  );
}
