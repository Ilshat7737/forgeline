import { pages } from "./pages";
import type { services } from "./services";

export const contactServiceOptions = [
  { value: "new-product", label: "New product" },
  { value: "existing-product", label: "Existing product" },
  { value: "web-development", label: "Web development" },
  { value: "mobile-application", label: "Mobile application" },
  { value: "ai-automation", label: "AI and automation" },
  { value: "ux-ui-product-design", label: "UX/UI and product design" },
  { value: "qa-automated-testing", label: "QA and automated testing" },
  { value: "cloud-devops", label: "Cloud and DevOps" },
  { value: "team-augmentation", label: "Team augmentation" },
  { value: "not-sure", label: "Not sure yet" },
] as const satisfies readonly { value: string; label: string }[];

export type ContactServiceOption = (typeof contactServiceOptions)[number]["value"];

export const contactServiceMapping = {
  "business-analysis": "new-product",
  "discovery-workshops": "new-product",
  "product-strategy": "new-product",
  "desktop-development": "new-product",
  "legacy-modernization": "existing-product",
  "software-architecture": "existing-product",
  "web-development": "web-development",
  "mobile-development": "mobile-application",
  "ai-automation": "ai-automation",
  "generative-ai": "ai-automation",
  "product-design": "ux-ui-product-design",
  "ux-ui-design": "ux-ui-product-design",
  "qa-automated-testing": "qa-automated-testing",
  "cloud-solutions": "cloud-devops",
  "cloud-devops": "cloud-devops",
  "team-augmentation": "team-augmentation",
  "client-enablement": "team-augmentation",
  "knowledge-transfer": "team-augmentation",
} as const satisfies Record<(typeof services)[number]["slug"], ContactServiceOption>;

export type ContactFieldName = "name" | "email" | "company" | "services" | "project" | "timing" | "ndaRequested";
export type ContactFieldContent = { label: string; required?: boolean; placeholder?: string; helper?: string };

export const contactFields = {
  name: { label: "Your name", required: true, placeholder: "How should we address you?" },
  email: { label: "Work email", required: true, placeholder: "you@company.com" },
  company: { label: "Company", placeholder: "Your company or project" },
  services: { label: "What do you need help with?" },
  project: { label: "Tell us about your project", required: true, placeholder: "What are you trying to create or improve? Include any goals, constraints or questions you already have." },
  timing: { label: "Desired timing", placeholder: "A target date or a rough timeframe" },
  ndaRequested: { label: "I would like to discuss an NDA before sharing sensitive details." },
} as const satisfies Record<ContactFieldName, ContactFieldContent>;

export const contactErrors = {
  name: "Enter your name.",
  email: "Enter a valid email address.",
  project: "Tell us a little more about your project.",
  company: "Use 120 characters or fewer.",
  timing: "Use 160 characters or fewer.",
  services: "Select one of the listed services.",
  ndaRequested: "Use the checkbox to request an NDA.",
  general: "We could not send your message. Your information is still here, so you can try again.",
  notConfigured: "Project enquiries are not available right now. Please try again later.",
} as const satisfies Record<ContactFieldName | "general" | "notConfigured", string>;

export const contactPage = {
  hero: {
    eyebrow: "CONTACT", heading: pages.contact.heading, emphasis: "create or improve?",
    introduction: "Share a little context about the product, your goals and the constraints you are working with. You do not need a finished specification to start the conversation.",
  },
  supportingPoints: [
    "We begin with your goal and current situation.",
    "You can keep the first description high level.",
    "If an NDA is needed, mention it before sharing sensitive material.",
  ],
  next: {
    heading: "What happens next",
    body: "We review your message and contact you to clarify the next step. If the work is a fit, we agree on the people who should join the conversation and any materials that would help.",
  },
  formHeading: "Tell us about your project.",
  required: "Required", optional: "Optional",
  errorSummary: "Check the highlighted fields.",
  privacy: "We will use these details to respond to your enquiry.",
  privacyLink: "Read our Privacy Policy.",
  submit: "Send project brief", pending: "Sending…",
  honeypot: "Website",
  success: {
    heading: "Thanks. Your project brief has been received.",
    body: "We will review the context you shared and contact you about the next step.",
    primary: { label: "Explore our work", href: "/work" },
    secondary: { label: "Back to home", href: "/" },
    development: "Development submission — not delivered",
  },
} as const;

export function contactProjectSuggestion(title: string): string {
  return `I would like to discuss a challenge similar to ${title}.`;
}
