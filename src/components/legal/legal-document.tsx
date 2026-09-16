import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { legalFactLabels, legalUi, type LegalDocument, type LegalParagraph } from "@/content/legal";
import { missingLegalFacts, resolveParagraph } from "@/lib/legal";

function LegalText({ paragraph }: { paragraph: LegalParagraph }) {
  const resolved = resolveParagraph(paragraph);
  if (resolved.status === "omitted") return null;
  if (resolved.status === "text") return <p>{resolved.text}</p>;
  // Only reachable in development: production returns 404 until every required fact exists.
  return (
    <p className="legal-missing">
      <strong>{legalUi.missing}:</strong> {resolved.facts.map((key) => legalFactLabels[key]).join("; ")}
    </p>
  );
}

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  const introduction = resolveParagraph(document.introduction);
  const isDraft = missingLegalFacts(document).length > 0;

  return (
    <div className="site-container legal-bento" data-surface="canvas">
      <Card as="section" surface="dark" shadow="soft" className="legal-hero" aria-labelledby="legal-heading">
        <PillLabel>{legalUi.eyebrow}</PillLabel>
        <h1 id="legal-heading">{document.heading}</h1>
        <p className="legal-hero__intro">
          {introduction.status === "text" ? introduction.text : `${legalUi.missing}: ${legalFactLabels.legalEntityName}`}
        </p>
      </Card>
      <Card surface="white" padding="lg" shadow="soft" className="legal-panel">
        <Card as="aside" surface="lavender" radius="tile" padding="sm" className="legal-contents-card">
          <nav className="legal-contents" aria-label={legalUi.contentsLabel}>
            <p className="legal-contents__title" aria-hidden="true">{legalUi.contentsLabel}</p>
            <ol>
              {document.sections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
              ))}
            </ol>
          </nav>
        </Card>
        <div className="legal-body">
          {isDraft && <p className="legal-draft" role="note">{legalUi.draftNotice}</p>}
          {document.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="legal-section" aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`}>
                <span className="legal-section__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <LegalText key={paragraphIndex} paragraph={paragraph} />)}
            </section>
          ))}
        </div>
      </Card>
    </div>
  );
}
