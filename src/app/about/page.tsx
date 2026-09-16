import type { Metadata } from "next";
import { CubeArtwork } from "@/components/home/studio-artwork";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, type CardSurface } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { PillLabel } from "@/components/ui/pill-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutPage } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";
import "@/styles/studio-pages.css";

export const metadata: Metadata = pageMetadata(aboutPage, "/about");

const surfaces: readonly CardSurface[] = ["white", "lavender", "coral"];
const icons: readonly IconName[] = ["scan", "layers", "users"];

export default function AboutPage() {
  return (
    <div className="site-container studio-page" data-surface="canvas" data-reveal-group>
      <section className="studio-page__hero" aria-labelledby="about-heading">
        <Card surface="dark" shadow="soft" className="studio-page__hero-copy">
          <PillLabel>{aboutPage.hero.eyebrow}</PillLabel>
          <h1 id="about-heading">{aboutPage.hero.heading}</h1>
          <p>{aboutPage.hero.introduction}</p>
        </Card>
        <Card surface="lavender" shadow="soft" padding="none" className="studio-page__art" aria-hidden="true">
          <CubeArtwork />
        </Card>
      </section>
      <section className="studio-page__section" aria-labelledby="purpose-heading">
        <div className="studio-page__statement">
          <SectionHeading heading={aboutPage.purpose.heading} headingId="purpose-heading" />
          <p>{aboutPage.purpose.body}</p>
        </div>
        <div className="studio-page__values">
          {aboutPage.values.map((value, index) => (
            <Card key={value.heading} surface={surfaces[index]} shadow="soft">
              <Icon name={icons[index]} />
              <h3>{value.heading}</h3>
              <p>{value.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <Card as="section" surface="white" shadow="soft" className="studio-page__statement studio-page__team" aria-labelledby="team-heading">
        <SectionHeading heading={aboutPage.team.heading} headingId="team-heading" />
        <div>
          <p>{aboutPage.team.body}</p>
          <p className="studio-page__note">{aboutPage.team.note}</p>
        </div>
      </Card>
      <Card as="section" surface="dark" shadow="soft" className="studio-page__statement" aria-labelledby="people-heading">
        <SectionHeading heading={aboutPage.people.heading} headingId="people-heading" />
        <p>{aboutPage.people.body}</p>
      </Card>
      <Card as="section" surface="coral" shadow="soft" className="studio-page__cta" aria-labelledby="about-contact-heading">
        <SectionHeading heading={aboutPage.cta.heading} headingId="about-contact-heading" />
        <div className="studio-page__cta-bottom">
          <p>{aboutPage.cta.body}</p>
          <ButtonLink href={aboutPage.cta.link.href} variant="primary-dark">{aboutPage.cta.link.label}</ButtonLink>
        </div>
      </Card>
    </div>
  );
}
