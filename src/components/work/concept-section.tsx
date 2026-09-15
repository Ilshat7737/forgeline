import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { services } from "@/content/services";
import { workPage, type WorkConcept } from "@/content/work";
import { ConceptLabel } from "./concept-label";

export function ConceptSection({ concept }: { concept: WorkConcept }) {
  return (
    <section id={concept.id} className="concept-section" data-surface="light" aria-labelledby={`detail-${concept.id}`}>
      <div className="site-container concept-section__layout">
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
          <ButtonLink href={`/contact?project=${concept.id}`} surface="light">{workPage.discuss}</ButtonLink>
          <p className="concept-section__disclaimer">{workPage.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
