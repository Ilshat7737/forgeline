import { site } from "./site";

type PageContent = {
  heading: string;
  title: string;
  description: string;
};

export const pages = {
  home: {
    heading: "WE BUILD SOFTWARE. YOU MOVE YOUR BUSINESS FORWARD.",
    title: `Software Development & Digital Products | ${site.name}`,
    description:
      "Product strategy, design and software engineering for teams building new products or improving existing systems.",
  },
  services: {
    heading: "CHOOSE THE SUPPORT YOUR PRODUCT NEEDS.",
    title: `Software Development Services | ${site.name}`,
    description:
      "Explore product design, web, mobile, AI, cloud, modernization and team augmentation services.",
  },
  work: {
    heading: "PRODUCT PROBLEMS. CLEAR DIRECTIONS.",
    title: `Product Concepts & Software Work | ${site.name}`,
    description:
      `Explore illustrative web, mobile, desktop and operational product concepts from ${site.name}.`,
  },
  contact: {
    heading: "WHAT DO YOU WANT TO CREATE OR IMPROVE?",
    title: `Discuss Your Software Project | ${site.name}`,
    description:
      "Tell us what you want to create or improve and start a practical software project conversation.",
  },
} as const satisfies Record<string, PageContent>;

export const notFound = {
  heading: "This page is not here.",
  description: "The link may have changed, or the page may no longer be available.",
  title: `Page Not Found | ${site.name}`,
  primary: { label: "Back to home", href: "/" },
  secondary: { label: "Explore services", href: "/services" },
} as const;
