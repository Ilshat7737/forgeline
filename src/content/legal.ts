import { site } from "./site";

/**
 * Company-specific legal facts for the Privacy Policy and Website Terms.
 * Every value stays null until it is supplied and legally reviewed. A page is published only when all of its
 * required facts are present; until then it returns 404 in production and is not linked or listed in the sitemap.
 */
export type LegalFacts = {
  legalEntityName: string | null;
  registeredAddress: string | null;
  privacyContact: string | null;
  publicContactDetails: string | null;
  effectiveDate: string | null;
  technicalData: string | null;
  otherCollectionSources: string | null;
  otherPurposesAndLegalBases: string | null;
  recipients: string | null;
  retention: string | null;
  internationalProcessing: string | null;
  rightsAndComplaints: string | null;
  cookieInventory: string | null;
  permittedUse: string | null;
  externalLinkProvisions: string | null;
  liabilityAndGoverningLaw: string | null;
};

export type LegalFactKey = keyof LegalFacts;

export const legalFacts: LegalFacts = {
  legalEntityName: null,
  registeredAddress: null,
  privacyContact: null,
  publicContactDetails: null,
  effectiveDate: null,
  technicalData: null,
  otherCollectionSources: null,
  otherPurposesAndLegalBases: null,
  recipients: null,
  retention: null,
  internationalProcessing: null,
  rightsAndComplaints: null,
  cookieInventory: null,
  permittedUse: null,
  externalLinkProvisions: null,
  liabilityAndGoverningLaw: null,
};

/** Facts that may stay empty: their paragraph is simply omitted. */
export const optionalLegalFacts: readonly LegalFactKey[] = ["otherCollectionSources", "externalLinkProvisions"];

export const legalFactLabels: Record<LegalFactKey, string> = {
  legalEntityName: "Legal entity name",
  registeredAddress: "Registered address",
  privacyContact: "Privacy contact",
  publicContactDetails: "Public contact details",
  effectiveDate: "Approved effective date",
  technicalData: "Verified technical log and analytics data",
  otherCollectionSources: "Other actual collection sources",
  otherPurposesAndLegalBases: "Other purposes and their legal bases",
  recipients: "Hosting, form, email and other recipients and their roles",
  retention: "Retention period or criteria for each data category",
  internationalProcessing: "Processing locations and transfer arrangements",
  rightsAndComplaints: "Applicable rights, request process and complaint information",
  cookieInventory: "Verified cookie and tracker inventory",
  permittedUse: "Permitted use, content rights and prohibited use",
  externalLinkProvisions: "External link provisions",
  liabilityAndGoverningLaw: "Warranty, liability, governing law and dispute provisions",
};

type FactValues = Record<LegalFactKey, string>;

export type LegalParagraph =
  | { kind: "text"; text: string }
  | { kind: "fact"; fact: LegalFactKey }
  | { kind: "template"; facts: readonly LegalFactKey[]; render: (facts: FactValues) => string };

export type LegalSection = { id: string; title: string; paragraphs: readonly LegalParagraph[] };

export type LegalDocument = {
  path: "/privacy-policy" | "/terms-of-service";
  linkLabel: string;
  heading: string;
  title: string;
  introduction: LegalParagraph;
  sections: readonly LegalSection[];
};

export const legalUi = {
  eyebrow: "LEGAL",
  contentsLabel: "On this page",
  missing: "Needs legal input",
  draftNotice: "Development preview. This page is hidden in production until every required legal fact is supplied.",
  footerLabel: "Legal",
} as const;

const privacyPolicy: LegalDocument = {
  path: "/privacy-policy",
  linkLabel: "Privacy Policy",
  heading: "PRIVACY POLICY",
  title: `Privacy Policy | ${site.name}`,
  introduction: {
    kind: "template",
    facts: ["legalEntityName"],
    render: (f) => `This notice explains how ${f.legalEntityName} handles personal information when you use this website or contact us.`,
  },
  sections: [
    {
      id: "who-is-responsible",
      title: "Who is responsible",
      paragraphs: [{
        kind: "template",
        facts: ["legalEntityName", "registeredAddress", "privacyContact"],
        render: (f) => `${f.legalEntityName}, ${f.registeredAddress}, is responsible for the processing described in this notice. You can contact us at ${f.privacyContact}.`,
      }],
    },
    {
      id: "information-we-handle",
      title: "Information we handle",
      paragraphs: [
        { kind: "text", text: "When you contact us, we process the information you provide in the form or message, such as your name, contact details and enquiry." },
        { kind: "fact", fact: "technicalData" },
        { kind: "fact", fact: "otherCollectionSources" },
      ],
    },
    {
      id: "why-we-use-it",
      title: "Why we use it",
      paragraphs: [
        { kind: "text", text: "We use enquiry information to respond to your message and discuss the services you requested." },
        { kind: "fact", fact: "otherPurposesAndLegalBases" },
      ],
    },
    { id: "service-providers", title: "Service providers and disclosures", paragraphs: [{ kind: "fact", fact: "recipients" }] },
    { id: "retention", title: "Retention", paragraphs: [{ kind: "fact", fact: "retention" }] },
    { id: "international-processing", title: "International processing", paragraphs: [{ kind: "fact", fact: "internationalProcessing" }] },
    {
      id: "your-choices",
      title: "Your choices and requests",
      paragraphs: [
        { kind: "template", facts: ["privacyContact"], render: (f) => `To ask a question or make a request concerning your information, contact ${f.privacyContact}.` },
        { kind: "fact", fact: "rightsAndComplaints" },
      ],
    },
    { id: "cookies", title: "Cookies and similar technologies", paragraphs: [{ kind: "fact", fact: "cookieInventory" }] },
    {
      id: "updates",
      title: "Updates",
      paragraphs: [
        { kind: "template", facts: ["effectiveDate"], render: (f) => `Last updated: ${f.effectiveDate}.` },
        { kind: "text", text: "We will publish changes to this notice on this page." },
      ],
    },
  ],
};

const websiteTerms: LegalDocument = {
  path: "/terms-of-service",
  linkLabel: "Website Terms",
  heading: "WEBSITE TERMS",
  title: `Website Terms | ${site.name}`,
  introduction: {
    kind: "template",
    facts: ["legalEntityName"],
    render: (f) => `These terms describe the use of the website operated by ${f.legalEntityName}.`,
  },
  sections: [
    {
      id: "website-operator",
      title: "Website operator",
      paragraphs: [
        { kind: "fact", fact: "legalEntityName" },
        { kind: "fact", fact: "registeredAddress" },
        { kind: "fact", fact: "publicContactDetails" },
      ],
    },
    {
      id: "website-content",
      title: "Website content",
      paragraphs: [{ kind: "text", text: "The website introduces our services and publishes informational material. Any proposal, scope, fee or delivery commitment for client work must be agreed separately in the applicable contract." }],
    },
    {
      id: "project-concepts",
      title: "Project concepts",
      paragraphs: [{ kind: "text", text: "Items marked Concept are illustrative scenarios. They are not presented as completed client engagements or evidence of measured results." }],
    },
    { id: "using-this-website", title: "Using this website", paragraphs: [{ kind: "fact", fact: "permittedUse" }] },
    {
      id: "external-links",
      title: "External links",
      paragraphs: [
        { kind: "text", text: "Some pages may link to third-party websites. Those websites are operated by their respective providers." },
        { kind: "fact", fact: "externalLinkProvisions" },
      ],
    },
    { id: "responsibility", title: "Responsibility and applicable terms", paragraphs: [{ kind: "fact", fact: "liabilityAndGoverningLaw" }] },
    {
      id: "contact-and-changes",
      title: "Contact and changes",
      paragraphs: [
        { kind: "template", facts: ["publicContactDetails"], render: (f) => `For questions about these terms, contact ${f.publicContactDetails}.` },
        { kind: "template", facts: ["effectiveDate"], render: (f) => `Last updated: ${f.effectiveDate}.` },
      ],
    },
  ],
};

export const legalDocuments = { privacyPolicy, websiteTerms } as const;
