import type { ContactDefaults } from "@/lib/contact-query";
import { EnquiryForm } from "./enquiry-form";

/** The full form retains query suggestions and the legal publication gate. */
export function ProjectEnquiryForm({ defaults, privacyHref }: { defaults: ContactDefaults; privacyHref?: string }) {
  return <EnquiryForm defaults={defaults} privacyHref={privacyHref} />;
}
