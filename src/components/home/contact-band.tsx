import { EnquiryForm } from "@/components/contact/enquiry-form";
import { Card } from "@/components/ui/card";
import { home } from "@/content/home";
import { legalDocuments } from "@/content/legal";
import { isLegalDocumentPublished } from "@/lib/legal";
import { CubeArtwork } from "./studio-artwork";
export function ContactBand() {
  return <Card as="section" surface="lavender" className="home-contact" aria-labelledby="contact-heading" shadow="soft">
    <div className="home-contact__copy"><p className="section-heading__label">{home.contact.label}</p><h2 id="contact-heading">{home.contact.heading}</h2><p>{home.contact.body}</p><CubeArtwork variant="scatter" /></div>
    <div className="home-contact__form"><EnquiryForm compact defaults={{ services: [], project: "" }} privacyHref={isLegalDocumentPublished(legalDocuments.privacyPolicy) ? legalDocuments.privacyPolicy.path : undefined} /></div>
  </Card>;
}
