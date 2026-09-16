import { CubeArtwork } from "@/components/home/studio-artwork";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { servicesPage } from "@/content/services";

export function ServicesHero() {
  const content = servicesPage.hero;
  return (
    <section className="services-hero" aria-labelledby="services-heading">
      <Card surface="coral" shadow="soft" className="services-hero__copy">
        <PillLabel>{content.eyebrow}</PillLabel>
        <h1 id="services-heading">{content.heading}</h1>
        <p>{content.introduction}</p>
        <ButtonLink href={content.cta.href} variant="primary-dark">{content.cta.label}</ButtonLink>
      </Card>
      <Card surface="lavender" padding="none" shadow="soft" className="services-hero__art">
        <CubeArtwork />
      </Card>
    </section>
  );
}
