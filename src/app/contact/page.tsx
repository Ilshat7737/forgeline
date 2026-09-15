import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { contactPage } from "@/content/contact";
import { PageHero } from "@/components/layout/page-hero";
import { ContactSupport } from "@/components/contact/contact-support";
import { ProjectEnquiryForm } from "@/components/contact/project-enquiry-form";
import { resolveContactQuery, type ContactSearchParams } from "@/lib/contact-query";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: pages.contact.title,
  description: pages.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: pages.contact.title, description: pages.contact.description, url: "/contact", type: "website" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<ContactSearchParams> }) {
  const defaults = resolveContactQuery(await searchParams);
  return (
    <>
      <PageHero {...contactPage.hero} />
      <div className="contact-area" data-surface="light">
        <div className="site-container contact-layout">
          <ContactSupport />
          <div className="contact-form-region"><ProjectEnquiryForm defaults={defaults} /></div>
        </div>
      </div>
    </>
  );
}
