import { describe, expect, it } from "vitest";
import { workConcepts, type WorkCategory } from "@/content/work";
import { filterConcepts, getFilterScrollOffset, parseCategory } from "./work-filter";

describe("filter row scroll offset", () => {
  it("reveals an off-screen Operations button at a narrow viewport", () => {
    expect(getFilterScrollOffset(0, 280, 548, 404, 120)).toBe(268);
  });
  it("preserves the offset when the button is already visible", () => {
    expect(getFilterScrollOffset(200, 280, 548, 240, 100)).toBe(200);
  });
  it("scrolls back for an earlier selection and clamps both ends", () => {
    expect(getFilterScrollOffset(268, 280, 548, 100, 100)).toBe(76);
    expect(getFilterScrollOffset(268, 280, 548, 4, 60)).toBe(0);
    expect(getFilterScrollOffset(0, 900, 548, 404, 120)).toBe(0);
  });
});

describe("Work categories", () => {
  it("adds exactly two non-featured concepts per category and preserves the featured order", () => {
    expect(workConcepts.filter((concept) => concept.featured).map((concept) => concept.id)).toEqual([
      "financial-workspace", "everyday-mobile-service", "workflow-automation",
      "creative-production-tool", "asset-processing-console", "delivery-flow-workspace",
    ]);
    for (const category of ["web", "mobile", "desktop", "operations"] as const) {
      expect(workConcepts.filter((concept) => concept.category === category && !concept.featured)).toHaveLength(2);
    }
  });
  it.each<[WorkCategory, string[]]>([
    ["web", ["financial-workspace", "asset-processing-console", "knowledge-library", "service-configurator"]],
    ["mobile", ["everyday-mobile-service", "offline-field-notes", "mobile-access-pass"]],
    ["desktop", ["creative-production-tool", "data-comparison-desk", "local-environment-manager"]],
    ["operations", ["workflow-automation", "delivery-flow-workspace", "team-capacity-planner", "system-dependency-map"]],
  ])("filters %s without changing the original collection", (category, ids) => {
    expect(filterConcepts(workConcepts, parseCategory(category)).map((concept) => concept.id)).toEqual(ids);
    expect(workConcepts).toHaveLength(14);
  });

  it("restores only the original six featured concepts", () => {
    expect(filterConcepts(workConcepts, parseCategory("all"))).toEqual(workConcepts.slice(0, 6));
  });

  it.each([null, "", "unknown", "Mobile", "WEB", "web,mobile"])("ignores unsupported category %s", (param) => {
    expect(parseCategory(param)).toBe("all");
    expect(filterConcepts(workConcepts, parseCategory(param))).toHaveLength(6);
  });

  it("supports an empty collection", () => {
    expect(filterConcepts([], "web")).toEqual([]);
  });
});
