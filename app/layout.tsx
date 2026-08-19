import type { Metadata } from "next";
import { siteDescription, siteName, siteUrl } from "./_lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: "ToolPiko - Free Marketing & Business Calculators",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ToolPiko - Free Marketing & Business Calculators",
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolPiko - Free Marketing & Business Calculators",
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
