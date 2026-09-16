import type { Metadata } from "next";
import { ProcessSteps } from "@/components/home/process-steps";
import { SlabArtwork } from "@/components/home/studio-artwork";
import { DeliveryPrinciples } from "@/components/services/delivery-principles";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { approachPage } from "@/content/approach";
import { pageMetadata } from "@/lib/metadata";
import "@/styles/studio-pages.css";

export const metadata: Metadata = pageMetadata(approachPage, "/approach");

export default function ApproachPage() {
  return (
    <div className="site-container studio-page" data-surface="canvas">
      <section className="studio-page__hero" aria-labelledby="approach-heading">
        <Card surface="coral" shadow="soft" className="studio-page__hero-copy">
          <PillLabel>{approachPage.hero.eyebrow}</PillLabel>
          <h1 id="approach-heading">{approachPage.hero.heading}</h1>
          <p>{approachPage.hero.introduction}</p>
        </Card>
        <Card surface="dark" shadow="soft" padding="none" className="studio-page__art" aria-hidden="true">
          <SlabArtwork />
        </Card>
      </section>
      <section className="studio-page__section" aria-labelledby="begin-heading">
        <SectionHeading heading={approachPage.process.heading} headingId="begin-heading" />
        <ProcessSteps steps={approachPage.process.steps} />
      </section>
      <section className="studio-page__section" aria-labelledby="principles-heading">
        <SectionHeading heading={approachPage.delivery.heading} headingId="principles-heading" />
        <DeliveryPrinciples principles={approachPage.delivery.principles} level={3} />
      </section>
      <Card as="section" surface="lavender" shadow="soft" className="studio-page__cta" aria-labelledby="approach-contact-heading">
        <SectionHeading label={approachPage.contact.label} heading={approachPage.contact.heading} headingId="approach-contact-heading" />
        <div className="studio-page__cta-bottom">
          <p>{approachPage.contact.body}</p>
          <ButtonLink href={approachPage.contact.cta.href}>{approachPage.contact.cta.label}</ButtonLink>
        </div>
      </Card>
    </div>
  );
}
