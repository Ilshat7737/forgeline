import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import type { NavigationLink } from "@/content/navigation";
import "@/styles/page-hero.css";

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  introduction: string;
  emphasis?: string;
  cta?: NavigationLink;
};

export function PageHero({ eyebrow, heading, introduction, emphasis, cta }: PageHeroProps) {
  const emphasisIndex = emphasis ? heading.indexOf(emphasis) : -1;

  return (
    <header className="page-hero" data-surface="dark">
      <div className="site-container">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="page-hero__heading">
          {emphasis && emphasisIndex >= 0 ? (
            <>
              {heading.slice(0, emphasisIndex)}
              <span className="page-hero__emphasis">{emphasis}</span>
              {heading.slice(emphasisIndex + emphasis.length)}
            </>
          ) : heading}
        </h1>
        <div className="page-hero__bottom">
          <p>{introduction}</p>
          {cta && <ButtonLink href={cta.href}>{cta.label}</ButtonLink>}
        </div>
      </div>
    </header>
  );
}
