import { home } from "./home";
import type { NavigationLink } from "./navigation";
import { site } from "./site";

type Statement = { heading: string; body: string };
type AboutContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; heading: string; introduction: string };
  purpose: Statement;
  values: readonly Statement[];
  team: typeof home.about;
  people: Statement;
  cta: Statement & { link: NavigationLink };
};

const introduction = "We help businesses turn complex requirements into software people can use and teams can maintain.";

export const aboutPage = {
  title: `About Us | ${site.name}`,
  description: introduction,
  hero: {
    eyebrow: "ABOUT",
    heading: "A team that connects product thinking with engineering.",
    introduction,
  },
  purpose: {
    heading: "Why we do this",
    body: "A useful product needs more than a feature list. It needs a clear problem, considered trade-offs and people who take responsibility for what happens after release. That is the kind of work we want to do.",
  },
  values: [
    {
      heading: "Clarity before activity",
      body: "We ask questions, document decisions and explain the consequences of technical choices. Progress should be understandable to the people responsible for the business.",
    },
    {
      heading: "Ownership through delivery",
      body: "We consider implementation, testing, deployment and operation together. The goal is working software with a team that understands how to change it.",
    },
    {
      heading: "A stronger team at the end",
      body: "We share context and knowledge throughout the engagement. Your team should gain capability as the product develops.",
    },
  ],
  team: home.about,
  people: {
    heading: "The people behind the work",
    body: "Product, analysis, design, engineering and quality work together around the same outcome.",
  },
  cta: {
    heading: "Start with a conversation",
    body: "Tell us what your team is working through. We will be direct about where we can help and what we need to understand first.",
    link: { label: "Meet your delivery partner", href: "/contact" },
  },
} as const satisfies AboutContent;
