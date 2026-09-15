import type { Metadata } from "next";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: pages.contact.title,
  description: pages.contact.description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <h1 className="site-container page-heading text-display-lg">{pages.contact.heading}</h1>;
}
