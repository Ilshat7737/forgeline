import type { ContactFieldName } from "@/content/contact";

export type ProjectEnquiry = {
  name: string;
  email: string;
  company?: string;
  services: string[];
  project: string;
  timing?: string;
  ndaRequested: boolean;
};

export type SubmitProjectEnquiry = (enquiry: ProjectEnquiry) => Promise<{ enquiryId: string }>;
export type EnquiryFieldErrors = Partial<Record<ContactFieldName, string>>;
export type EnquiryResult =
  | { status: "success"; enquiryId: string; development: boolean }
  | { status: "invalid"; fieldErrors: EnquiryFieldErrors }
  | { status: "error"; code: "not-configured" | "submission-failed" }
  | { status: "rejected" };
