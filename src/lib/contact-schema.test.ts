import { describe, expect, it } from "vitest";
import { contactErrors } from "@/content/contact";
import { contactSchema, shortContactSchema } from "./contact-schema";

const valid = {
  name: "Alex Morgan",
  email: "alex@example.com",
  company: "",
  services: ["web-development"],
  project: "We need a customer portal that replaces a spreadsheet workflow.",
  timing: "",
  ndaRequested: false,
};

function errorFor(input: Record<string, unknown>, field: string) {
  const result = contactSchema.safeParse(input);
  expect(result.success).toBe(false);
  return result.error?.issues.find((issue) => issue.path[0] === field)?.message;
}

describe("contact schema", () => {
  it("accepts a valid enquiry and trims text fields", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Alex Morgan  ", email: " alex@example.com " });
    expect(result.success).toBe(true);
    expect(result.data).toMatchObject({ name: "Alex Morgan", email: "alex@example.com" });
  });

  it("accepts an enquiry without optional services, company or timing", () => {
    expect(contactSchema.safeParse({ ...valid, services: [], company: undefined, timing: undefined }).success).toBe(true);
  });

  it.each([
    ["missing", ""],
    ["whitespace only", "   "],
    ["too short", "A"],
    ["too long", "A".repeat(101)],
  ])("rejects a %s name", (_case, name) => {
    expect(errorFor({ ...valid, name }, "name")).toBe(contactErrors.name);
  });

  it.each([
    ["missing", ""],
    ["malformed", "alex@"],
    ["too long", `${"a".repeat(250)}@example.com`],
  ])("rejects a %s email", (_case, email) => {
    expect(errorFor({ ...valid, email }, "email")).toBe(contactErrors.email);
  });

  it.each([
    ["missing", ""],
    ["too short after trimming", "   too short   "],
    ["too long", "A".repeat(4001)],
  ])("rejects a %s project description", (_case, project) => {
    expect(errorFor({ ...valid, project }, "project")).toBe(contactErrors.project);
  });

  it("rejects unknown service options", () => {
    expect(errorFor({ ...valid, services: ["blockchain"] }, "services")).toBe(contactErrors.services);
  });
});

describe("short contact schema shared with the full form", () => {
  it("accepts only the three required fields and strips full-form properties", () => {
    const parsed = shortContactSchema.parse({ ...valid, name: "  Alex Morgan  ", services: ["unknown"], ndaRequested: true });
    expect(parsed).toEqual({ name: "Alex Morgan", email: valid.email, project: valid.project });
    expect(contactSchema.safeParse({ ...parsed, services: [], ndaRequested: false }).success).toBe(true);
  });

  it.each([
    ["name", "A"], ["name", " ".repeat(3)], ["name", "A".repeat(101)],
    ["email", "alex@"], ["email", "a".repeat(250) + "@example.com"],
    ["project", "short"], ["project", "A".repeat(4001)],
  ])("uses identical validation in both forms for %s", (field, value) => {
    const input = { ...valid, [field]: value };
    const short = shortContactSchema.safeParse(input);
    const full = contactSchema.safeParse(input);
    expect(short.success).toBe(false);
    expect(short.error?.issues).toEqual(full.error?.issues);
  });
});
