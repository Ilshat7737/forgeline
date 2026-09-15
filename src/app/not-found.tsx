import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { notFound } from "@/content/pages";

export const metadata: Metadata = {
  title: notFound.title,
  description: notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="site-container py-section">
      <h1 className="font-display text-display-lg font-bold uppercase">{notFound.heading}</h1>
      <p className="mt-4 max-w-measure text-body-lg">{notFound.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <ButtonLink href={notFound.primary.href}>{notFound.primary.label}</ButtonLink>
        <ButtonLink href={notFound.secondary.href} variant="secondary">{notFound.secondary.label}</ButtonLink>
      </div>
    </div>
  );
}
