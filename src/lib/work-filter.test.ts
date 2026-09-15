import { describe, expect, it } from "vitest";
import { workConcepts, type WorkCategory } from "@/content/work";
import { filterConcepts, parseCategory } from "./work-filter";

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
