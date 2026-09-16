import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageShell } from "@/components/layout/page-shell";
import { pages } from "@/content/pages";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const font = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: pages.home.title,
  description: pages.home.description,
  openGraph: { siteName: site.name, locale: "en", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={font.variable}>
      <body id="top" className="flex min-h-svh flex-col" data-surface="canvas">
        <a href="#main-content" className="skip-link">{site.skipLink}</a>
        <SiteHeader />
        <PageShell>{children}</PageShell>
        <SiteFooter />
      </body>
    </html>
  );
}
