import type { NavigationLink } from "./navigation";
import { navigation } from "./navigation";

type EditorialEntry = { title: string; summary: string };
type FeaturedConcept = EditorialEntry & {
  id: "financial-workspace" | "everyday-mobile-service";
  type: string;
  href: string;
};
type HomeContent = {
  hero: { eyebrow: string; lines: readonly [string, string, string]; supporting: string; primary: NavigationLink; secondary: NavigationLink; technologies: string; note: readonly string[] };
  about: { label: string; heading: string; body: string; note: string };
  services: { label: string; heading: string; discuss: string; expand: string; collapse: string; all: NavigationLink };
  process: { heading: string; steps: readonly { title: string; body: string }[] };
  insights: { label: string; heading: string; status: string; entries: readonly EditorialEntry[] };
  work: { label: string; heading: string; conceptLabel: "CONCEPT"; viewLabel: string; all: NavigationLink; concepts: readonly FeaturedConcept[] };
  contact: { label: string; heading: string; body: string; cta: NavigationLink };
};

export const home = {
  hero: {
    eyebrow: "SOFTWARE DEVELOPMENT & DIGITAL PRODUCTS",
    lines: ["WE BUILD SOFTWARE.", "YOU MOVE YOUR", "BUSINESS FORWARD."],
    supporting: "From the first product decision to development, launch and ongoing improvement.",
    primary: navigation.contact,
    secondary: { label: "Explore our work", href: "/work" },
    technologies: "React / Node.js / .NET / Python / AWS",
    note: ["PRODUCT", "ENGINEERING", "DELIVERY"],
  },
  about: {
    label: "ABOUT",
    heading: "YOUR CHALLENGE. OUR TEAM.",
    body: "Build a new product. Improve the system you already have. Add expertise where your team needs it. We work with you to understand the business problem, make technical choices visible and deliver software your team can own.",
    note: "PRODUCT THINKING / DESIGN / ENGINEERING / QUALITY",
  },
  services: {
    label: "SERVICES", heading: "FROM STRATEGY TO A STABLE RELEASE.",
    discuss: "Discuss this service", expand: "Expand details", collapse: "Collapse details",
    all: { label: "View all services", href: "/services" },
  },
  process: {
    heading: "HOW WE BEGIN.",
    steps: [
      { title: "FIRST CONVERSATION", body: "Tell us about your goals, users and current constraints." },
      { title: "UNDERSTAND THE PROBLEM", body: "We review the available evidence and identify the questions that need answers." },
      { title: "SCOPE AND PLAN", body: "We agree on the work, responsibilities and assumptions behind the estimate." },
      { title: "START DELIVERY", body: "We build the first useful increment and establish a clear rhythm for decisions and feedback." },
    ],
  },
  insights: {
    label: "PERSPECTIVES", heading: "IDEAS YOU CAN PUT TO WORK.", status: "RESOURCE IN PREPARATION",
    entries: [
      { title: "Launching an MVP: decide what to learn first", summary: "A practical starting point for choosing the first useful version of a product." },
      { title: "When your architecture needs to change", summary: "Recognize the constraints that justify investment before committing to a rewrite." },
    ],
  },
  work: {
    label: "SELECTED WORK", heading: "SOFTWARE IN CONTEXT.", conceptLabel: "CONCEPT", viewLabel: "View concept",
    all: { label: "View all work", href: "/work" },
    concepts: [
      { id: "financial-workspace", title: "Financial workspace", type: "Web platform", summary: "A clear view of balances, activity and available actions.", href: "/work#financial-workspace" },
      { id: "everyday-mobile-service", title: "Everyday mobile service", type: "Mobile product", summary: "A focused experience for recurring tasks and progress.", href: "/work#everyday-mobile-service" },
    ],
  },
  contact: {
    label: "START A CONVERSATION", heading: "WHAT SHOULD WE BUILD TOGETHER?",
    body: "Tell us what you want to create or improve. We will help you find a practical starting point.", cta: navigation.contact,
  },
} as const satisfies HomeContent;
