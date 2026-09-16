import { randomUUID } from "node:crypto";
import type { SubmitProjectEnquiry } from "./types";

/** Round trip that keeps the pending state visible, the way a real provider call would. */
const SIMULATED_LATENCY_MS = 700;

/**
 * Acknowledges every enquiry without delivering it anywhere.
 *
 * The owner asked for this behaviour while the site runs without a backend: the visitor always sees the
 * confirmation. Nothing is stored, logged or forwarded, so the submitted details leave no trace on the server.
 * Replace this adapter with a real provider before the site is expected to produce leads — see
 * `docs/production-checklist.md`.
 */
export const acknowledgeAdapter: SubmitProjectEnquiry = async () => {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  return { enquiryId: `enq-${randomUUID()}` };
};
