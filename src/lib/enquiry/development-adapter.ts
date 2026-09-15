import { randomUUID } from "node:crypto";
import { EnquiryNotConfiguredError } from "./errors";
import type { SubmitProjectEnquiry } from "./types";

export const developmentAdapter: SubmitProjectEnquiry = async () => {
  if (process.env.NODE_ENV === "production") throw new EnquiryNotConfiguredError();
  return { enquiryId: `dev-${randomUUID()}` };
};
