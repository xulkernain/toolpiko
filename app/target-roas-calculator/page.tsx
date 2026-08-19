import type { Metadata } from "next";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { TargetRoasCalculator } from "./target-roas-calculator";

export const metadata: Metadata = {
  title: "Target ROAS Calculator - Free Tool | ToolPiko",
  description:
    "Calculate the target ROAS you need to achieve your desired profit margin after product costs, shipping, fulfillment, and payment fees.",
  alternates: {
    canonical: "/target-roas-calculator",
  },
};

const faqs = [
  {
    question: "What does target ROAS mean?",
    answer:
      "Target ROAS is the return on ad spend your campaigns need to reach a desired profit margin after variable costs and advertising spend.",
  },
  {
    question: "Why is my target ROAS higher than my break-even ROAS?",
    answer:
      "Target ROAS includes profit you want to keep. Break-even ROAS only covers costs and ad spend, so it is usually lower.",
  },
  {
    question: "Should taxes be included as a variable cost?",
    answer:
      "Include taxes only when they are a real per-order cost to your business. If taxes are collected from customers and passed through, keep them out of AOV and costs.",
  },
  {
    question: "Can I use this for lead generation?",
    answer:
      "Yes, but replace average order value with expected revenue per acquired customer and include the variable costs tied to that customer.",
  },
];

export default function TargetRoasPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Free marketing calculator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Target ROAS Calculator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Calculate the ROAS your ad campaigns need to achieve your desired
            profit margin after product costs, shipping, fulfillment, and fees.
          </p>
        </div>

        <div className="mt-10">
          <TargetRoasCalculator />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Guide
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Understanding Target ROAS
            </h2>
          </div>

          <div className="space-y-10">
            <ContentSection title="What is Target ROAS?">
              <p>
                Target ROAS is the return on ad spend required to hit a profit
                goal. It helps marketers avoid setting ad targets based only on
                revenue by accounting for product costs, shipping, fulfillment,
                payment fees, and desired profit.
              </p>
            </ContentSection>

            <ContentSection title="How to Calculate Target ROAS">
              <p>
                Calculate the contribution profit before ads, subtract the
                profit you want to keep, and use the remaining amount as your
                maximum CPA. Then divide average order value by that maximum CPA.
              </p>
            </ContentSection>

            <ContentSection title="Target ROAS Formula">
              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>Payment Fee = AOV x Payment Processing Fee %</p>
                <p>Variable Cost = Product Cost + Shipping + Fulfillment + Payment Fee + Other Variable Cost</p>
                <p>Contribution Profit = AOV - Variable Cost</p>
                <p>Desired Profit = AOV x Desired Profit Margin %</p>
                <p>Maximum CPA = Contribution Profit - Desired Profit</p>
                <p>Target ROAS = AOV / Maximum CPA</p>
              </div>
            </ContentSection>

            <ContentSection title="Example">
              <p>
                If average order value is $100 and variable costs total $52,
                contribution profit before ads is $48. With a desired profit
                margin of 20%, desired profit is $20, leaving $28 as the maximum
                CPA. The target ROAS is $100 divided by $28, or 3.57x.
              </p>
            </ContentSection>

            <ContentSection title="Target ROAS vs Break-Even ROAS">
              <p>
                Break-even ROAS shows the minimum ROAS needed to avoid losing
                money. Target ROAS goes further by protecting a desired profit
                margin. If you want profitable growth, target ROAS is usually
                the better number to manage campaigns against.
              </p>
            </ContentSection>

            <ContentSection title="Why Profit Margin Changes Your Target ROAS">
              <p>
                Higher profit margin goals leave less room for ad spend per
                order. When maximum CPA goes down, target ROAS goes up. That is
                why the same product can need very different ROAS targets
                depending on whether the business wants aggressive growth or
                stronger profit.
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
