import type { Metadata } from "next";
import { StudioStrip } from "@/components/home/studio-strip";
import "@/styles/contact.css";
import { Hero } from "@/components/home/hero";
import { ValueStatement } from "@/components/home/value-statement";
import { ServicesGrid } from "@/components/home/services-grid";
import { ProcessSection } from "@/components/home/process-section";
import { InsightLinks } from "@/components/home/insight-links";
import { FeaturedWork } from "@/components/home/featured-work";
import { ContactBand } from "@/components/home/contact-band";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import "@/styles/home.css";

export const metadata: Metadata = pageMetadata(pages.home, "/");

export default function HomePage() {
  return (
    <div className="site-container home-bento">
      <Hero />
      <StudioStrip />
      <ValueStatement />
      <ServicesGrid />
      <ProcessSection />
      <InsightLinks />
      <FeaturedWork />
      <ContactBand />
    </div>
  );
}
