import { describe, expect, it } from "vitest";
import { contactProjectSuggestion } from "@/content/contact";
import { resolveContactQuery } from "./contact-query";

describe("contact query resolution", () => {
  it("preselects the mapped form option for a known service slug", () => {
    expect(resolveContactQuery({ service: "mobile-development" }).services).toEqual(["mobile-application"]);
    expect(resolveContactQuery({ service: "knowledge-transfer" }).services).toEqual(["team-augmentation"]);
  });

  it("suggests project text for a known concept id", () => {
    expect(resolveContactQuery({ project: "workflow-automation" }).project)
      .toBe(contactProjectSuggestion("Workflow automation"));
  });

  it("resolves service and project together", () => {
    expect(resolveContactQuery({ service: "cloud-devops", project: "financial-workspace" })).toEqual({
      services: ["cloud-devops"],
      project: contactProjectSuggestion("Financial workspace"),
    });
  });

  it.each([
    ["unknown values", { service: "blockchain", project: "secret-project" }],
    ["prototype keys", { service: "constructor", project: "toString" }],
    ["repeated parameters", { service: ["web-development", "cloud-devops"], project: ["financial-workspace"] }],
    ["no parameters", {}],
  ])("ignores %s", (_case, params) => {
    expect(resolveContactQuery(params)).toEqual({ services: [], project: "" });
  });
});
