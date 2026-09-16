import type { Metadata } from "next";
import { WorkHero } from "@/components/work/work-hero";
import type { CardSurface } from "@/components/ui/card";
import { ConceptArtwork } from "@/components/work/artwork/concept-artwork";
import { ConceptCard } from "@/components/work/concept-card";
import { ConceptSection } from "@/components/work/concept-section";
import { WorkCta } from "@/components/work/work-cta";
import { WorkFilter, WorkFilterBoundary } from "@/components/work/work-filter";
import { pages } from "@/content/pages";
import { workConcepts, workPage } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";
import "@/styles/work.css";

export const metadata: Metadata = pageMetadata(pages.work, "/work");

const conceptSurfaces = ["white", "lavender", "dark", "coral", "lavender", "white"] as const satisfies readonly CardSurface[];

export default function WorkPage() {
  return (
    <div className="site-container work-bento" data-surface="canvas" data-reveal-group>
      <WorkHero />
      <section className="work-collection" aria-labelledby="concepts-heading">
        <h2 className="sr-only" id="concepts-heading">{workPage.collectionHeading}</h2>
        <WorkFilterBoundary>
          <WorkFilter entries={workConcepts.map((concept, index) => ({
            id: concept.id,
            category: concept.category,
            featured: concept.featured,
            content: <ConceptCard concept={concept} surface={conceptSurfaces[index % conceptSurfaces.length]} artwork={<ConceptArtwork id={concept.id} />} />,
          }))} />
        </WorkFilterBoundary>
      </section>
      {workConcepts.map((concept, index) => <ConceptSection key={concept.id} concept={concept} surface={conceptSurfaces[index % conceptSurfaces.length]} artwork={<ConceptArtwork id={concept.id} />} />)}
      <WorkCta />
    </div>
  );
}
