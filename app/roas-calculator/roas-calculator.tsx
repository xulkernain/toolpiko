"use client";

import { useMemo, useState } from "react";

type RoasValues = {
  adSpend: string;
  revenue: string;
  cogs: string;
  otherCosts: string;
};

type TargetRevenueValues = {
  adSpend: string;
  targetRoas: string;
};

type RoasInput = {
  id: keyof RoasValues;
  label: string;
  helper: string;
  prefix?: string;
};

type TargetRevenueInput = {
  id: keyof TargetRevenueValues;
  label: string;
  helper: string;
  prefix?: string;
};

type Result = {
  label: string;
  value: string;
  helper: string;
  tone?: "strong" | "warning";
};

const roasInputs: RoasInput[] = [
  {
    id: "adSpend",
    label: "Ad Spend",
    helper: "Total amount spent on advertising.",
    prefix: "$",
  },
  {
    id: "revenue",
    label: "Revenue",
    helper: "Revenue generated from the ad spend.",
    prefix: "$",
  },
  {
    id: "cogs",
    label: "Optional COGS",
    helper: "Cost of goods sold tied to the revenue.",
    prefix: "$",
  },
  {
    id: "otherCosts",
    label: "Optional Other Costs",
    helper: "Additional costs such as fees, shipping, or fulfillment.",
    prefix: "$",
  },
];

const targetRevenueInputs: TargetRevenueInput[] = [
  {
    id: "adSpend",
    label: "Ad Spend",
    helper: "Planned or actual ad spend.",
    prefix: "$",
  },
  {
    id: "targetRoas",
    label: "Target ROAS",
    helper: "Desired return on ad spend as a ratio.",
  },
];

const defaultRoasValues: RoasValues = {
  adSpend: "1000",
  revenue: "4000",
  cogs: "1200",
  otherCosts: "300",
};

const defaultTargetRevenueValues: TargetRevenueValues = {
  adSpend: "1000",
  targetRoas: "4",
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

function getBreakEvenStatus(profitAfterAllCosts: number) {
  if (profitAfterAllCosts > 0) {
    return "Profitable";
  }

  if (profitAfterAllCosts < 0) {
    return "Loss";
  }

  return "Break-even";
}

export function RoasCalculator() {
  const [roasValues, setRoasValues] = useState<RoasValues>(defaultRoasValues);
  const [targetRevenueValues, setTargetRevenueValues] =
    useState<TargetRevenueValues>(defaultTargetRevenueValues);

  const roasCalculations = useMemo(() => {
    const adSpend = parsePositiveInput(roasValues.adSpend);
    const revenue = parsePositiveInput(roasValues.revenue);
    const cogs = parsePositiveInput(roasValues.cogs);
    const otherCosts = parsePositiveInput(roasValues.otherCosts);
    const roas = safeDivide(revenue, adSpend);
    const profitAfterAdSpend = revenue - adSpend;
    const profitAfterAllCosts = revenue - adSpend - cogs - otherCosts;
    const profitMargin = safeDivide(profitAfterAllCosts, revenue);

    return {
      roas,
      revenuePerDollarSpent: roas,
      profitAfterAdSpend,
      profitAfterAllCosts,
      profitMargin,
      breakEvenStatus: getBreakEvenStatus(profitAfterAllCosts),
    };
  }, [roasValues]);

  const requiredRevenue = useMemo(() => {
    const adSpend = parsePositiveInput(targetRevenueValues.adSpend);
    const targetRoas = parsePositiveInput(targetRevenueValues.targetRoas);

    return adSpend * targetRoas;
  }, [targetRevenueValues]);

  const results: Result[] = [
    {
      label: "ROAS",
      value: formatRatio(roasCalculations.roas),
      helper: "Revenue divided by ad spend.",
      tone: "strong",
    },
    {
      label: "Revenue Per $1 Spent",
      value: formatRatio(roasCalculations.revenuePerDollarSpent),
      helper: "Revenue generated for each dollar of ad spend.",
    },
    {
      label: "Profit After Ad Spend",
      value: formatCurrency(roasCalculations.profitAfterAdSpend),
      helper: "Revenue minus ad spend.",
    },
    {
      label: "Profit After All Costs",
      value: formatCurrency(roasCalculations.profitAfterAllCosts),
      helper: "Revenue minus ad spend, COGS, and other costs.",
      tone: roasCalculations.profitAfterAllCosts < 0 ? "warning" : "strong",
    },
    {
      label: "Profit Margin %",
      value: formatPercent(
        roasCalculations.profitMargin === null
          ? null
          : roasCalculations.profitMargin * 100,
      ),
      helper: "Profit after all costs as a percentage of revenue.",
    },
    {
      label: "Break-Even Status",
      value: roasCalculations.breakEvenStatus,
      helper: "Profitable, break-even, or loss based on profit after all costs.",
      tone: roasCalculations.breakEvenStatus === "Loss" ? "warning" : "strong",
    },
  ];

  function updateRoasValue(id: keyof RoasValues, value: string) {
    setRoasValues((current) => ({ ...current, [id]: value }));
  }

  function updateTargetRevenueValue(id: keyof TargetRevenueValues, value: string) {
    setTargetRevenueValues((current) => ({ ...current, [id]: value }));
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
              ROAS Calculator
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Calculate return on ad spend, profit after ads, and profit after
              product or operating costs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {roasInputs.map((input) => (
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
                    value={roasValues[input.id]}
                    onChange={(event) =>
                      updateRoasValue(input.id, event.target.value)
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
            Results update instantly and show Not available when ad spend or
            revenue is zero.
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
      </section>

      <section
        aria-labelledby="target-revenue-heading"
        className="grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)]"
      >
        <div>
          <h2
            id="target-revenue-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Target Revenue Calculator
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Work backward from ad spend and target ROAS to find the revenue you
            need.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {targetRevenueInputs.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={`target-${input.id}`}
                  className="block text-sm font-semibold text-slate-800"
                >
                  {input.label}
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex min-w-10 items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-white px-3 text-sm text-slate-500">
                    {input.prefix ?? ""}
                  </span>
                  <input
                    id={`target-${input.id}`}
                    name={`target-${input.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={targetRevenueValues[input.id]}
                    onChange={(event) =>
                      updateTargetRevenueValue(input.id, event.target.value)
                    }
                    aria-describedby={`target-${input.id}-helper`}
                    className="block min-w-0 flex-1 rounded-r-md border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                  />
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
            Required Revenue
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {formatCurrency(requiredRevenue)}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Required revenue = ad spend x target ROAS.
          </p>
        </div>
      </section>
    </div>
  );
}
