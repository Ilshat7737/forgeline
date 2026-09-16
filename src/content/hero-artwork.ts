type HeroArtworkLabels = Record<"services" | "work" | "about" | "contact", string>;

export const heroArtworkLabels = {
  services: "An isometric selection tray of complementary modules, with a coral module lifted into place.",
  work: "An isometric desktop workspace and a smaller mobile screen together on a shared platform.",
  about: "Four connected lavender nodes surround one coral centre, representing a team working towards a shared outcome.",
  contact: "Two small overlapping isometric message cards, ready for a conversation.",
} as const satisfies HeroArtworkLabels;
