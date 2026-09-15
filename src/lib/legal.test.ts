import { describe, expect, it } from "vitest";
import { legalDocuments, legalFacts, type LegalFactKey, type LegalFacts } from "@/content/legal";
import { isLegalDocumentPublished, isLegalPageAvailable, legalPageMetadata, missingLegalFacts, publishedLegalLinks, resolveParagraph } from "./legal";

const { privacyPolicy, websiteTerms } = legalDocuments;

const complete: LegalFacts = Object.fromEntries(
  Object.keys(legalFacts).map((key) => [key, `Sample ${key}`]),
) as LegalFacts;

function without(...keys: LegalFactKey[]): LegalFacts {
  return { ...complete, ...Object.fromEntries(keys.map((key) => [key, null])) };
}

describe("legal publication gate", () => {
  it("keeps both documents unpublished while facts are missing", () => {
    expect(isLegalDocumentPublished(privacyPolicy)).toBe(false);
    expect(isLegalDocumentPublished(websiteTerms)).toBe(false);
    expect(missingLegalFacts(privacyPolicy)).toContain("legalEntityName");
    expect(missingLegalFacts(websiteTerms)).toContain("liabilityAndGoverningLaw");
  });

  it("publishes a document once every required fact is supplied", () => {
    expect(isLegalDocumentPublished(privacyPolicy, complete)).toBe(true);
    expect(isLegalDocumentPublished(websiteTerms, complete)).toBe(true);
  });

  it("does not block publication on optional facts", () => {
    const facts = without("otherCollectionSources", "externalLinkProvisions");
    expect(isLegalDocumentPublished(privacyPolicy, facts)).toBe(true);
    expect(isLegalDocumentPublished(websiteTerms, facts)).toBe(true);
  });

  it("treats blank values as missing", () => {
    expect(missingLegalFacts(privacyPolicy, { ...complete, retention: "   " })).toEqual(["retention"]);
  });

  it("returns 404 for drafts only in production", () => {
    expect(isLegalPageAvailable(privacyPolicy, legalFacts, "production")).toBe(false);
    expect(isLegalPageAvailable(privacyPolicy, legalFacts, "development")).toBe(true);
    expect(isLegalPageAvailable(privacyPolicy, complete, "production")).toBe(true);
  });

  it("links only published documents", () => {
    expect(publishedLegalLinks()).toEqual([]);
    expect(publishedLegalLinks(complete)).toEqual([
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Website Terms", href: "/terms-of-service" },
    ]);
    expect(publishedLegalLinks(without("permittedUse"))).toEqual([{ label: "Privacy Policy", href: "/privacy-policy" }]);
  });

  it("marks drafts noindex and indexes published documents", () => {
    expect(legalPageMetadata(websiteTerms).robots).toEqual({ index: false, follow: false });
    expect(legalPageMetadata(websiteTerms, complete).robots).toBeUndefined();
  });
});

describe("legal paragraph resolution", () => {
  const responsible = privacyPolicy.sections[0].paragraphs[0];

  it("renders templates with supplied facts", () => {
    expect(resolveParagraph(responsible, complete)).toEqual({
      status: "text",
      text: "Sample legalEntityName, Sample registeredAddress, is responsible for the processing described in this notice. You can contact us at Sample privacyContact.",
    });
  });

  it("reports every missing required fact instead of rendering partial text", () => {
    expect(resolveParagraph(responsible, without("registeredAddress", "privacyContact"))).toEqual({
      status: "missing",
      facts: ["registeredAddress", "privacyContact"],
    });
  });

  it("omits optional paragraphs without a value", () => {
    const optional = websiteTerms.sections.find((section) => section.id === "external-links")!.paragraphs[1];
    expect(resolveParagraph(optional, without("externalLinkProvisions"))).toEqual({ status: "omitted" });
  });
});
