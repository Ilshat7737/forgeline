import type { Metadata } from "next";
import { legalDocuments, legalFacts, optionalLegalFacts, type LegalDocument, type LegalFactKey, type LegalFacts, type LegalParagraph } from "@/content/legal";
import type { NavigationLink } from "@/content/navigation";
import { pageMetadata } from "./metadata";

export type ResolvedParagraph =
  | { status: "text"; text: string }
  | { status: "missing"; facts: LegalFactKey[] }
  | { status: "omitted" };

function factValue(facts: LegalFacts, key: LegalFactKey): string | null {
  const value = facts[key]?.trim();
  return value ? value : null;
}

function paragraphFacts(paragraph: LegalParagraph): readonly LegalFactKey[] {
  if (paragraph.kind === "fact") return [paragraph.fact];
  if (paragraph.kind === "template") return paragraph.facts;
  return [];
}

export function resolveParagraph(paragraph: LegalParagraph, facts: LegalFacts = legalFacts): ResolvedParagraph {
  if (paragraph.kind === "text") return { status: "text", text: paragraph.text };
  const missing = paragraphFacts(paragraph).filter((key) => factValue(facts, key) === null);
  if (missing.length > 0) {
    return missing.every((key) => optionalLegalFacts.includes(key)) ? { status: "omitted" } : { status: "missing", facts: missing };
  }
  if (paragraph.kind === "fact") return { status: "text", text: factValue(facts, paragraph.fact)! };
  const values = Object.fromEntries(Object.keys(facts).map((key) => [key, factValue(facts, key as LegalFactKey) ?? ""])) as Record<LegalFactKey, string>;
  return { status: "text", text: paragraph.render(values) };
}

/** Required facts a document still needs, in document order. */
export function missingLegalFacts(document: LegalDocument, facts: LegalFacts = legalFacts): LegalFactKey[] {
  const referenced = [document.introduction, ...document.sections.flatMap((section) => section.paragraphs)].flatMap(paragraphFacts);
  return [...new Set(referenced)].filter((key) => !optionalLegalFacts.includes(key) && factValue(facts, key) === null);
}

export function isLegalDocumentPublished(document: LegalDocument, facts: LegalFacts = legalFacts): boolean {
  return missingLegalFacts(document, facts).length === 0;
}

/** Drafts stay reachable in development for review, but never in production. */
export function isLegalPageAvailable(document: LegalDocument, facts: LegalFacts = legalFacts, nodeEnv: string | undefined = process.env.NODE_ENV): boolean {
  return isLegalDocumentPublished(document, facts) || nodeEnv !== "production";
}

/** Links for the footer, sitemap and form helper: published documents only, so no link ever leads to a draft. */
export function publishedLegalLinks(facts: LegalFacts = legalFacts): NavigationLink[] {
  return Object.values(legalDocuments)
    .filter((document) => isLegalDocumentPublished(document, facts))
    .map((document) => ({ label: document.linkLabel, href: document.path }));
}

export function legalPageMetadata(document: LegalDocument, facts: LegalFacts = legalFacts): Metadata {
  const introduction = resolveParagraph(document.introduction, facts);
  const description = introduction.status === "text" ? introduction.text : document.title;
  const metadata = pageMetadata({ title: document.title, description }, document.path);
  return isLegalDocumentPublished(document, facts) ? metadata : { ...metadata, robots: { index: false, follow: false } };
}
