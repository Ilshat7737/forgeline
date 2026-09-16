import { afterEach, describe, expect, it, vi } from "vitest";
import { acknowledgeAdapter } from "./acknowledge-adapter";
import { getEnquiryAdapter } from "./get-enquiry-adapter";
import type { ProjectEnquiry } from "./types";

const enquiry: ProjectEnquiry = {
  name: "Alex Morgan",
  email: "alex@example.com",
  services: [],
  project: "We need a customer portal that replaces a spreadsheet workflow.",
  ndaRequested: false,
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("enquiry adapter", () => {
  it("acknowledges the enquiry in production, the way the owner asked", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { enquiryId } = await getEnquiryAdapter()(enquiry);
    expect(enquiryId).toMatch(/^enq-[0-9a-f-]{36}$/);
  });

  it("behaves identically outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    await expect(getEnquiryAdapter()(enquiry)).resolves.toMatchObject({ enquiryId: expect.stringMatching(/^enq-/) });
  });

  it("uses the acknowledging adapter, which never rejects", async () => {
    expect(getEnquiryAdapter()).toBe(acknowledgeAdapter);
    await expect(acknowledgeAdapter(enquiry)).resolves.toBeTruthy();
  });

  it("keeps the reference free of the visitor's details", async () => {
    const { enquiryId } = await acknowledgeAdapter(enquiry);
    expect(enquiryId).not.toContain(enquiry.email);
    expect(enquiryId).not.toContain(enquiry.name);
  });
});
