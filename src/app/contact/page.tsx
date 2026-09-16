import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { contactPage } from "@/content/contact";
import { Card } from "@/components/ui/card";
import { PillLabel } from "@/components/ui/pill-label";
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
    <div className="site-container contact-bento" data-surface="canvas" data-reveal-group>
      <Card as="section" surface="dark" shadow="soft" className="contact-hero" aria-labelledby="contact-heading">
        <PillLabel>{contactPage.hero.eyebrow}</PillLabel>
        <h1 id="contact-heading">{contactPage.hero.heading}</h1>
        <p className="contact-hero__intro">{contactPage.hero.introduction}</p>
      </Card>
      <Card surface="lavender" padding="lg" shadow="soft" className="contact-panel">
        <ContactSupport />
        <Card surface="white" padding="lg" shadow="soft" className="contact-form-region">
          <ProjectEnquiryForm
            defaults={defaults}
            privacyHref={isLegalDocumentPublished(legalDocuments.privacyPolicy) ? legalDocuments.privacyPolicy.path : undefined}
          />
        </Card>
      </Card>
    </div>
  );
}
