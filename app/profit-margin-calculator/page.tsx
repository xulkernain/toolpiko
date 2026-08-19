import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { ProfitMarginCalculator } from "./profit-margin-calculator";

export const metadata: Metadata = {
  title: "Profit Margin Calculator - Free Tool | ToolPiko",
  description:
    "Calculate profit margin, markup, profit per unit, and the selling price needed to reach your target margin.",
  alternates: {
    canonical: "/profit-margin-calculator",
  },
};

const faqs = [
  {
    question: "What is a good profit margin?",
    answer:
      "A good profit margin depends on the industry, product type, and growth strategy. The important part is comparing your margin against your costs, pricing, and advertising goals.",
  },
  {
    question: "Why is markup different from margin?",
    answer:
      "Markup compares profit to cost, while margin compares profit to revenue. Because they use different denominators, a 50% markup is not the same as a 50% margin.",
  },
  {
    question: "Should additional costs be included?",
    answer:
      "Yes. Add order-level costs such as packaging, payment fees, handling, or marketplace fees when they affect the real profit from a sale.",
  },
  {
    question: "Can I use this for services?",
    answer:
      "Yes. Use your service delivery cost as the cost price and include any project-specific costs as additional costs.",
  },
];

export default function ProfitMarginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Free business calculator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Profit Margin Calculator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Calculate profit, profit margin, markup, profit per unit, and the
            selling price needed to reach a target margin.
          </p>
        </div>

        <div className="mt-10">
          <ProfitMarginCalculator />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Guide
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Understanding Profit Margin
            </h2>
          </div>

          <div className="space-y-10">
            <ContentSection title="What is Profit Margin?">
              <p>
                Profit margin is the percentage of revenue left as profit after
                costs are subtracted. It helps business owners understand how
                much room they have for discounts, operating expenses, and
                growth costs like advertising.
              </p>
            </ContentSection>

            <ContentSection title="Profit Margin Formula">
              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>Revenue = Selling Price x Quantity</p>
                <p>Total Cost = Cost Price x Quantity + Additional Costs</p>
                <p>Profit = Revenue - Total Cost</p>
                <p>Profit Margin % = Profit / Revenue x 100</p>
                <p>Markup % = (Selling Price - Cost Price) / Cost Price x 100</p>
                <p>Profit Per Unit = Profit / Quantity</p>
              </div>
            </ContentSection>

            <ContentSection title="Profit Margin vs Markup">
              <p>
                Profit margin measures profit as a share of revenue. Markup
                measures how much selling price is raised above cost. For
                example, a product that costs $40 and sells for $100 has a 60%
                margin but a 150% markup.
              </p>
            </ContentSection>

            <ContentSection title="Example">
              <p>
                If a product costs $40, sells for $100, and you sell 10 units
                with $25 in additional costs, revenue is $1,000 and total cost
                is $425. Profit is $575, profit margin is 57.50%, and profit per
                unit is $57.50.
              </p>
            </ContentSection>

            <ContentSection title="How to Calculate Selling Price from Margin">
              <p>
                To calculate selling price from margin, divide cost price by one
                minus the desired margin. A $40 cost with a 60% desired margin
                needs a $100 selling price because $40 / (1 - 0.60) = $100.
              </p>
            </ContentSection>

            <ContentSection title="Using Margin with Advertising Calculators">
              <p>
                Profit margin is also the foundation for ad targets. Once you
                know your margin, you can estimate how much room you have for
                acquisition cost with the{" "}
                <Link
                  href="/break-even-roas-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Break-Even ROAS Calculator
                </Link>{" "}
                or set a profitable campaign goal with the{" "}
                <Link
                  href="/target-roas-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Target ROAS Calculator
                </Link>
                .
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
