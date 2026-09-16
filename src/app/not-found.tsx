import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
import { notFound } from "@/content/pages";
import "@/styles/not-found.css";

export const metadata: Metadata = {
  title: notFound.title,
  description: notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="site-container not-found" data-surface="canvas" data-reveal-group>
      <Card surface="white" padding="lg" shadow="soft" className="not-found__card">
        <PillLabel variant="tag">{notFound.code}</PillLabel>
        <h1>{notFound.heading}</h1>
        <p>{notFound.description}</p>
        <div className="not-found__actions">
          <ButtonLink href={notFound.primary.href} variant="primary-dark">{notFound.primary.label}</ButtonLink>
          <ButtonLink href={notFound.secondary.href} variant="quiet">{notFound.secondary.label}</ButtonLink>
        </div>
      </Card>
    </div>
  );
}
