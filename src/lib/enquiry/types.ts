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
  | { status: "success"; enquiryId: string }
  | { status: "invalid"; fieldErrors: EnquiryFieldErrors }
  /** Only a transport failure reaches the visitor: the server itself always acknowledges. */
  | { status: "error"; code: "submission-failed" }
  | { status: "rejected" };
