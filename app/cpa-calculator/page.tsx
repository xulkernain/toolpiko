import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { CpaCalculator } from "./cpa-calculator";

export const metadata: Metadata = {
  title: "CPA Calculator - Cost Per Acquisition Calculator | ToolPiko",
  description:
    "Calculate your cost per acquisition and estimate the maximum CPA your business can afford.",
  alternates: {
    canonical: "/cpa-calculator",
  },
};

const faqs = [
  {
    question: "Is a lower CPA always better?",
    answer:
      "A lower CPA is usually more efficient, but the best CPA depends on customer value, gross margin, and profit goals.",
  },
  {
    question: "Can CPA be used for leads instead of customers?",
    answer:
      "Yes. Use the number of leads as acquisitions if you want cost per lead, or customers if you want cost per customer.",
  },
  {
    question: "Why should I calculate maximum CPA?",
    answer:
      "Maximum CPA shows the highest acquisition cost your business can afford while preserving your desired profit per order.",
  },
];

export default function CpaPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Free marketing calculator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            CPA Calculator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Calculate cost per acquisition from ad spend and customers, then
            estimate the maximum CPA your business can afford.
          </p>
        </div>

        <div className="mt-10">
          <CpaCalculator />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Guide
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Understanding CPA
            </h2>
          </div>

          <div className="space-y-10">
            <ContentSection title="What is CPA?">
              <p>
                CPA stands for cost per acquisition. It measures how much you
                spend to acquire one customer, lead, signup, or conversion from
                your advertising campaigns.
              </p>
            </ContentSection>

            <ContentSection title="CPA Formula">
              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>CPA = Total Ad Spend / Number of Acquisitions</p>
                <p>Spend Per 10 Customers = CPA x 10</p>
                <p>Spend Per 100 Customers = CPA x 100</p>
                <p>Gross Profit Per Order = AOV x Gross Margin %</p>
                <p>Desired Profit Per Order = AOV x Desired Profit Margin %</p>
                <p>Maximum CPA = Gross Profit Per Order - Desired Profit Per Order</p>
              </div>
            </ContentSection>

            <ContentSection title="How to Calculate CPA">
              <p>
                Add up your total ad spend for a campaign or period, then divide
                it by the number of acquisitions from that spend. If you spend
                $2,500 and acquire 100 customers, CPA is $25.
              </p>
            </ContentSection>

            <ContentSection title="What is a Good CPA?">
              <p>
                A good CPA is one your business can afford while still making
                enough profit. Use the{" "}
                <Link
                  href="/profit-margin-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Profit Margin Calculator
                </Link>{" "}
                to understand your margin before deciding whether a CPA is good
                or too expensive.
              </p>
            </ContentSection>

            <ContentSection title="CPA vs CAC">
              <p>
                CPA usually measures the cost of a specific conversion, such as
                a customer or lead from ads. CAC, or customer acquisition cost,
                often includes broader sales and marketing costs across the full
                acquisition process.
              </p>
            </ContentSection>

            <ContentSection title="CPA vs ROAS">
              <p>
                CPA focuses on cost per acquired customer. ROAS compares revenue
                to ad spend. If you want to connect CPA to ad efficiency, compare
                this page with the{" "}
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

            <ContentSection title="Maximum CPA Explained">
              <p>
                Maximum CPA estimates how much you can spend to acquire one
                customer after reserving your desired profit. It starts with
                gross profit per order, subtracts desired profit per order, and
                leaves the remaining amount as your acquisition budget.
              </p>
            </ContentSection>

            <ContentSection title="FAQ">
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
