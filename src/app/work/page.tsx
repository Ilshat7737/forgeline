import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ConceptArtwork } from "@/components/work/artwork/concept-artwork";
import { ConceptCard } from "@/components/work/concept-card";
import { ConceptSection } from "@/components/work/concept-section";
import { WorkCta } from "@/components/work/work-cta";
import { WorkFilter, WorkFilterBoundary } from "@/components/work/work-filter";
import { pages } from "@/content/pages";
import { workConcepts, workPage } from "@/content/work";
import "@/styles/work.css";

export const metadata: Metadata = {
  title: pages.work.title,
  description: pages.work.description,
  alternates: { canonical: "/work" },
  openGraph: { title: pages.work.title, description: pages.work.description, url: "/work", type: "website" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero {...workPage.hero} />
      <section className="work-collection" data-surface="light" aria-labelledby="concepts-heading">
        <div className="site-container">
          <h2 className="sr-only" id="concepts-heading">{workPage.collectionHeading}</h2>
          <WorkFilterBoundary>
            <WorkFilter entries={workConcepts.map((concept) => ({
              id: concept.id,
              category: concept.category,
              content: <ConceptCard concept={concept} artwork={<ConceptArtwork id={concept.id} />} />,
            }))} />
          </WorkFilterBoundary>
        </div>
      </section>
      {workConcepts.map((concept) => <ConceptSection key={concept.id} concept={concept} />)}
      <WorkCta />
    </>
  );
}
