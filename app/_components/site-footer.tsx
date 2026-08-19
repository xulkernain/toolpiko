export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-semibold text-slate-950">ToolPiko</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#" className="transition-colors hover:text-slate-950">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-slate-950">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-slate-950">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
