import type { NavigationLink } from "./navigation";
import { navigation } from "./navigation";
import { pages } from "./pages";

export type ServiceGroupId = "product" | "engineering" | "systems" | "team";

type ServiceBase = {
  slug: string;
  title: string;
  shortDescription: string;
  group: ServiceGroupId;
};

export type Service = ServiceBase & (
  | { homeOrder: number; homeTitle: string; homeDescription: string }
  | { homeOrder: null; homeTitle: null; homeDescription: null }
);

export const services = [
  { slug: "business-analysis", title: "Business analysis", shortDescription: "Turn business complexity into clear requirements.", group: "product", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "discovery-workshops", title: "Discovery workshops", shortDescription: "Agree on the problem before committing to the build.", group: "product", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "product-strategy", title: "Product strategy", shortDescription: "Choose a direction your team can build on.", group: "product", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "product-design", title: "Product design", shortDescription: "Design the product behind the screens.", group: "product", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "ux-ui-design", title: "UX/UI design", shortDescription: "Make the next action obvious.", group: "product", homeOrder: 4, homeTitle: "UX/UI and product design", homeDescription: "Clear journeys, consistent interfaces and product decisions grounded in user needs." },
  { slug: "web-development", title: "Web development", shortDescription: "Build web products that support real work.", group: "engineering", homeOrder: 1, homeTitle: "Web development", homeDescription: "Customer-facing platforms and internal tools built around real workflows." },
  { slug: "mobile-development", title: "Mobile development", shortDescription: "Make the important moments work on mobile.", group: "engineering", homeOrder: 2, homeTitle: "Mobile applications", homeDescription: "Focused mobile experiences designed for devices, interruptions and everyday use." },
  { slug: "desktop-development", title: "Desktop development", shortDescription: "Give specialist workflows a dedicated home.", group: "engineering", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "software-architecture", title: "Software architecture", shortDescription: "Make the structure serve the product.", group: "engineering", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "qa-automated-testing", title: "QA and automated testing", shortDescription: "Protect the workflows your users rely on.", group: "engineering", homeOrder: 5, homeTitle: "QA and automated testing", homeDescription: "Confidence in the product paths your customers and operations depend on." },
  { slug: "ai-automation", title: "AI development and automation", shortDescription: "Put AI to work on a clearly defined problem.", group: "systems", homeOrder: 3, homeTitle: "AI and automation", homeDescription: "Useful AI capabilities and automated workflows with evaluation and human oversight designed in." },
  { slug: "generative-ai", title: "Generative AI", shortDescription: "Create useful AI experiences with clear boundaries.", group: "systems", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "cloud-solutions", title: "Cloud solutions", shortDescription: "Make cloud decisions around the product you run.", group: "systems", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "cloud-devops", title: "Cloud engineering and DevOps", shortDescription: "Make delivery and operations part of the same system.", group: "systems", homeOrder: 6, homeTitle: "Cloud and DevOps", homeDescription: "Repeatable releases, observable systems and environments your team can operate." },
  { slug: "legacy-modernization", title: "Legacy application modernization", shortDescription: "Move forward without losing what already works.", group: "systems", homeOrder: 7, homeTitle: "Software modernization", homeDescription: "A controlled route away from the constraints of legacy systems." },
  { slug: "team-augmentation", title: "Team augmentation", shortDescription: "Add the skills your team needs to move forward.", group: "team", homeOrder: 8, homeTitle: "Team augmentation", homeDescription: "Additional expertise integrated into your priorities, tools and delivery practices." },
  { slug: "client-enablement", title: "Client enablement", shortDescription: "Build the capability to keep moving without us.", group: "team", homeOrder: null, homeTitle: null, homeDescription: null },
  { slug: "knowledge-transfer", title: "Knowledge transfer", shortDescription: "Keep the knowledge with the people who need it.", group: "team", homeOrder: null, homeTitle: null, homeDescription: null },
] as const satisfies readonly Service[];

export const homeServices = services
  .filter((service) => service.homeOrder !== null)
  .sort((a, b) => a.homeOrder - b.homeOrder);

export type ServiceGroupContent = {
  id: ServiceGroupId;
  number: string;
  title: string;
  introduction: string;
};

export const serviceGroups = [
  { id: "product", number: "01", title: "Product strategy and design", introduction: "Turn uncertain requirements into a direction your team can evaluate and build." },
  { id: "engineering", number: "02", title: "Software engineering", introduction: "Build complete workflows with the frontend, backend and quality practices considered together." },
  { id: "systems", number: "03", title: "AI, cloud and modernization", introduction: "Introduce new capabilities while keeping the system understandable and operable." },
  { id: "team", number: "04", title: "People and ownership", introduction: "Build capability inside your organization as the product moves forward." },
] as const satisfies readonly ServiceGroupContent[];

export const serviceSituations = [
  { id: "build", title: "Build a product", body: "Connect discovery, design, engineering and launch around a clear first outcome.", groups: ["product", "engineering"] },
  { id: "improve", title: "Improve an existing system", body: "Remove the constraints affecting delivery, reliability or user experience.", groups: ["engineering", "systems"] },
  { id: "strengthen", title: "Strengthen your team", body: "Add focused expertise while keeping priorities and product ownership inside your organization.", groups: ["team"] },
] as const satisfies readonly { id: string; title: string; body: string; groups: readonly ServiceGroupId[] }[];

export type ServiceSituationId = (typeof serviceSituations)[number]["id"];

type ServicesPageContent = {
  hero: { eyebrow: string; heading: string; introduction: string; cta: NavigationLink };
  selector: { heading: string; relevant: string };
  discuss: string;
  technology: { heading: string; body: string; names: readonly string[] };
  principles: readonly { title: string; body: string }[];
  cta: { heading: string; body: string; link: NavigationLink };
};

export const servicesPage = {
  hero: {
    eyebrow: "SERVICES",
    heading: pages.services.heading,
    introduction: "Bring us a new idea, a delivery challenge or a system that needs to change. Start with the problem; we will help define the right combination of skills.",
    cta: navigation.contact,
  },
  selector: { heading: "Where are you now?", relevant: "Relevant to your situation" },
  discuss: "Discuss this service",
  technology: {
    heading: "Tools follow the product.",
    body: "We choose technologies around the product, the system you already operate and the skills your team needs to retain.",
    names: ["React", "React Native", "Node.js", ".NET", "Python", "Go", "MongoDB", "AWS"],
  },
  principles: [
    { title: "Clarity before activity", body: "Make assumptions, decisions and dependencies visible." },
    { title: "Complete increments", body: "Review working behavior rather than disconnected task output." },
    { title: "Ownership after release", body: "Include testing, deployment, diagnosis and knowledge transfer in delivery." },
  ],
  cta: {
    heading: "Not sure where to start?",
    body: "Describe the outcome you need and the constraints you already know. We can begin with a focused assessment.",
    link: { label: "Tell us about the challenge", href: "/contact" },
  },
} as const satisfies ServicesPageContent;
