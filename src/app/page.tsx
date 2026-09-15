import type { Metadata } from "next";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: pages.home.title,
  description: pages.home.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <h1 className="site-container page-heading text-display-xl">{pages.home.heading}</h1>;
}
