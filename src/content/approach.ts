import { home } from "./home";
import { homeLayout } from "./home-layout";
import { servicesPage } from "./services";
import { site } from "./site";

type ApproachContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; heading: string; introduction: string };
  process: { heading: string; steps: typeof home.process.steps };
  delivery: { heading: string; principles: typeof servicesPage.principles };
  contact: typeof home.contact;
};

export const approachPage = {
  title: `Our Approach | ${site.name}`,
  description: homeLayout.processSupporting,
  hero: {
    eyebrow: "HOW WE WORK",
    heading: "How we work.",
    introduction: homeLayout.processSupporting,
  },
  process: { heading: "How we begin", steps: home.process.steps },
  delivery: { heading: "Delivery principles", principles: servicesPage.principles },
  contact: home.contact,
} as const satisfies ApproachContent;
