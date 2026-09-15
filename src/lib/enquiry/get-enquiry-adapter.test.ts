import { afterEach, describe, expect, it, vi } from "vitest";
import { developmentAdapter } from "./development-adapter";
import { EnquiryNotConfiguredError } from "./errors";
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

describe("enquiry adapter selection", () => {
  it("fails closed in production when no provider is configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(getEnquiryAdapter()(enquiry)).rejects.toBeInstanceOf(EnquiryNotConfiguredError);
  });

  it("never lets the development adapter report success in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(developmentAdapter(enquiry)).rejects.toBeInstanceOf(EnquiryNotConfiguredError);
  });

  it("returns a non-sensitive development id outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { enquiryId } = await getEnquiryAdapter()(enquiry);
    expect(enquiryId).toMatch(/^dev-[0-9a-f-]{36}$/);
    expect(enquiryId).not.toContain(enquiry.email);
  });
});
