import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { AffiliateCommissionCalculator } from "./affiliate-commission-calculator";

export const metadata: Metadata = {
  title: "Affiliate Commission Calculator - Free Tool | ToolPiko",
  description:
    "Calculate affiliate commissions, platform fees, effective affiliate cost, and net revenue with ToolPiko's free Affiliate Commission Calculator.",
  alternates: {
    canonical: "/affiliate-commission-calculator",
  },
};

const faqs = [
  {
    question: "Should affiliate commission be calculated before or after discounts?",
    answer:
      "Most brands calculate commission on the tracked order revenue after discounts, but the right rule depends on your affiliate program terms.",
  },
  {
    question: "Do network fees count as affiliate costs?",
    answer:
      "Yes. Network and platform fees reduce net revenue, so include them when measuring the true cost of affiliate sales.",
  },
  {
    question: "Can creators use this calculator?",
    answer:
      "Yes. Creators can use it to estimate expected commission from sales volume and commission rates.",
  },
];

export default function AffiliateCommissionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Free affiliate calculator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Affiliate Commission Calculator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Calculate affiliate commissions, platform fees, effective affiliate
            cost, and net revenue from affiliate-driven orders.
          </p>
        </div>

        <div className="mt-10">
          <AffiliateCommissionCalculator />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Guide
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Understanding Affiliate Commission
            </h2>
          </div>

          <div className="space-y-10">
            <ContentSection title="What is an Affiliate Commission?">
              <p>
                An affiliate commission is the payout earned when an affiliate,
                creator, or partner drives a sale or conversion. Brands use
                commission rates to reward partners while keeping acquisition
                costs predictable.
              </p>
            </ContentSection>

            <ContentSection title="Affiliate Commission Formula">
              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>Commission Per Order = Order Revenue x Commission Rate %</p>
                <p>Total Revenue = Order Revenue x Number of Orders</p>
                <p>Total Affiliate Commission = Commission Per Order x Number of Orders</p>
                <p>Platform Fee = Total Revenue x Platform Fee %</p>
                <p>Fixed Fees = Fixed Fee Per Order x Number of Orders</p>
                <p>Total Fees = Total Affiliate Commission + Platform Fee + Fixed Fees</p>
                <p>Net Revenue = Total Revenue - Total Fees</p>
                <p>Effective Cost % = Total Fees / Total Revenue x 100</p>
              </div>
            </ContentSection>

            <ContentSection title="How to Calculate Affiliate Commission">
              <p>
                Multiply order revenue by the commission rate to get commission
                per order. Then multiply that commission by the number of orders
                to estimate the total affiliate payout.
              </p>
            </ContentSection>

            <ContentSection title="Flat Rate vs Percentage Commission">
              <p>
                A flat rate pays the same amount for every order or conversion.
                A percentage commission scales with order value, which can be
                useful for higher-priced products or creator partnerships.
              </p>
            </ContentSection>

            <ContentSection title="Affiliate Commission vs Revenue Share">
              <p>
                Affiliate commission often refers to a direct payout per sale.
                Revenue share is a broader structure where partners receive a
                percentage of revenue over time, such as recurring subscription
                revenue.
              </p>
            </ContentSection>

            <ContentSection title="How Network Fees Affect Profit">
              <p>
                Network fees reduce the revenue left after affiliate costs. Use
                the{" "}
                <Link
                  href="/profit-margin-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Profit Margin Calculator
                </Link>{" "}
                to understand product margin, the{" "}
                <Link
                  href="/cpa-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  CPA Calculator
                </Link>{" "}
                to compare affiliate costs with paid acquisition, and the{" "}
                <Link
                  href="/break-even-roas-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Break-Even ROAS Calculator
                </Link>{" "}
                to understand your minimum ad efficiency target.
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
