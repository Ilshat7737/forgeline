import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, type CardSurface } from "@/components/ui/card";
import { services } from "@/content/services";
import { workPage, type WorkConcept } from "@/content/work";
import { ConceptLabel } from "./concept-label";

export function ConceptSection({ concept, artwork, surface = "white" }: { concept: WorkConcept; artwork?: ReactNode; surface?: CardSurface }) {
  return (
    <Card as="section" id={concept.id} surface={surface} shadow="soft" className="concept-section" aria-labelledby={`detail-${concept.id}`}>
      <div className="concept-section__copy">
        <header>
          <ConceptLabel />
          <h2 id={`detail-${concept.id}`}>{concept.heading}</h2>
        </header>
        <div className="concept-section__body">
          <div><h3>{workPage.scenario}</h3><p>{concept.scenario}</p></div>
          <div><h3>{workPage.direction}</h3><p>{concept.proposedDirection}</p></div>
          <div><h3>{workPage.questions}</h3><ul>{concept.validationQuestions.map((question) => <li key={question}>{question}</li>)}</ul></div>
          <div>
            <h3>{workPage.services}</h3>
            <ul className="concept-section__services">{concept.relatedServices.map((slug) => (
              <li key={slug}><Link href={`/contact?service=${slug}`}>{services.find((service) => service.slug === slug)?.title}</Link></li>
            ))}</ul>
          </div>
          <ButtonLink href={`/contact?project=${concept.id}`} variant={surface === "coral" ? "primary-dark" : "primary-coral"}>{workPage.discuss}</ButtonLink>
          <p className="concept-section__disclaimer">{workPage.disclaimer}</p>
        </div>
      </div>
      <div className="concept-section__artwork" style={{ aspectRatio: concept.image.aspectRatio }}>{artwork}</div>
    </Card>
  );
}
