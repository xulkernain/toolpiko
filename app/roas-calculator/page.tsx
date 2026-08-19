import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { RoasCalculator } from "./roas-calculator";

export const metadata: Metadata = {
  title: "ROAS Calculator - Return on Ad Spend Calculator | ToolPiko",
  description:
    "Calculate ROAS, profit after ad spend, profit margin, and the revenue needed to hit your target ROAS with ToolPiko's free ROAS Calculator.",
  alternates: {
    canonical: "/roas-calculator",
  },
};

const faqs = [
  {
    question: "Is ROAS the same as profit?",
    answer:
      "No. ROAS compares revenue to ad spend, while profit also accounts for product costs, fees, fulfillment, and other expenses.",
  },
  {
    question: "Can ROAS be below 1?",
    answer:
      "Yes. A ROAS below 1 means revenue is lower than ad spend before other costs are considered.",
  },
  {
    question: "Should I include costs in ROAS?",
    answer:
      "The basic ROAS formula only uses revenue and ad spend, but including COGS and other costs helps you understand profit after advertising.",
  },
];

export default function RoasPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Free marketing calculator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            ROAS Calculator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Calculate return on ad spend, profit after ad spend, profit margin,
            and the revenue needed to hit your target ROAS.
          </p>
        </div>

        <div className="mt-10">
          <RoasCalculator />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Guide
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Understanding ROAS
            </h2>
          </div>

          <div className="space-y-10">
            <ContentSection title="What is ROAS?">
              <p>
                ROAS stands for return on ad spend. It shows how much revenue a
                campaign generates for each dollar spent on advertising.
              </p>
            </ContentSection>

            <ContentSection title="ROAS Formula">
              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>ROAS = Revenue / Ad Spend</p>
                <p>Profit After Ad Spend = Revenue - Ad Spend</p>
                <p>Profit After All Costs = Revenue - Ad Spend - COGS - Other Costs</p>
                <p>Profit Margin % = Profit After All Costs / Revenue x 100</p>
                <p>Required Revenue = Ad Spend x Target ROAS</p>
              </div>
            </ContentSection>

            <ContentSection title="How to Calculate ROAS">
              <p>
                Divide revenue by ad spend. If a campaign spends $1,000 and
                generates $4,000 in revenue, ROAS is 4.00x. That means the
                campaign generated $4 for every $1 spent.
              </p>
            </ContentSection>

            <ContentSection title="What is a Good ROAS?">
              <p>
                A good ROAS depends on your product margin, fulfillment costs,
                and growth goals. Use the{" "}
                <Link
                  href="/profit-margin-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Profit Margin Calculator
                </Link>{" "}
                to understand how much room you have for ad spend.
              </p>
            </ContentSection>

            <ContentSection title="ROAS vs ROI">
              <p>
                ROAS compares revenue to ad spend. ROI compares profit to total
                investment. ROAS is useful for campaign efficiency, while ROI is
                better for understanding overall profitability.
              </p>
            </ContentSection>

            <ContentSection title="ROAS vs CPA">
              <p>
                ROAS measures revenue generated per dollar spent. CPA measures
                the cost to acquire one customer or conversion. Use the{" "}
                <Link
                  href="/cpa-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  CPA Calculator
                </Link>{" "}
                when acquisition cost matters more than revenue ratio.
              </p>
            </ContentSection>

            <ContentSection title="Break-Even ROAS Explained">
              <p>
                Break-even ROAS is the minimum ROAS needed to cover ad spend and
                costs without losing money. For deeper margin-based planning,
                compare this calculator with the{" "}
                <Link
                  href="/break-even-roas-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Break-Even ROAS Calculator
                </Link>{" "}
                and{" "}
                <Link
                  href="/target-roas-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Target ROAS Calculator
                </Link>
                .
              </p>
            </ContentSection>

            <ContentSection title="How to Improve ROAS">
              <p>
                Improve ROAS by increasing conversion rate, raising average
                order value, reducing wasted spend, improving creative quality,
                and protecting profit margins with better pricing or lower
                variable costs.
              </p>
            </ContentSection>

            <ContentSection title="Frequently Asked Questions">
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-lg border border-slate-200 bg-white p-5"
                  >
                    <summary className="cursor-pointer text-base font-semibold text-slate-950">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </ContentSection>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="mt-4 text-base leading-8 text-slate-600">{children}</div>
    </section>
  );
}
