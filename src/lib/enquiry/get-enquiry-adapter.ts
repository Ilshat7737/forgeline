import { acknowledgeAdapter } from "./acknowledge-adapter";
import type { SubmitProjectEnquiry } from "./types";

/**
 * The site runs without a backend, so every enquiry is acknowledged and none is delivered.
 * TODO: return the confirmed provider here, with server-side rate limiting, once one exists —
 * until then `docs/production-checklist.md` records that submissions are simulated.
 */
export function getEnquiryAdapter(): SubmitProjectEnquiry {
  return acknowledgeAdapter;
}
