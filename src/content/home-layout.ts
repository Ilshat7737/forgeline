// Additional labels from Concept 02. Existing Home and service copy stays verbatim.
export const homeLayout = {
  cubesLabel: "A cluster of lavender cubes",
  scatterLabel: "A composition of lavender, plum and coral cubes",
  slabsLabel: "Three stacked plum and coral slabs",
  ideasNote: "Ideas into solutions",
  technologies: "Technologies we work with",
  technologyNames: ["React", "Node.js", ".NET", "Python", "AWS"],
  status: {
    label: "Illustrative product in development: design complete, development in progress, 62% overall.",
    title: "Product in development",
    steps: ["Design", "Development", "Testing", "Launch"],
    progress: "62%",
  },
  scroll: "Scroll on",
  aboutTiles: [
    { title: "New products", body: "From idea to launch and growth." },
    { title: "Modern systems", body: "Modernization and scaling." },
    { title: "Strong teams", body: "Expertise for your challenge." },
  ],
  servicesSupporting: "Full-cycle development and support for digital products.",
  processLabel: "HOW WE WORK",
  processSupporting: "A clear process, from the first conversation to the start of development.",
  insightsSupporting: "Practical perspectives on development, products and technology.",
  article: "ARTICLE",
  mobilePreviewLabel: "Illustrative mobile task list with sample recurring activities.",
  workSupporting: "Illustrative concepts exploring our approach to digital products.",
} as const satisfies {
  cubesLabel: string; scatterLabel: string; slabsLabel: string; ideasNote: string; technologies: string; technologyNames: readonly string[];
  status: { label: string; title: string; steps: readonly string[]; progress: string };
  scroll: string; aboutTiles: readonly { title: string; body: string }[];
  servicesSupporting: string; processLabel: string; processSupporting: string;
  insightsSupporting: string; article: string; workSupporting: string; mobilePreviewLabel: string;
};
