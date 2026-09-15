import { EnquiryNotConfiguredError } from "./errors";
import type { SubmitProjectEnquiry } from "./types";

export function getEnquiryAdapter(): SubmitProjectEnquiry {
  // TODO: Connect the confirmed provider here and add server-side rate limiting
  // before calling it. V1 has no production provider or configuration contract.
  if (process.env.NODE_ENV !== "production") {
    return async (enquiry) => {
      const { developmentAdapter } = await import("./development-adapter");
      return developmentAdapter(enquiry);
    };
  }
  return async () => { throw new EnquiryNotConfiguredError(); };
}
