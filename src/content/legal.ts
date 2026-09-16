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
  legalEntityName: "Forgeline",
  // No registered company yet: the owner is identified by name and contactable by email (optional fact).
  registeredAddress: null,
  privacyContact: "privacy@forgeline.tech",
  publicContactDetails: "privacy@forgeline.tech",
  effectiveDate: "16 September 2026",
  technicalData:
    "Our web server keeps standard access logs — IP address, time of the request, the address requested, the referring page and the browser user agent — so that we can keep the site available and investigate errors or abuse. The website itself runs no analytics and sets no cookies.",
  otherCollectionSources: null,
  otherPurposesAndLegalBases:
    "We rely on our legitimate interest in answering business enquiries (Article 6(1)(f) GDPR) for the details you send us, and on the same legitimate interest in keeping the website secure and available for server log data. We do not use your details for marketing and we do not profile you.",
  recipients:
    "Our hosting provider runs the server on our behalf inside the European Union. If you write to us by email, our email provider handles that message. We do not sell personal information and we do not pass enquiry details to anyone else unless the law requires it.",
  retention:
    "The website form currently stores nothing: it neither saves nor forwards what you type, so no enquiry data exists on our side until a delivery provider is connected. Once one is, we will keep enquiry details for 12 months after our last exchange and delete them afterwards. Server access logs are rotated on a regular schedule and are not kept longer than we need them for security and troubleshooting.",
  internationalProcessing:
    "The website and its server run inside the European Union, and we do not transfer personal information outside the EU or the European Economic Area.",
  rightsAndComplaints:
    "Under the GDPR you can ask for a copy of your personal information, ask us to correct or erase it, ask us to restrict or object to our use of it, and ask to receive it in a portable form. Write to privacy@forgeline.tech and we will answer within one month. If you believe we have handled your information incorrectly, you can complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, www.aki.ee) or to the supervisory authority in your own country.",
  cookieInventory:
    "This website sets no cookies and uses no analytics, advertising or tracking technologies. It stores nothing in your browser's local or session storage, so there is nothing here to consent to or switch off.",
  permittedUse:
    "You may read, quote and share these pages for your own information and to evaluate our services, with a link or a clear reference back to the source. The text, design, code, product concepts and illustrations are ours and remain ours: please do not republish them as your own, use them commercially or collect them automatically for resale or model training without our written permission. Do not attempt to disrupt, overload or gain unauthorised access to the website.",
  externalLinkProvisions: null,
  liabilityAndGoverningLaw:
    "The website is provided as it is. We keep it accurate and available as far as we reasonably can, but we do not guarantee uninterrupted access or that every page is free of errors. Nothing on the website is an offer, a quote or professional advice: any work we do together is governed by the contract we sign for it. To the extent the law allows, we are not liable for indirect or consequential loss arising from use of the website. These terms are governed by Estonian law, and disputes belong to the courts of Estonia unless mandatory consumer rules give you another option.",
};

/**
 * Facts that may stay empty: their paragraph is simply omitted.
 * `registeredAddress` is optional because the GDPR requires the controller's identity and contact details,
 * which the name and the privacy email already provide; add the address once a company is registered.
 */
export const optionalLegalFacts: readonly LegalFactKey[] = ["otherCollectionSources", "externalLinkProvisions", "registeredAddress"];

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
  heading: "Privacy Policy",
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
      paragraphs: [
        {
          kind: "template",
          facts: ["legalEntityName", "privacyContact"],
          render: (f) => `${f.legalEntityName} is responsible for the processing described in this notice. You can contact us at ${f.privacyContact}.`,
        },
        // Rendered only once a registered address exists.
        { kind: "fact", fact: "registeredAddress" },
      ],
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
  heading: "Website Terms",
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
