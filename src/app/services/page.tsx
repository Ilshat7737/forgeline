import type { Metadata } from "next";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: pages.services.title,
  description: pages.services.description,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <h1 className="site-container page-heading text-display-lg">{pages.services.heading}</h1>;
}
