import type { ReactNode } from "react";
import type { WorkCategory } from "@/content/work";

export type ConceptGridEntry = { id: string; category: WorkCategory; featured: boolean; content: ReactNode };

export function ConceptGrid({ entries, visibleIds }: { entries: readonly ConceptGridEntry[]; visibleIds: readonly string[] }) {
  return (
    <ul className="concept-grid" id="concept-grid">
      {entries.map((entry) => <li key={entry.id} hidden={!visibleIds.includes(entry.id)}>{entry.content}</li>)}
    </ul>
  );
}
