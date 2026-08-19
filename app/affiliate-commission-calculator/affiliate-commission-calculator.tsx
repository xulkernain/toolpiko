"use client";

import { useMemo, useState } from "react";

type CommissionValues = {
  orderRevenue: string;
  commissionRatePercent: string;
  numberOfOrders: string;
  platformFeePercent: string;
  fixedFeePerOrder: string;
};

type ReverseValues = {
  desiredCommissionAmount: string;
  commissionRatePercent: string;
};

type CommissionInput = {
  id: keyof CommissionValues;
  label: string;
  helper: string;
  prefix?: string;
  suffix?: string;
};

type ReverseInput = {
  id: keyof ReverseValues;
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

const commissionInputs: CommissionInput[] = [
  {
    id: "orderRevenue",
    label: "Order Revenue",
    helper: "Revenue from one average order.",
    prefix: "$",
  },
  {
    id: "commissionRatePercent",
    label: "Commission Rate %",
    helper: "Affiliate commission rate paid on order revenue.",
    suffix: "%",
  },
  {
    id: "numberOfOrders",
    label: "Number of Orders",
    helper: "Total orders attributed to affiliates.",
  },
  {
    id: "platformFeePercent",
    label: "Optional Network / Platform Fee %",
    helper: "Network fee as a percentage of total affiliate revenue.",
    suffix: "%",
  },
  {
    id: "fixedFeePerOrder",
    label: "Optional Fixed Fee Per Order",
    helper: "Any fixed platform, tracking, or processing fee per order.",
    prefix: "$",
  },
];

const reverseInputs: ReverseInput[] = [
  {
    id: "desiredCommissionAmount",
    label: "Desired Commission Amount",
    helper: "Commission amount you want an affiliate to earn.",
    prefix: "$",
  },
  {
    id: "commissionRatePercent",
    label: "Commission Rate %",
    helper: "Commission rate used to work backward to revenue.",
    suffix: "%",
  },
];

const defaultCommissionValues: CommissionValues = {
  orderRevenue: "100",
  commissionRatePercent: "15",
  numberOfOrders: "50",
  platformFeePercent: "2",
  fixedFeePerOrder: "0.5",
};

const defaultReverseValues: ReverseValues = {
  desiredCommissionAmount: "25",
  commissionRatePercent: "15",
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

export function AffiliateCommissionCalculator() {
  const [commissionValues, setCommissionValues] =
    useState<CommissionValues>(defaultCommissionValues);
  const [reverseValues, setReverseValues] =
    useState<ReverseValues>(defaultReverseValues);

  const commissionCalculations = useMemo(() => {
    const orderRevenue = parsePositiveInput(commissionValues.orderRevenue);
    const commissionRate =
      parsePositiveInput(commissionValues.commissionRatePercent) / 100;
    const numberOfOrders = parsePositiveInput(commissionValues.numberOfOrders);
    const platformFeeRate =
      parsePositiveInput(commissionValues.platformFeePercent) / 100;
    const fixedFeePerOrder = parsePositiveInput(
      commissionValues.fixedFeePerOrder,
    );

    const commissionPerOrder = orderRevenue * commissionRate;
    const totalRevenue = orderRevenue * numberOfOrders;
    const totalAffiliateCommission = commissionPerOrder * numberOfOrders;
    const platformFees = totalRevenue * platformFeeRate;
    const fixedFees = fixedFeePerOrder * numberOfOrders;
    const totalFees = totalAffiliateCommission + platformFees + fixedFees;
    const netRevenue = totalRevenue - totalFees;
    const effectiveCost = safeDivide(totalFees, totalRevenue);

    return {
      commissionPerOrder,
      totalRevenue,
      totalAffiliateCommission,
      platformFees,
      fixedFees,
      totalFees,
      netRevenue,
      effectiveCost,
    };
  }, [commissionValues]);

  const reverseCalculation = useMemo(() => {
    const desiredCommissionAmount = parsePositiveInput(
      reverseValues.desiredCommissionAmount,
    );
    const commissionRate =
      parsePositiveInput(reverseValues.commissionRatePercent) / 100;

    return safeDivide(desiredCommissionAmount, commissionRate);
  }, [reverseValues]);

  const results: Result[] = [
    {
      label: "Commission Per Order",
      value: formatCurrency(commissionCalculations.commissionPerOrder),
      helper: "Order revenue multiplied by commission rate.",
    },
    {
      label: "Total Affiliate Commission",
      value: formatCurrency(commissionCalculations.totalAffiliateCommission),
      helper: "Commission per order multiplied by number of orders.",
    },
    {
      label: "Platform / Network Fees",
      value: formatCurrency(commissionCalculations.platformFees),
      helper: "Total revenue multiplied by platform fee percentage.",
    },
    {
      label: "Total Fees",
      value: formatCurrency(commissionCalculations.totalFees),
      helper: "Affiliate commission plus platform and fixed fees.",
    },
    {
      label: "Net Revenue After Affiliate Costs",
      value: formatCurrency(commissionCalculations.netRevenue),
      helper: "Total revenue minus total affiliate-related costs.",
      tone: commissionCalculations.netRevenue < 0 ? "warning" : "strong",
    },
    {
      label: "Effective Cost %",
      value: formatPercent(
        commissionCalculations.effectiveCost === null
          ? null
          : commissionCalculations.effectiveCost * 100,
      ),
      helper: "Total fees as a percentage of total revenue.",
    },
  ];

  function updateCommissionValue(id: keyof CommissionValues, value: string) {
    setCommissionValues((current) => ({ ...current, [id]: value }));
  }

  function updateReverseValue(id: keyof ReverseValues, value: string) {
    setReverseValues((current) => ({ ...current, [id]: value }));
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
              Affiliate Commission Calculator
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Estimate affiliate commissions, network fees, effective cost, and
              net revenue from affiliate-driven orders.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {commissionInputs.map((input) => (
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
                    value={commissionValues[input.id]}
                    onChange={(event) =>
                      updateCommissionValue(input.id, event.target.value)
                    }
                    aria-describedby={`${input.id}-helper`}
                    className="block min-w-0 flex-1 border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                  />
                  <span className="inline-flex min-w-10 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                    {input.suffix ?? ""}
                  </span>
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
            Results update instantly and show Not available when total revenue
            is zero.
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
        aria-labelledby="reverse-commission-heading"
        className="grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)]"
      >
        <div>
          <h2
            id="reverse-commission-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Reverse Commission Calculator
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Work backward from a desired commission amount to find the required
            revenue at a given commission rate.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {reverseInputs.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={`reverse-${input.id}`}
                  className="block text-sm font-semibold text-slate-800"
                >
                  {input.label}
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex min-w-10 items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-white px-3 text-sm text-slate-500">
                    {input.prefix ?? ""}
                  </span>
                  <input
                    id={`reverse-${input.id}`}
                    name={`reverse-${input.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    inputMode="decimal"
                    value={reverseValues[input.id]}
                    onChange={(event) =>
                      updateReverseValue(input.id, event.target.value)
                    }
                    aria-describedby={`reverse-${input.id}-helper`}
                    className="block min-w-0 flex-1 border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950 focus:ring-1 focus:ring-slate-950"
                  />
                  <span className="inline-flex min-w-10 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-white px-3 text-sm text-slate-500">
                    {input.suffix ?? ""}
                  </span>
                </div>
                <p
                  id={`reverse-${input.id}-helper`}
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
            {formatCurrency(reverseCalculation)}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Required revenue = desired commission amount / commission rate.
          </p>
        </div>
      </section>
    </div>
  );
}
