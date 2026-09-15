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
  it.each<[WorkCategory, string[]]>([
    ["web", ["financial-workspace", "asset-processing-console"]],
    ["mobile", ["everyday-mobile-service"]],
    ["desktop", ["creative-production-tool"]],
    ["operations", ["workflow-automation", "delivery-flow-workspace"]],
  ])("filters %s without changing the original collection", (category, ids) => {
    expect(filterConcepts(workConcepts, parseCategory(category)).map((concept) => concept.id)).toEqual(ids);
    expect(workConcepts).toHaveLength(6);
  });

  it("restores all concepts", () => {
    expect(filterConcepts(workConcepts, parseCategory("all"))).toBe(workConcepts);
  });

  it.each([null, "", "unknown", "Mobile", "WEB", "web,mobile"])("ignores unsupported category %s", (param) => {
    expect(parseCategory(param)).toBe("all");
    expect(filterConcepts(workConcepts, parseCategory(param))).toHaveLength(6);
  });

  it("supports an empty collection", () => {
    expect(filterConcepts([], "web")).toEqual([]);
  });
});
