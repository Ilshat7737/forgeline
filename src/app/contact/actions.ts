"use server";

import { contactSchema } from "@/lib/contact-schema";
import { EnquiryNotConfiguredError } from "@/lib/enquiry/errors";
import { getEnquiryAdapter } from "@/lib/enquiry/get-enquiry-adapter";
import type { EnquiryFieldErrors, EnquiryResult } from "@/lib/enquiry/types";
import type { ContactFieldName } from "@/content/contact";

export async function submitProjectEnquiry(input: unknown): Promise<EnquiryResult> {
  // A honeypot submission never reaches delivery or discloses its rejection reason.
  if (input && typeof input === "object" && "website" in input && input.website) {
    return { status: "rejected" };
  }
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: EnquiryFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactFieldName | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    // Malformed top-level payloads have no field path.
    if (!Object.keys(fieldErrors).length) return { status: "error", code: "submission-failed" };
    return { status: "invalid", fieldErrors };
  }
  try {
    const result = await getEnquiryAdapter()(parsed.data);
    return { status: "success", enquiryId: result.enquiryId, development: process.env.NODE_ENV === "development" };
  } catch (error) {
    return { status: "error", code: error instanceof EnquiryNotConfiguredError ? "not-configured" : "submission-failed" };
  }
}
