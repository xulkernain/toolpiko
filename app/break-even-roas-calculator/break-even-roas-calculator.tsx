"use client";

import { useMemo, useState } from "react";

type CalculatorInput = {
  id: keyof CalculatorValues;
  label: string;
  suffix?: string;
  helper: string;
};

type CalculatorValues = {
  averageOrderValue: string;
  productCost: string;
  shippingCost: string;
  fulfillmentCost: string;
  paymentProcessingFeePercent: string;
  otherVariableCost: string;
  targetProfitMarginPercent: string;
};

type Result = {
  label: string;
  value: string;
  helper: string;
  tone?: "strong" | "warning";
};

const inputs: CalculatorInput[] = [
  {
    id: "averageOrderValue",
    label: "Average Order Value / Selling Price",
    helper: "Revenue from one average order.",
  },
  {
    id: "productCost",
    label: "Product Cost / COGS",
    helper: "The product cost for one order.",
  },
  {
    id: "shippingCost",
    label: "Shipping Cost",
    helper: "Outbound shipping cost per order.",
  },
  {
    id: "fulfillmentCost",
    label: "Fulfillment Cost",
    helper: "Pick, pack, warehouse, or handling cost.",
  },
  {
    id: "paymentProcessingFeePercent",
    label: "Payment Processing Fee %",
    suffix: "%",
    helper: "Payment fee as a percentage of order value.",
  },
  {
    id: "otherVariableCost",
    label: "Other Variable Cost",
    helper: "Any other per-order variable cost.",
  },
  {
    id: "targetProfitMarginPercent",
    label: "Target Profit Margin %",
    suffix: "%",
    helper: "Desired profit after ad spend as a percentage of revenue.",
  },
];

const defaultValues: CalculatorValues = {
  averageOrderValue: "100",
  productCost: "35",
  shippingCost: "8",
  fulfillmentCost: "4",
  paymentProcessingFeePercent: "3",
  otherVariableCost: "2",
  targetProfitMarginPercent: "15",
};

function parseMoney(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
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

function formatRatio(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "Not available";
  }

  return `${value.toFixed(2)}x`;
}

function safeDivide(numerator: number, denominator: number) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) {
    return null;
  }

  return numerator / denominator;
}

export function BreakEvenRoasCalculator() {
  const [values, setValues] = useState<CalculatorValues>(defaultValues);

  const calculations = useMemo(() => {
    const averageOrderValue = parseMoney(values.averageOrderValue);
    const productCost = parseMoney(values.productCost);
    const shippingCost = parseMoney(values.shippingCost);
    const fulfillmentCost = parseMoney(values.fulfillmentCost);
    const paymentProcessingFeePercent = parseMoney(
      values.paymentProcessingFeePercent,
    );
    const otherVariableCost = parseMoney(values.otherVariableCost);
    const targetProfitMarginPercent = parseMoney(
      values.targetProfitMarginPercent,
    );

    const paymentProcessingFee =
      averageOrderValue * (paymentProcessingFeePercent / 100);
    const totalVariableCost =
      productCost +
      shippingCost +
      fulfillmentCost +
      paymentProcessingFee +
      otherVariableCost;
    const contributionProfit = averageOrderValue - totalVariableCost;
    const contributionMargin = safeDivide(
      contributionProfit,
      averageOrderValue,
    );
    const targetProfit = averageOrderValue * (targetProfitMarginPercent / 100);
    const breakEvenCpa = contributionProfit > 0 ? contributionProfit : null;
    const breakEvenRoas = safeDivide(averageOrderValue, contributionProfit);
    const targetCpa =
      contributionProfit - targetProfit > 0
        ? contributionProfit - targetProfit
        : null;
    const targetRoas = targetCpa ? safeDivide(averageOrderValue, targetCpa) : null;

    return {
      paymentProcessingFee,
      totalVariableCost,
      contributionProfit,
      contributionMargin,
      breakEvenCpa,
      breakEvenRoas,
      targetCpa,
      targetRoas,
      maximumAdSpendPerOrder: targetCpa,
    };
  }, [values]);

  const results: Result[] = [
    {
      label: "Contribution Profit per Order",
      value: formatCurrency(calculations.contributionProfit),
      helper: "Revenue left after product, shipping, fulfillment, fees, and other variable costs.",
      tone: calculations.contributionProfit <= 0 ? "warning" : "strong",
    },
    {
      label: "Contribution Margin %",
      value: formatPercent(
        calculations.contributionMargin === null
          ? null
          : calculations.contributionMargin * 100,
      ),
      helper: "Contribution profit as a percentage of order value.",
    },
    {
      label: "Break-Even CPA",
      value: formatCurrency(calculations.breakEvenCpa),
      helper: "The most you can spend to acquire an order before profit reaches zero.",
    },
    {
      label: "Break-Even ROAS",
      value: formatRatio(calculations.breakEvenRoas),
      helper: "The minimum ROAS needed to cover variable costs and ad spend.",
      tone: "strong",
    },
    {
      label: "Target CPA",
      value: formatCurrency(calculations.targetCpa),
      helper: "The max CPA after reserving your target profit margin.",
    },
    {
      label: "Target ROAS",
      value: formatRatio(calculations.targetRoas),
      helper: "The ROAS needed to hit your target profit margin.",
    },
    {
      label: "Maximum Ad Spend per Order",
      value: formatCurrency(calculations.maximumAdSpendPerOrder),
      helper: "The ad spend available per order while still hitting the target margin.",
    },
  ];

  function updateValue(id: keyof CalculatorValues, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  return (
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
            Break-Even ROAS Calculator
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Adjust the example values to see your break-even and target numbers
            update instantly.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {inputs.map((input) => (
            <div key={input.id}>
              <label
                htmlFor={input.id}
                className="block text-sm font-semibold text-slate-800"
              >
                {input.label}
              </label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                  {input.suffix ? null : "$"}
                </span>
                <input
                  id={input.id}
                  name={input.id}
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={values[input.id]}
                  onChange={(event) => updateValue(input.id, event.target.value)}
                  aria-describedby={`${input.id}-helper`}
                  className="block min-w-0 flex-1 border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                />
                <span className="inline-flex min-w-10 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                  {input.suffix ?? ""}
                </span>
              </div>
              <p id={`${input.id}-helper`} className="mt-1 text-xs text-slate-500">
                {input.helper}
              </p>
            </div>
          ))}
        </div>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:p-6">
        <h2 className="text-xl font-bold tracking-tight">Results</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Results use per-order contribution economics and safely show “Not
          available” when revenue or profit is zero.
        </p>

        <div className="mt-6 grid gap-3">
          {results.map((result) => (
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

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:col-span-2">
        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          How the calculator works
        </h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <p>
            Variable cost = product cost + shipping + fulfillment + payment
            processing fee + other variable cost.
          </p>
          <p>
            Contribution profit = average order value - total variable cost.
          </p>
          <p>
            Break-even ROAS = average order value / contribution profit.
          </p>
          <p>
            Target ROAS = average order value / (contribution profit - target
            profit).
          </p>
        </div>
      </div>
    </section>
  );
}
