import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentPage } from "@/components/legal/legal-document";
import { legalDocuments } from "@/content/legal";
import { isLegalPageAvailable, legalPageMetadata } from "@/lib/legal";
import "@/styles/legal.css";

const document = legalDocuments.websiteTerms;

export const metadata: Metadata = legalPageMetadata(document);

export default function WebsiteTermsPage() {
  if (!isLegalPageAvailable(document)) notFound();
  return <LegalDocumentPage document={document} />;
}
