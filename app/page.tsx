import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const popularTools = [
  {
    name: "Break-Even ROAS Calculator",
    description: "Find the return on ad spend you need before campaigns lose money.",
    badge: "Coming First",
    href: "/break-even-roas-calculator",
  },
  {
    name: "Target ROAS Calculator",
    description: "Calculate the ROAS needed to hit your desired profit margin.",
    href: "/target-roas-calculator",
  },
  {
    name: "ROAS Calculator",
    description: "Measure revenue generated for every dollar spent on advertising.",
    href: "/roas-calculator",
  },
  {
    name: "CPA Calculator",
    description: "Calculate the cost to acquire each customer, lead, or conversion.",
    href: "/cpa-calculator",
  },
  {
    name: "Affiliate Commission Calculator",
    description: "Estimate affiliate payouts and partner commission costs quickly.",
    href: "/affiliate-commission-calculator",
  },
  {
    name: "Profit Margin Calculator",
    description: "Understand gross margin, profit, and pricing room in seconds.",
    href: "/profit-margin-calculator",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Marketing and e-commerce calculators
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Free Tools for Smarter Business Decisions
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Simple, fast calculators for marketers, e-commerce teams, creators,
            and business owners.
          </p>
          <div className="mt-8">
            <a
              href="#tools"
              className="inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            >
              Explore Tools
            </a>
          </div>
        </div>
      </section>

      <section id="tools" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Start here
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Popular Tools
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Practical calculators for the numbers marketers and business
              owners check every week.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Free tools. No signup required.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            ToolPiko is built for quick decisions. Open a calculator, enter your
            numbers, and get a clear answer without accounts, paywalls, or heavy
            setup.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

type PopularTool = {
  name: string;
  description: string;
  badge?: string;
  href?: string;
};

function ToolCard({ tool }: { tool: PopularTool }) {
  const content = (
    <>
      <div className="flex min-h-7 items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-7 text-slate-950">
          {tool.name}
        </h3>
        {tool.badge ? (
          <span className="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-200">
            {tool.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{tool.description}</p>
    </>
  );

  const className =
    "block h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950";

  if (tool.href) {
    return (
      <Link href={tool.href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
