"use client";

import { useMemo, useState } from "react";

type CpaValues = {
  totalAdSpend: string;
  acquisitions: string;
};

type MaximumCpaValues = {
  averageOrderValue: string;
  grossMarginPercent: string;
  desiredProfitMarginPercent: string;
};

type CpaInput = {
  id: keyof CpaValues;
  label: string;
  helper: string;
  prefix?: string;
};

type MaximumCpaInput = {
  id: keyof MaximumCpaValues;
  label: string;
  helper: string;
  prefix?: string;
  suffix?: string;
};

type Result = {
  label: string;
  value: string;
  helper: string;
  tone?: "strong" | "warning";
};

const cpaInputs: CpaInput[] = [
  {
    id: "totalAdSpend",
    label: "Total Ad Spend",
    helper: "The total amount spent on ads during the period.",
    prefix: "$",
  },
  {
    id: "acquisitions",
    label: "Number of Acquisitions / Customers",
    helper: "The number of customers, leads, or conversions acquired.",
  },
];

const maximumCpaInputs: MaximumCpaInput[] = [
  {
    id: "averageOrderValue",
    label: "Average Order Value",
    helper: "Revenue from one average order.",
    prefix: "$",
  },
  {
    id: "grossMarginPercent",
    label: "Gross Margin %",
    helper: "Gross profit as a percentage of order value.",
    suffix: "%",
  },
  {
    id: "desiredProfitMarginPercent",
    label: "Desired Profit Margin %",
    helper: "Profit you want to keep after acquisition cost.",
    suffix: "%",
  },
];

const defaultCpaValues: CpaValues = {
  totalAdSpend: "2500",
  acquisitions: "100",
};

const defaultMaximumCpaValues: MaximumCpaValues = {
  averageOrderValue: "100",
  grossMarginPercent: "60",
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

export function CpaCalculator() {
  const [cpaValues, setCpaValues] = useState<CpaValues>(defaultCpaValues);
  const [maximumCpaValues, setMaximumCpaValues] =
    useState<MaximumCpaValues>(defaultMaximumCpaValues);

  const cpaCalculations = useMemo(() => {
    const totalAdSpend = parsePositiveInput(cpaValues.totalAdSpend);
    const acquisitions = parsePositiveInput(cpaValues.acquisitions);
    const cpa = safeDivide(totalAdSpend, acquisitions);

    return {
      cpa,
      spendPer10Customers: cpa === null ? null : cpa * 10,
      spendPer100Customers: cpa === null ? null : cpa * 100,
    };
  }, [cpaValues]);

  const maximumCpaCalculations = useMemo(() => {
    const averageOrderValue = parsePositiveInput(
      maximumCpaValues.averageOrderValue,
    );
    const grossMarginPercent =
      parsePositiveInput(maximumCpaValues.grossMarginPercent) / 100;
    const desiredProfitMarginPercent =
      parsePositiveInput(maximumCpaValues.desiredProfitMarginPercent) / 100;
    const grossProfitPerOrder = averageOrderValue * grossMarginPercent;
    const desiredProfitPerOrder =
      averageOrderValue * desiredProfitMarginPercent;
    const maximumCpa = grossProfitPerOrder - desiredProfitPerOrder;

    return {
      grossProfitPerOrder,
      desiredProfitPerOrder,
      maximumCpa: maximumCpa >= 0 ? maximumCpa : null,
    };
  }, [maximumCpaValues]);

  const cpaResults: Result[] = [
    {
      label: "CPA",
      value: formatCurrency(cpaCalculations.cpa),
      helper: "Total ad spend divided by acquisitions.",
      tone: "strong",
    },
    {
      label: "Spend Per 10 Customers",
      value: formatCurrency(cpaCalculations.spendPer10Customers),
      helper: "Estimated spend to acquire 10 customers at this CPA.",
    },
    {
      label: "Spend Per 100 Customers",
      value: formatCurrency(cpaCalculations.spendPer100Customers),
      helper: "Estimated spend to acquire 100 customers at this CPA.",
    },
  ];

  const maximumCpaResults: Result[] = [
    {
      label: "Gross Profit Per Order",
      value: formatCurrency(maximumCpaCalculations.grossProfitPerOrder),
      helper: "Average order value multiplied by gross margin.",
    },
    {
      label: "Desired Profit Per Order",
      value: formatCurrency(maximumCpaCalculations.desiredProfitPerOrder),
      helper: "Average order value multiplied by desired profit margin.",
    },
    {
      label: "Maximum CPA",
      value: formatCurrency(maximumCpaCalculations.maximumCpa),
      helper: "The most you can spend per acquisition and still hit your profit goal.",
      tone: maximumCpaCalculations.maximumCpa === null ? "warning" : "strong",
    },
  ];

  function updateCpaValue(id: keyof CpaValues, value: string) {
    setCpaValues((current) => ({ ...current, [id]: value }));
  }

  function updateMaximumCpaValue(id: keyof MaximumCpaValues, value: string) {
    setMaximumCpaValues((current) => ({ ...current, [id]: value }));
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
              CPA Calculator
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter ad spend and acquisitions to calculate cost per acquisition
              and estimate spend at common customer volumes.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {cpaInputs.map((input) => (
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
                    value={cpaValues[input.id]}
                    onChange={(event) =>
                      updateCpaValue(input.id, event.target.value)
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
            Results update instantly and show Not available when acquisitions
            are zero.
          </p>

          <div className="mt-6 grid gap-3">
            {cpaResults.map((result) => (
              <ResultCard key={result.label} result={result} />
            ))}
          </div>
        </aside>
      </section>

      <section
        aria-labelledby="maximum-cpa-heading"
        className="grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]"
      >
        <div>
          <h2
            id="maximum-cpa-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Maximum CPA Calculator
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Estimate how much you can afford to spend per customer after
            protecting your desired profit margin.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {maximumCpaInputs.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={`max-${input.id}`}
                  className="block text-sm font-semibold text-slate-800"
                >
                  {input.label}
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex min-w-10 items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-white px-3 text-sm text-slate-500">
                    {input.prefix ?? ""}
                  </span>
                  <input
                    id={`max-${input.id}`}
                    name={`max-${input.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={maximumCpaValues[input.id]}
                    onChange={(event) =>
                      updateMaximumCpaValue(input.id, event.target.value)
                    }
                    aria-describedby={`max-${input.id}-helper`}
                    className="block min-w-0 flex-1 border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                  />
                  <span className="inline-flex min-w-10 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-white px-3 text-sm text-slate-500">
                    {input.suffix ?? ""}
                  </span>
                </div>
                <p
                  id={`max-${input.id}-helper`}
                  className="mt-1 text-xs text-slate-500"
                >
                  {input.helper}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Maximum CPA Results
          </h2>
          <div className="mt-6 grid gap-3">
            {maximumCpaResults.map((result) => (
              <div
                key={result.label}
                className="rounded-md border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-sm text-slate-600">{result.label}</p>
                <p
                  className={
                    result.tone === "warning"
                      ? "mt-1 text-2xl font-bold text-amber-700"
                      : "mt-1 text-2xl font-bold text-slate-950"
                  }
                >
                  {result.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {result.helper}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

function ResultCard({ result }: { result: Result }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.06] p-4">
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
      <p className="mt-2 text-xs leading-5 text-slate-400">{result.helper}</p>
    </div>
  );
}
