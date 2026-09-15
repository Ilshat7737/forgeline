import type { WorkCategory, WorkFilterCategory } from "@/content/work";

export function parseCategory(param: string | null): WorkFilterCategory {
  switch (param) {
    case "web": case "mobile": case "desktop": case "operations": return param;
    default: return "all";
  }
}

export function filterConcepts<T extends { category: WorkCategory }>(concepts: readonly T[], category: WorkFilterCategory): readonly T[] {
  return category === "all" ? concepts : concepts.filter((concept) => concept.category === category);
}
