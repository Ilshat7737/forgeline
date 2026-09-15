import { artwork } from "./artwork";
import { pages } from "./pages";
import type { services } from "./services";

export type WorkCategory = "web" | "mobile" | "desktop" | "operations";
export type WorkFilterCategory = "all" | WorkCategory;
export type WorkConcept = {
  id: string;
  title: string;
  heading: string;
  category: WorkCategory;
  summary: string;
  scenario: string;
  proposedDirection: string;
  validationQuestions: readonly [string, string];
  relatedServices: readonly (typeof services)[number]["slug"][];
  image: { kind: "native"; alt: string; aspectRatio: number };
};

export const workCategories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
  { id: "operations", label: "Operations" },
] as const satisfies readonly { id: WorkFilterCategory; label: string }[];

export const workConcepts = [
  {
    id: "financial-workspace", title: "Financial workspace", category: "web",
    summary: "Bring balances, activity and available actions into one clear workspace.",
    heading: "Bring financial information into a clear workspace",
    scenario: "Users need to understand activity and status without guessing how different records relate to each other.",
    proposedDirection: "The concept separates summary information, detailed activity and available actions. Every status has an explanation and an appropriate next step.",
    validationQuestions: ["Can users locate an activity record and understand its state?", "Does the interface distinguish available information from pending updates?"],
    relatedServices: ["web-development", "ux-ui-design"],
    image: { kind: "native", alt: artwork.financial.alt, aspectRatio: 2.15 },
  },
  {
    id: "everyday-mobile-service", title: "Everyday mobile service", category: "mobile",
    summary: "Help users complete recurring tasks and understand their progress.",
    heading: "Make a recurring activity easier to complete",
    scenario: "A daily service loses value when users have to navigate too much before reaching the action they came for.",
    proposedDirection: "The concept gives the next activity priority, keeps progress understandable and makes notification preferences explicit.",
    validationQuestions: ["Can a returning user complete the main action quickly?", "Can they understand and change how reminders work?"],
    relatedServices: ["mobile-development", "ux-ui-design", "product-design"],
    image: { kind: "native", alt: artwork.mobile.alt, aspectRatio: 2.15 },
  },
  {
    id: "workflow-automation", title: "Workflow automation", category: "operations",
    summary: "Make approvals, handoffs and exceptions visible to the people responsible for them.",
    heading: "Make approvals and exceptions visible",
    scenario: "Manual handoffs make it difficult to tell which work is waiting, why it is blocked and who can resolve it.",
    proposedDirection: "The concept provides a queue with explicit status, assigned ownership and a history of decisions, supported by configurable validation rules.",
    validationQuestions: ["Can an operator identify a blocked item and its next action?", "Is the reason for a decision available to an authorized reviewer?"],
    relatedServices: ["ai-automation", "business-analysis", "web-development"],
    image: { kind: "native", alt: "Illustrative approval queue with sample requests, assigned reviewers and an exception awaiting a decision.", aspectRatio: 2.15 },
  },
  {
    id: "creative-production-tool", title: "Creative production tool", category: "desktop",
    summary: "Organize content, review feedback and local-file work inside a focused desktop experience.",
    heading: "A desktop workspace for creative production",
    scenario: "Creative teams need specialist tools that fit their review and iteration process.",
    proposedDirection: "The concept combines content organization, review notes and preview behavior in a focused desktop application with clear local-file handling.",
    validationQuestions: ["Can a creator find the current version and collect feedback?", "Does the tool recover clearly after an interrupted save?"],
    relatedServices: ["desktop-development", "product-design"],
    image: { kind: "native", alt: "Illustrative desktop production workspace with local sample files, an abstract canvas, review notes and a version timeline.", aspectRatio: 2.15 },
  },
  {
    id: "asset-processing-console", title: "Asset processing console", category: "web",
    summary: "Configure work, follow processing stages and recover from failures.",
    heading: "Make a complex processing pipeline understandable",
    scenario: "Users need to configure work, follow progress and recover from failures without understanding every internal implementation detail.",
    proposedDirection: "The concept makes input requirements, processing stages and failure causes visible in a unified workspace.",
    validationQuestions: ["Can a user explain why a job failed and safely retry it?", "Can they distinguish a queued job from a stalled one?"],
    relatedServices: ["web-development", "software-architecture", "cloud-devops"],
    image: { kind: "native", alt: "Illustrative asset-processing console showing input, validation and export stages, sample job states and a retry action.", aspectRatio: 2.15 },
  },
  {
    id: "delivery-flow-workspace", title: "Delivery flow workspace", category: "operations",
    summary: "Show where work waits and give blocked items enough context to act.",
    heading: "Understand where delivery work waits",
    scenario: "A busy team may have little visibility into blocked work and long review queues.",
    proposedDirection: "The concept makes work stages and waiting time visible while preserving context about scope, dependencies and rework.",
    validationQuestions: ["Which stage accumulates waiting work?", "Does a process change improve flow without moving problems elsewhere?"],
    relatedServices: ["business-analysis", "cloud-devops"],
    image: { kind: "native", alt: "Illustrative delivery board with sample work in planned, in-progress and review stages, and a blocker with dependency context.", aspectRatio: 2.15 },
  },
] as const satisfies readonly WorkConcept[];

export type WorkConceptId = (typeof workConcepts)[number]["id"];

type WorkPageContent = {
  hero: { eyebrow: string; heading: string; emphasis: string; introduction: string; note: string };
  collectionHeading: string;
  filterLabel: string;
  showing: string;
  singular: string;
  plural: string;
  empty: string;
  reset: string;
  loading: string;
  error: string;
  retry: string;
  view: string;
  scenario: string;
  direction: string;
  questions: string;
  services: string;
  discuss: string;
  disclaimer: string;
  cta: { heading: string; body: string; label: string; href: string };
};

export const workPage = {
  hero: {
    eyebrow: "WORK", heading: pages.work.heading, emphasis: "CLEAR DIRECTIONS.",
    introduction: "Explore illustrative product scenarios across web, mobile, desktop and operational software. Each concept shows how we turn a workflow problem into a product direction.",
    note: "These are illustrative concepts, not completed client engagements or measured client results.",
  },
  collectionHeading: "Work", filterLabel: "Filter concepts by category",
  showing: "Showing", singular: "concept", plural: "concepts",
  empty: "No concepts match this filter. Choose another category.", reset: "Show all concepts",
  loading: "Loading concepts…", error: "We could not load this content. Please try again.", retry: "Try again",
  view: "View concept", scenario: "The scenario", direction: "Proposed direction",
  questions: "Questions to validate", services: "Relevant services", discuss: "Discuss a similar challenge",
  disclaimer: "No delivery metrics or client outcomes are asserted for this concept.",
  cta: { heading: "HAVE A SIMILAR CHALLENGE?", body: "Bring us the workflow, product idea or system you want to improve.", label: "Discuss your project", href: "/contact" },
} as const satisfies WorkPageContent;
