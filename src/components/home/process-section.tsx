import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessSteps } from "./process-steps";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";

export function ProcessSection() {
  return <section className="home-section" aria-labelledby="approach-heading">
    <SectionHeading label={homeLayout.processLabel} heading={home.process.heading} headingId="approach-heading" supporting={homeLayout.processSupporting} />
    <ProcessSteps />
    <Link href={home.process.link.href} className="editorial-link home-section__link">{home.process.link.label}<ArrowIcon direction="east" /></Link>
  </section>;
}
