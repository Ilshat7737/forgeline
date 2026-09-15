type SiteContent = {
  name: string;
  footer: { tagline: string; description: string; backToTop: string };
  skipLink: string;
};

export const site = {
  name: "Forgeline",
  footer: {
    tagline: "Software built around your business.",
    description:
      "Product strategy, design and engineering for teams creating something new or improving what already works.",
    backToTop: "Back to top",
  },
  skipLink: "Skip to main content",
} as const satisfies SiteContent;

export function getCurrentYear(date: Date = new Date()): number {
  return date.getFullYear();
}

export function getCopyright(year: number = getCurrentYear()): string {
  return `© ${year} ${site.name}. All rights reserved.`;
}
