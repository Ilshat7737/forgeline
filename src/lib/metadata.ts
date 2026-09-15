import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataContent = { title: string; description: string };

// The root opengraph-image.tsx is only attached automatically where no page-level openGraph overrides it.
const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — software development and digital products` };

// Page-level openGraph replaces the layout's object, so every route builds the complete set here.
export function pageMetadata({ title, description }: PageMetadataContent, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, locale: "en", type: "website", images: [shareImage] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  };
}
