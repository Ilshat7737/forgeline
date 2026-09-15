import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { SectionLabel } from "@/components/ui/section-label";
import { FinancialWorkspaceArtwork } from "@/components/work/artwork/financial-workspace-artwork";
import { EverydayMobileArtwork } from "@/components/work/artwork/everyday-mobile-artwork";
import { home } from "@/content/home";

export function FeaturedWork() {
  return (
    <section className="home-section home-section--light" data-surface="light" aria-labelledby="work-heading">
      <div className="site-container">
        <SectionLabel>{home.work.label}</SectionLabel>
        <div className="featured-work__heading">
          <h2 id="work-heading" className="home-section__heading">{home.work.heading}</h2>
          <Link href={home.work.all.href} className="editorial-link">{home.work.all.label}<ArrowIcon direction="east" /></Link>
        </div>
        <div className="featured-work__rows">
          {home.work.concepts.map((concept) => (
            <article key={concept.id} className="featured-concept content-grid">
              <div className="featured-concept__artwork">
                {concept.id === "financial-workspace" ? <FinancialWorkspaceArtwork /> : <EverydayMobileArtwork />}
              </div>
              <div className="featured-concept__copy">
                <SectionLabel>{home.work.conceptLabel}</SectionLabel>
                <h3>{concept.title}</h3>
                <SectionLabel>{concept.type}</SectionLabel>
                <p className="featured-concept__summary">{concept.summary}</p>
                <Link href={concept.href} className="editorial-link">{home.work.viewLabel}<ArrowIcon direction="east" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
