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
  featured: boolean;
  summary: string;
  scenario: string;
  proposedDirection: string;
  validationQuestions: readonly [string, string];
  relatedServices: readonly (typeof services)[number]["slug"][];
  image: { kind: "native"; alt: string; aspectRatio: number };
};

export const workCategories = [
  { id: "all", label: "Featured" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
  { id: "operations", label: "Operations" },
] as const satisfies readonly { id: WorkFilterCategory; label: string }[];

export const workConcepts = [
  {
    id: "financial-workspace", title: "Financial workspace", category: "web", featured: true,
    summary: "Bring balances, activity and available actions into one clear workspace.",
    heading: "Bring financial information into a clear workspace",
    scenario: "Users need to understand activity and status without guessing how different records relate to each other.",
    proposedDirection: "The concept separates summary information, detailed activity and available actions. Every status has an explanation and an appropriate next step.",
    validationQuestions: ["Can users locate an activity record and understand its state?", "Does the interface distinguish available information from pending updates?"],
    relatedServices: ["web-development", "ux-ui-design"],
    image: { kind: "native", alt: artwork.financial.alt, aspectRatio: 2.15 },
  },
  {
    id: "everyday-mobile-service", title: "Everyday mobile service", category: "mobile", featured: true,
    summary: "Help users complete recurring tasks and understand their progress.",
    heading: "Make a recurring activity easier to complete",
    scenario: "A daily service loses value when users have to navigate too much before reaching the action they came for.",
    proposedDirection: "The concept gives the next activity priority, keeps progress understandable and makes notification preferences explicit.",
    validationQuestions: ["Can a returning user complete the main action quickly?", "Can they understand and change how reminders work?"],
    relatedServices: ["mobile-development", "ux-ui-design", "product-design"],
    image: { kind: "native", alt: artwork.mobile.alt, aspectRatio: 2.15 },
  },
  {
    id: "workflow-automation", title: "Workflow automation", category: "operations", featured: true,
    summary: "Make approvals, handoffs and exceptions visible to the people responsible for them.",
    heading: "Make approvals and exceptions visible",
    scenario: "Manual handoffs make it difficult to tell which work is waiting, why it is blocked and who can resolve it.",
    proposedDirection: "The concept provides a queue with explicit status, assigned ownership and a history of decisions, supported by configurable validation rules.",
    validationQuestions: ["Can an operator identify a blocked item and its next action?", "Is the reason for a decision available to an authorized reviewer?"],
    relatedServices: ["ai-automation", "business-analysis", "web-development"],
    image: { kind: "native", alt: "Illustrative approval queue with sample requests, assigned reviewers and an exception awaiting a decision.", aspectRatio: 2.15 },
  },
  {
    id: "creative-production-tool", title: "Creative production tool", category: "desktop", featured: true,
    summary: "Organize content, review feedback and local-file work inside a focused desktop experience.",
    heading: "A desktop workspace for creative production",
    scenario: "Creative teams need specialist tools that fit their review and iteration process.",
    proposedDirection: "The concept combines content organization, review notes and preview behavior in a focused desktop application with clear local-file handling.",
    validationQuestions: ["Can a creator find the current version and collect feedback?", "Does the tool recover clearly after an interrupted save?"],
    relatedServices: ["desktop-development", "product-design"],
    image: { kind: "native", alt: "Illustrative desktop production workspace with local sample files, an abstract canvas, review notes and a version timeline.", aspectRatio: 2.15 },
  },
  {
    id: "asset-processing-console", title: "Asset processing console", category: "web", featured: true,
    summary: "Configure work, follow processing stages and recover from failures.",
    heading: "Make a complex processing pipeline understandable",
    scenario: "Users need to configure work, follow progress and recover from failures without understanding every internal implementation detail.",
    proposedDirection: "The concept makes input requirements, processing stages and failure causes visible in a unified workspace.",
    validationQuestions: ["Can a user explain why a job failed and safely retry it?", "Can they distinguish a queued job from a stalled one?"],
    relatedServices: ["web-development", "software-architecture", "cloud-devops"],
    image: { kind: "native", alt: "Illustrative asset-processing console showing input, validation and export stages, sample job states and a retry action.", aspectRatio: 2.15 },
  },
  {
    id: "delivery-flow-workspace", title: "Delivery flow workspace", category: "operations", featured: true,
    summary: "Show where work waits and give blocked items enough context to act.",
    heading: "Understand where delivery work waits",
    scenario: "A busy team may have little visibility into blocked work and long review queues.",
    proposedDirection: "The concept makes work stages and waiting time visible while preserving context about scope, dependencies and rework.",
    validationQuestions: ["Which stage accumulates waiting work?", "Does a process change improve flow without moving problems elsewhere?"],
    relatedServices: ["business-analysis", "cloud-devops"],
    image: { kind: "native", alt: "Illustrative delivery board with sample work in planned, in-progress and review stages, and a blocker with dependency context.", aspectRatio: 2.15 },
  },
  {
    "id": "knowledge-library",
    "title": "Knowledge library",
    "category": "web",
    "featured": false,
    "summary": "Find shared guidance and understand which source to use.",
    "heading": "Give shared knowledge a clear place to live",
    "scenario": "Teams collect guidance across disconnected documents, making it difficult to find the relevant explanation and understand its scope.",
    "proposedDirection": "The concept combines topic browsing, focused search and a reading pane that keeps source context beside the guidance.",
    "validationQuestions": [
      "Can a reader find guidance using the language of their task?",
      "Can they tell which source applies to their situation?"
    ],
    "relatedServices": [
      "web-development",
      "ux-ui-design",
      "knowledge-transfer"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative knowledge library with topic navigation, sample search results and a source-aware reading pane.",
      "aspectRatio": 2.15
    }
  },
  {
    "id": "service-configurator",
    "title": "Service configurator",
    "category": "web",
    "featured": false,
    "summary": "Explore compatible options and review a configuration before submitting it.",
    "heading": "Make product choices understandable before submission",
    "scenario": "Users configuring a software service need to understand how their choices fit together before they send a request.",
    "proposedDirection": "The concept pairs selectable modules with a live configuration outline, explaining dependencies and preserving choices while users explore alternatives.",
    "validationQuestions": [
      "Can a user explain why an option requires another module?",
      "Can they revise a choice without losing the rest of the configuration?"
    ],
    "relatedServices": [
      "web-development",
      "product-design"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative service configurator with sample modules, a dependency map and a configuration summary.",
      "aspectRatio": 2.15
    }
  },
  {
    "id": "offline-field-notes",
    "title": "Offline field notes",
    "category": "mobile",
    "featured": false,
    "summary": "Capture observations and understand what is stored locally or ready to sync.",
    "heading": "Keep captured notes understandable across connection changes",
    "scenario": "People recording observations on the move may lose connectivity or leave a note unfinished when interrupted.",
    "proposedDirection": "The concept provides a focused capture canvas, a local draft state and an explicit comparison when a shared note conflicts with a local edit.",
    "validationQuestions": [
      "Can a user tell whether a note is stored locally or shared?",
      "Can they resolve a conflicting edit without discarding an observation?"
    ],
    "relatedServices": [
      "mobile-development",
      "ux-ui-design",
      "qa-automated-testing"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative device-free note capture canvas with a sample observation, local draft indicator and sync comparison.",
      "aspectRatio": 2.15
    }
  },
  {
    "id": "mobile-access-pass",
    "title": "Mobile access pass",
    "category": "mobile",
    "featured": false,
    "summary": "Present a workspace invitation and understand the scope of access it grants.",
    "heading": "Make an invitation and its permissions easy to inspect",
    "scenario": "People joining a shared software workspace need to check the destination and permissions before accepting an invitation on mobile.",
    "proposedDirection": "The concept places the invitation beside a readable access pass, showing the workspace, role and controls for leaving the shared space.",
    "validationQuestions": [
      "Can a recipient identify the workspace and role before joining?",
      "Can they find how to leave the workspace when access is no longer needed?"
    ],
    "relatedServices": [
      "mobile-development",
      "product-design"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative device-free workspace invitation and access pass with a sample account and clearly listed permissions.",
      "aspectRatio": 2.15
    }
  },
  {
    "id": "data-comparison-desk",
    "title": "Data comparison desk",
    "category": "desktop",
    "featured": false,
    "summary": "Compare local datasets and inspect differences before choosing what to keep.",
    "heading": "Give local data differences a readable structure",
    "scenario": "People comparing local data files need to understand changed fields without losing the relationship between records.",
    "proposedDirection": "The concept aligns records in a split comparison, highlights field differences and provides a separate preview of the chosen values before export.",
    "validationQuestions": [
      "Can a user distinguish a missing value from a changed value?",
      "Can they inspect the chosen values before writing an export?"
    ],
    "relatedServices": [
      "desktop-development",
      "ux-ui-design",
      "qa-automated-testing"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative desktop data comparison with aligned sample records, highlighted differences and a merged-value preview.",
      "aspectRatio": 2.15
    }
  },
  {
    "id": "local-environment-manager",
    "title": "Local environment manager",
    "category": "desktop",
    "featured": false,
    "summary": "Inspect local development environments and choose which settings to apply.",
    "heading": "Keep local environment choices explicit",
    "scenario": "Developers working across software projects need to understand which local settings belong to each environment before switching context.",
    "proposedDirection": "The concept combines an environment map with grouped settings and an explicit change preview, keeping project-specific configuration separate from shared defaults.",
    "validationQuestions": [
      "Can a developer identify which settings are shared across environments?",
      "Can they review the effect of a switch before applying it?"
    ],
    "relatedServices": [
      "desktop-development",
      "software-architecture",
      "cloud-devops"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative local environment manager with a sample project map, grouped settings and a configuration change preview.",
      "aspectRatio": 2.15
    }
  },
  {
    "id": "team-capacity-planner",
    "title": "Team capacity planner",
    "category": "operations",
    "featured": false,
    "summary": "Explore work allocation while keeping availability and competing commitments visible.",
    "heading": "Make allocation choices visible before committing",
    "scenario": "Teams planning shared work need to see how proposed assignments overlap with existing commitments and available capacity.",
    "proposedDirection": "The concept uses an allocation matrix and an unassigned work tray, allowing planners to compare draft arrangements before sharing a plan.",
    "validationQuestions": [
      "Can a planner identify overlapping commitments for a team?",
      "Can they distinguish a draft assignment from an agreed commitment?"
    ],
    "relatedServices": [
      "business-analysis",
      "web-development",
      "product-design"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative team allocation matrix with sample work blocks, an unassigned work tray and a draft plan summary.",
      "aspectRatio": 2.15
    }
  },
  {
    "id": "system-dependency-map",
    "title": "System dependency map",
    "category": "operations",
    "featured": false,
    "summary": "Trace service relationships and inspect the context around a proposed system change.",
    "heading": "Keep system dependencies close to change decisions",
    "scenario": "People maintaining connected software need to understand which services depend on one another before planning a change.",
    "proposedDirection": "The concept pairs a navigable service graph with relationship details and a change-scope overlay, keeping assumptions visible for review.",
    "validationQuestions": [
      "Can an operator trace the dependants of a selected service?",
      "Can they distinguish a confirmed relationship from one that needs review?"
    ],
    "relatedServices": [
      "software-architecture",
      "cloud-devops",
      "legacy-modernization"
    ],
    "image": {
      "kind": "native",
      "alt": "Illustrative system dependency graph with sample services, a selected relationship and a proposed change-scope panel.",
      "aspectRatio": 2.15
    }
  },
] as const satisfies readonly WorkConcept[];

export type WorkConceptId = (typeof workConcepts)[number]["id"];

type WorkPageContent = {
  hero: { eyebrow: string; heading: string; introduction: string; note: string };
  collectionHeading: string;
  filterLabel: string;
  featuredNote: string;
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
    eyebrow: "WORK", heading: pages.work.heading,
    introduction: "Explore illustrative product scenarios across web, mobile, desktop and operational software. Each concept shows how we turn a workflow problem into a product direction.",
    note: "These are illustrative concepts, not completed client engagements or measured client results.",
  },
  collectionHeading: "Work", filterLabel: "Filter concepts by category",
  featuredNote: "Featured selection. Use the category filters to see all 14 concepts.",
  showing: "Showing", singular: "concept", plural: "concepts",
  empty: "No concepts match this filter. Choose another category.", reset: "Show featured concepts",
  loading: "Loading concepts…", error: "We could not load this content. Please try again.", retry: "Try again",
  view: "View concept", scenario: "The scenario", direction: "Proposed direction",
  questions: "Questions to validate", services: "Relevant services", discuss: "Discuss a similar challenge",
  disclaimer: "No delivery metrics or client outcomes are asserted for this concept.",
  cta: { heading: "Have a similar challenge?", body: "Bring us the workflow, product idea or system you want to improve.", label: "Discuss your project", href: "/contact" },
} as const satisfies WorkPageContent;
