import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — software development and digital products`,
    short_name: site.name,
    description: pages.home.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0f7",
    theme_color: "#f5f0f7",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
