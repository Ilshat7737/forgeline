import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
import { CubeArtwork } from "./studio-artwork";

export function Hero() {
  const content = home.hero;
  return <section className="home-hero" aria-labelledby="hero-heading">
    <Card surface="coral" className="home-hero__copy" shadow="soft">
      <PillLabel>{content.eyebrow}</PillLabel>
      <h1 id="hero-heading" className="home-hero__heading"><span>{content.lines[0]}</span>{" "}<span>{content.lines.slice(1).join(" ")}</span></h1>
      <p className="home-hero__supporting">{content.supporting}</p>
      <div className="home-hero__actions">
        <ButtonLink href={content.primary.href} variant="primary-dark" arrow="east">{content.primary.label}</ButtonLink>
        <ButtonLink href={content.secondary.href} variant="quiet" arrow={false}>{content.secondary.label}</ButtonLink>
      </div>
    </Card>
    <Card surface="lavender" padding="none" className="home-hero__art" shadow="soft">
      <CubeArtwork labelled />
      <div className="home-hero__note"><p>{homeLayout.ideasNote}</p><p>{content.note.join(" / ")}</p></div>
    </Card>
  </section>;
}
