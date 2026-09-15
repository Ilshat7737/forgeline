import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { workCategories, workPage, type WorkConcept } from "@/content/work";
import { ConceptLabel } from "./concept-label";

export function ConceptCard({ concept, artwork }: { concept: WorkConcept; artwork: ReactNode }) {
  return (
    <article className="concept-card" aria-labelledby={`card-${concept.id}`}>
      <div className="concept-card__meta"><ConceptLabel /><span>{workCategories.find((category) => category.id === concept.category)?.label}</span></div>
      <h3 id={`card-${concept.id}`}>{concept.title}</h3>
      <p className="concept-card__summary">{concept.summary}</p>
      <div className="concept-card__artwork" style={{ aspectRatio: concept.image.aspectRatio }}>{artwork}</div>
      <a className="editorial-link" href={`#${concept.id}`} aria-labelledby={`view-${concept.id} card-${concept.id}`}>
        <span id={`view-${concept.id}`}>{workPage.view}</span><ArrowIcon direction="east" />
      </a>
    </article>
  );
}
