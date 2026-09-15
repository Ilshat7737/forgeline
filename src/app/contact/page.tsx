import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { contactPage } from "@/content/contact";
import { PageHero } from "@/components/layout/page-hero";
import { ContactSupport } from "@/components/contact/contact-support";
import { ProjectEnquiryForm } from "@/components/contact/project-enquiry-form";
import { resolveContactQuery, type ContactSearchParams } from "@/lib/contact-query";
import { legalDocuments } from "@/content/legal";
import { isLegalDocumentPublished } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";
import "@/styles/contact.css";

export const metadata: Metadata = pageMetadata(pages.contact, "/contact");

export default async function ContactPage({ searchParams }: { searchParams: Promise<ContactSearchParams> }) {
  const defaults = resolveContactQuery(await searchParams);
  return (
    <>
      <PageHero {...contactPage.hero} />
      <div className="contact-area" data-surface="light">
        <div className="site-container contact-layout">
          <ContactSupport />
          <div className="contact-form-region">
            <ProjectEnquiryForm
              defaults={defaults}
              privacyHref={isLegalDocumentPublished(legalDocuments.privacyPolicy) ? legalDocuments.privacyPolicy.path : undefined}
            />
          </div>
        </div>
      </div>
    </>
  );
}
