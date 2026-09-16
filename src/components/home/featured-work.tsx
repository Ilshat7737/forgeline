import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { FinancialWorkspaceArtwork } from "@/components/work/artwork/financial-workspace-artwork";
import { EverydayMobileArtwork } from "@/components/work/artwork/everyday-mobile-artwork";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
export function FeaturedWork() {
  return <section className="home-section" aria-labelledby="work-heading">
    <SectionHeading label={home.work.label} heading={home.work.heading} headingId="work-heading" supporting={homeLayout.workSupporting} />
    <div className="featured-work__grid">{home.work.concepts.map(concept => <Card as="article" key={concept.id} surface="white" padding="none" className="featured-concept" shadow="soft">
      <Link href={concept.href} className="featured-concept__link">
        <div className="featured-concept__copy"><PillLabel variant="tag">{home.work.conceptLabel}</PillLabel><h3>{concept.title}</h3><p className="featured-concept__type">{concept.type}</p><p>{concept.summary}</p><span className="featured-concept__arrow"><span className="sr-only">{home.work.viewLabel}</span><ArrowIcon direction="east" /></span></div>
        <div className="featured-concept__artwork">{concept.id === "financial-workspace" ? <FinancialWorkspaceArtwork /> : <EverydayMobileArtwork label={homeLayout.mobilePreviewLabel} />}</div>
      </Link>
    </Card>)}</div>
    <Link href={home.work.all.href} className="editorial-link home-section__link">{home.work.all.label}<ArrowIcon direction="east" /></Link>
  </section>;
}
