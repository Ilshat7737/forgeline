import type { Metadata } from "next";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: pages.work.title,
  description: pages.work.description,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <h1 className="site-container page-heading text-display-lg">{pages.work.heading}</h1>;
}
