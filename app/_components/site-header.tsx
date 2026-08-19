import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-950">
          ToolPiko
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#tools" className="transition-colors hover:text-slate-950">
            Tools
          </Link>
          <Link href="/#about" className="transition-colors hover:text-slate-950">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
