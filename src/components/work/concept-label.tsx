import { PillLabel } from "@/components/ui/pill-label";

// Credibility is fixed here: concept records cannot supply arbitrary labels.
export function ConceptLabel() {
  return <PillLabel variant="tag" className="concept-label">CONCEPT</PillLabel>;
}
