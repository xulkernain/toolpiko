"use client";

import { useMemo, useState } from "react";

type CalculatorValues = {
  averageOrderValue: string;
  productCost: string;
  shippingCost: string;
  fulfillmentCost: string;
  paymentProcessingFeePercent: string;
  otherVariableCost: string;
  desiredProfitMarginPercent: string;
};

type CalculatorInput = {
  id: keyof CalculatorValues;
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

const inputs: CalculatorInput[] = [
  {
    id: "averageOrderValue",
    label: "Average Order Value",
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
    helper: "Payment fee as a percentage of order value.",
    suffix: "%",
  },
  {
    id: "otherVariableCost",
    label: "Other Variable Cost",
    helper: "Any other per-order variable cost.",
  },
  {
    id: "desiredProfitMarginPercent",
    label: "Desired Profit Margin %",
    helper: "Profit you want to keep after ad spend.",
    suffix: "%",
  },
];

const defaultValues: CalculatorValues = {
  averageOrderValue: "100",
  productCost: "35",
  shippingCost: "8",
  fulfillmentCost: "4",
  paymentProcessingFeePercent: "3",
  otherVariableCost: "2",
  desiredProfitMarginPercent: "20",
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

function formatRatio(value: number | null) {
  if (value === null || !Number.isFinite(value)) {
    return "Not available";
  }

  return `${value.toFixed(2)}x`;
}

export function TargetRoasCalculator() {
  const [values, setValues] = useState<CalculatorValues>(defaultValues);

  const calculations = useMemo(() => {
    const averageOrderValue = parsePositiveInput(values.averageOrderValue);
    const productCost = parsePositiveInput(values.productCost);
    const shippingCost = parsePositiveInput(values.shippingCost);
    const fulfillmentCost = parsePositiveInput(values.fulfillmentCost);
    const paymentProcessingFeePercent = parsePositiveInput(
      values.paymentProcessingFeePercent,
    );
    const otherVariableCost = parsePositiveInput(values.otherVariableCost);
    const desiredProfitMarginPercent = parsePositiveInput(
      values.desiredProfitMarginPercent,
    );

    const paymentFee = averageOrderValue * (paymentProcessingFeePercent / 100);
    const totalVariableCost =
      productCost +
      shippingCost +
      fulfillmentCost +
      paymentFee +
      otherVariableCost;
    const contributionProfit = averageOrderValue - totalVariableCost;
    const contributionMargin = safeDivide(
      contributionProfit,
      averageOrderValue,
    );
    const desiredProfit =
      averageOrderValue * (desiredProfitMarginPercent / 100);
    const maximumCpa =
      contributionProfit - desiredProfit > 0
        ? contributionProfit - desiredProfit
        : null;
    const targetRoas = maximumCpa
      ? safeDivide(averageOrderValue, maximumCpa)
      : null;

    return {
      totalVariableCost,
      contributionProfit,
      contributionMargin,
      desiredProfit,
      maximumCpa,
      targetRoas,
    };
  }, [values]);

  const results: Result[] = [
    {
      label: "Total Variable Cost",
      value: formatCurrency(calculations.totalVariableCost),
      helper: "Product, shipping, fulfillment, payment fee, and other variable costs.",
    },
    {
      label: "Contribution Profit Before Ads",
      value: formatCurrency(calculations.contributionProfit),
      helper: "Revenue left before advertising spend.",
      tone: calculations.contributionProfit <= 0 ? "warning" : undefined,
    },
    {
      label: "Contribution Margin %",
      value: formatPercent(
        calculations.contributionMargin === null
          ? null
          : calculations.contributionMargin * 100,
      ),
      helper: "Contribution profit before ads as a percentage of AOV.",
    },
    {
      label: "Desired Profit per Order",
      value: formatCurrency(calculations.desiredProfit),
      helper: "Profit reserved before calculating your max ad spend.",
    },
    {
      label: "Maximum CPA / Ad Spend per Order",
      value: formatCurrency(calculations.maximumCpa),
      helper: "The most you can spend per order and still hit your desired margin.",
    },
    {
      label: "Target ROAS",
      value: formatRatio(calculations.targetRoas),
      helper: "The ROAS needed to hit the desired profit margin.",
      tone: "strong",
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
            Target ROAS Calculator
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Enter your order economics and desired profit margin to calculate
            the ROAS your campaigns need.
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
          Results update instantly and show Not available when the target ROAS
          cannot be calculated safely.
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
          Formula summary
        </h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <p>Payment Fee = AOV x Payment Processing Fee %.</p>
          <p>Variable Cost = product cost + shipping + fulfillment + payment fee + other variable cost.</p>
          <p>Maximum CPA = contribution profit - desired profit.</p>
          <p>Target ROAS = AOV / maximum CPA.</p>
        </div>
      </div>
    </section>
  );
}
