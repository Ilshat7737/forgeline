import { describe, expect, it } from "vitest";
import { nextOpenService } from "./accordion";

describe("single-open service state", () => {
  const slugs = ["web-development", "mobile-development"];
  it("opens a requested service", () => {
    expect(nextOpenService(slugs[0], slugs[1], slugs)).toBe(slugs[1]);
  });
  it("preserves the open service for repeated or unknown requests", () => {
    expect(nextOpenService(slugs[0], slugs[0], slugs)).toBe(slugs[0]);
    expect(nextOpenService(slugs[0], "missing-service", slugs)).toBe(slugs[0]);
  });
});
