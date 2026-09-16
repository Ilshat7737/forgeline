import type { WorkCategory, WorkFilterCategory } from "@/content/work";

export function parseCategory(param: string | null): WorkFilterCategory {
  switch (param) {
    case "web": case "mobile": case "desktop": case "operations": return param;
    default: return "all";
  }
}

export function filterConcepts<T extends { category: WorkCategory; featured: boolean }>(concepts: readonly T[], category: WorkFilterCategory): readonly T[] {
  return concepts.filter((concept) => category === "all" ? concept.featured : concept.category === category);
}

/** Keep the selection inside the row, including space for the end fade. */
export function getFilterScrollOffset(scrollLeft: number, viewportWidth: number, scrollWidth: number, buttonLeft: number, buttonWidth: number, padding = 24): number {
  const visible = buttonLeft >= scrollLeft + padding && buttonLeft + buttonWidth <= scrollLeft + viewportWidth - padding;
  const target = visible ? scrollLeft : buttonLeft - padding;
  return Math.max(0, Math.min(target, scrollWidth - viewportWidth));
}
