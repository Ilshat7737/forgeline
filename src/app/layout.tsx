import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { pages } from "@/content/pages";
import { site } from "@/content/site";
import "@/styles/globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: pages.home.title,
  description: pages.home.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body id="top" className="flex min-h-svh flex-col" data-surface="dark">
        <a href="#main-content" className="skip-link">{site.skipLink}</a>
        <SiteHeader />
        <PageShell>{children}</PageShell>
        <SiteFooter />
      </body>
    </html>
  );
}
