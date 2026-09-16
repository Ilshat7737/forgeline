import { CubeArtwork } from "@/components/home/studio-artwork";
import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { workPage } from "@/content/work";

export function WorkHero() {
  const content = workPage.hero;
  return (
    <section className="work-hero" aria-labelledby="work-heading">
      <Card surface="coral" shadow="soft" className="work-hero__copy">
        <PillLabel>{content.eyebrow}</PillLabel>
        <h1 id="work-heading">{content.heading}</h1>
        <p className="work-hero__intro">{content.introduction}</p>
        <p className="work-hero__note">{content.note}</p>
      </Card>
      <Card surface="lavender" padding="none" shadow="soft" className="work-hero__art">
        <CubeArtwork />
      </Card>
    </section>
  );
}
