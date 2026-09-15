import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ValueStatement } from "@/components/home/value-statement";
import { ServicesAccordion } from "@/components/home/services-accordion";
import { ProcessSection } from "@/components/home/process-section";
import { InsightLinks } from "@/components/home/insight-links";
import { FeaturedWork } from "@/components/home/featured-work";
import { ContactBand } from "@/components/home/contact-band";
import { pages } from "@/content/pages";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: pages.home.title,
  description: pages.home.description,
  alternates: { canonical: "/" },
  openGraph: { title: pages.home.title, description: pages.home.description, url: "/", type: "website" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStatement />
      <ServicesAccordion />
      <ProcessSection />
      <InsightLinks />
      <FeaturedWork />
      <ContactBand />
    </>
  );
}
