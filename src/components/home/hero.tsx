import { ArrowIcon } from "@/components/ui/arrow-icon";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { home } from "@/content/home";

export function Hero() {
  const content = home.hero;
  return (
    <section className="home-hero" aria-labelledby="hero-heading" data-surface="dark">
      <div className="site-container home-hero__inner">
        <SectionLabel>{content.eyebrow}</SectionLabel>
        <h1 id="hero-heading" className="home-hero__heading">
          {content.lines.map((line, index) => (
            <span key={line} className="home-hero__line" data-accent={index === 1}>{line}{index < 2 ? " " : ""}</span>
          ))}
        </h1>
        <p className="home-hero__supporting">{content.supporting}</p>
        <div className="home-hero__actions">
          <ButtonLink href={content.primary.href}>{content.primary.label}</ButtonLink>
          <ButtonLink href={content.secondary.href} variant="secondary">{content.secondary.label}</ButtonLink>
        </div>
        <div className="home-hero__aside" aria-hidden="true">
          <p>{content.note.map((line) => <span key={line}>{line}</span>)}</p>
          <ArrowIcon direction="down-right" />
        </div>
        <p className="home-hero__technologies">{content.technologies}</p>
      </div>
    </section>
  );
}
