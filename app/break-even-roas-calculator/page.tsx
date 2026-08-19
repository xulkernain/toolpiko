import type { Metadata } from "next";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { BreakEvenRoasCalculator } from "./break-even-roas-calculator";

export const metadata: Metadata = {
  title: "Break-Even ROAS Calculator - Free Tool | ToolPiko",
  description:
    "Calculate your break-even ROAS, break-even CPA, contribution margin, and target ROAS using product costs, fees, shipping, and desired profit margin.",
  alternates: {
    canonical: "/break-even-roas-calculator",
  },
};

const faqs = [
  {
    question: "What is a good break-even ROAS?",
    answer:
      "A lower break-even ROAS is usually better because it means each order has more margin available for advertising. The right number depends on your costs, pricing, and profit goals.",
  },
  {
    question: "Is break-even ROAS the same as target ROAS?",
    answer:
      "No. Break-even ROAS covers costs and ad spend with zero profit. Target ROAS includes the profit margin you want to keep after advertising.",
  },
  {
    question: "Should I include shipping and payment fees?",
    answer:
      "Yes. Any cost that changes with each order should be included so your ROAS target reflects real contribution profit.",
  },
  {
    question: "Can this calculator be used for services or digital products?",
    answer:
      "Yes. Use average order value as revenue and enter any per-sale costs such as platform fees, contractor costs, commissions, or delivery costs.",
  },
];

export default function BreakEvenRoasPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Free marketing calculator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Break-Even ROAS Calculator
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Calculate the ROAS you need to cover product costs, fees, shipping,
            fulfillment, and your target profit margin before scaling paid ads.
          </p>
        </div>

        <div className="mt-10">
          <BreakEvenRoasCalculator />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Guide
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Understanding Break-Even ROAS
            </h2>
          </div>

          <div className="space-y-10">
            <ContentSection title="What is Break-Even ROAS?">
              <p>
                Break-even ROAS is the minimum return on ad spend you need for
                an order to cover its variable costs and advertising cost. At
                break-even ROAS, the order produces zero profit after ads.
              </p>
            </ContentSection>

            <ContentSection title="How to Calculate Break-Even ROAS">
              <p>
                Start with average order value, subtract every variable cost per
                order, then divide average order value by the contribution
                profit left over. That contribution profit is the most you can
                spend on ads before the order stops being profitable.
              </p>
            </ContentSection>

            <ContentSection title="Break-Even ROAS Formula">
              <div className="rounded-lg border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-800">
                <p>Contribution Profit = AOV - Variable Costs</p>
                <p>Contribution Margin % = Contribution Profit / AOV x 100</p>
                <p>Break-Even CPA = Contribution Profit</p>
                <p>Break-Even ROAS = AOV / Break-Even CPA</p>
                <p>Target CPA = Contribution Profit - Target Profit</p>
                <p>Target ROAS = AOV / Target CPA</p>
              </div>
            </ContentSection>

            <ContentSection title="Example">
              <p>
                If your average order value is $100 and your product, shipping,
                fulfillment, payment fee, and other variable costs total $52,
                your contribution profit is $48. Your break-even CPA is $48 and
                your break-even ROAS is 2.08x. If you want a 15% target profit
                margin, you reserve $15 profit, leaving a target CPA of $33 and
                a target ROAS of 3.03x.
              </p>
            </ContentSection>

            <ContentSection title="Break-Even ROAS vs Target ROAS">
              <p>
                Break-even ROAS tells you the floor: the minimum performance
                needed to avoid losing money. Target ROAS tells you the goal:
                the performance needed after protecting your desired profit
                margin. Most teams should optimize toward target ROAS, not just
                break-even ROAS.
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
