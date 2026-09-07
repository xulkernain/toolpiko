import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { CpaCalculator } from "./cpa-calculator";

export const metadata: Metadata = {
  title: "CPA Calculator - Calculate Cost Per Acquisition | ToolPiko",
  description:
    "Use ToolPiko's free CPA calculator to calculate cost per acquisition, understand the CPA formula, and estimate the maximum CPA your business can afford.",
  alternates: {
    canonical: "/cpa-calculator",
  },
};

const faqs = [
  {
    question: "How do you calculate CPA?",
    answer:
      "To calculate CPA, divide your total advertising spend by the number of acquisitions. For example, $2,500 in ad spend divided by 100 customers equals a CPA of $25.",
  },
  {
    question: "What is the cost per acquisition formula?",
    answer:
      "The standard cost per acquisition formula is CPA = Total Ad Spend / Number of Acquisitions.",
  },
  {
    question: "Is a lower CPA always better?",
    answer:
      "A lower CPA is usually more efficient, but the best CPA depends on customer value, gross margin, average order value, and your profit goals.",
  },
  {
    question: "Can CPA be used for leads instead of customers?",
    answer:
      "Yes. You can use leads, signups, purchases, or other conversions as acquisitions depending on what you want to measure.",
  },
  {
    question: "What is a good CPA?",
    answer:
      "A good CPA is one that allows your business to acquire customers profitably. The right CPA depends on your margins, customer value, and growth goals.",
  },
  {
    question: "Why should I calculate maximum CPA?",
    answer:
      "Maximum CPA estimates the highest acquisition cost your business can afford while still preserving your desired profit per order.",
  },
];

export default function CpaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Free marketing calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            CPA Calculator
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Use this free CPA calculator to calculate cost per acquisition from
            your advertising spend and number of customers, leads, or
            conversions. You can also estimate the maximum CPA your business
            can afford while protecting your desired profit margin.
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
              CPA Guide
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              How to Calculate Cost Per Acquisition
            </h2>
          </div>

          <div className="space-y-10">
            <ContentSection title="What Is CPA?">
              <p>
                CPA stands for cost per acquisition. It measures how much you
                spend to generate one acquisition from your marketing or
                advertising campaigns.
              </p>

              <p className="mt-4">
                An acquisition can be a customer, purchase, lead, signup, or
                another conversion depending on the goal you are measuring.
              </p>
            </ContentSection>

            <ContentSection title="Cost Per Acquisition Formula">
              <p className="mb-4">
                The standard cost per acquisition formula is:
              </p>

              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>CPA = Total Ad Spend / Number of Acquisitions</p>
              </div>

              <p className="mt-4">
                For example, if you spend $2,500 on advertising and acquire 100
                customers, your CPA is $25.
              </p>
            </ContentSection>

            <ContentSection title="How to Calculate CPA">
              <p>
                To calculate CPA, add up your total advertising spend for the
                campaign or period you want to measure. Then divide that amount
                by the number of acquisitions generated from the same spend.
              </p>

              <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-950">
                  Example CPA calculation
                </p>

                <p className="mt-3">
                  Total ad spend: $2,500
                  <br />
                  Acquisitions: 100
                  <br />
                  CPA: $2,500 / 100 = $25
                </p>
              </div>

              <p className="mt-4">
                This means the campaign cost an average of $25 for each
                acquisition.
              </p>
            </ContentSection>

            <ContentSection title="How to Use the CPA Calculator">
              <p>
                Enter your total advertising spend and the number of
                acquisitions generated. The calculator will automatically
                calculate your cost per acquisition.
              </p>

              <p className="mt-4">
                You can use customers, purchases, leads, signups, or other
                conversions as acquisitions as long as the same definition is
                used consistently.
              </p>
            </ContentSection>

            <ContentSection title="CPA Calculation Examples">
              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>CPA = Total Ad Spend / Number of Acquisitions</p>
                <p>Spend Per 10 Customers = CPA x 10</p>
                <p>Spend Per 100 Customers = CPA x 100</p>
              </div>
            </ContentSection>

            <ContentSection title="What Is a Good CPA?">
              <p>
                A good CPA is one that allows your business to acquire customers
                while remaining profitable. There is no single CPA target that
                works for every business.
              </p>

              <p className="mt-4">
                Your ideal CPA depends on average order value, gross margin,
                customer lifetime value, operating costs, and your desired
                profit margin.
              </p>

              <p className="mt-4">
                Use the{" "}
                <Link
                  href="/profit-margin-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Profit Margin Calculator
                </Link>{" "}
                to understand how much margin you have available before setting
                your acquisition target.
              </p>
            </ContentSection>

            <ContentSection title="Maximum CPA Formula">
              <p>
                Maximum CPA estimates the highest amount you can spend to
                acquire one customer while still keeping your desired profit
                per order.
              </p>

              <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>Gross Profit Per Order = AOV x Gross Margin %</p>
                <p>
                  Desired Profit Per Order = AOV x Desired Profit Margin %
                </p>
                <p>
                  Maximum CPA = Gross Profit Per Order - Desired Profit Per
                  Order
                </p>
              </div>
            </ContentSection>

            <ContentSection title="CPA vs CAC">
              <p>
                CPA usually measures the cost of generating a specific
                conversion from advertising, such as a sale or lead. CAC, or
                customer acquisition cost, often includes broader sales and
                marketing expenses used to acquire a new customer.
              </p>
            </ContentSection>

            <ContentSection title="CPA vs ROAS">
              <p>
                CPA measures how much it costs to acquire one customer or
                conversion. ROAS measures how much revenue advertising
                generates for every dollar spent.
              </p>

              <p className="mt-4">
                Use the{" "}
                <Link
                  href="/roas-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  ROAS Calculator
                </Link>{" "}
                when you want to measure advertising revenue efficiency instead
                of acquisition cost.
              </p>
            </ContentSection>

            <ContentSection title="CPA and Break-Even Advertising">
              <p>
                CPA should always be considered alongside your margins. If your
                acquisition cost becomes too high relative to gross profit, your
                advertising may become unprofitable even if it continues to
                generate customers.
              </p>

              <p className="mt-4">
                Use the{" "}
                <Link
                  href="/break-even-roas-calculator"
                  className="font-semibold text-slate-950 underline decoration-teal-300 underline-offset-4 hover:decoration-teal-600"
                >
                  Break-Even ROAS Calculator
                </Link>{" "}
                to understand the advertising efficiency required to avoid
                losing money.
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