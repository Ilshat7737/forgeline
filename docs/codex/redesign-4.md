# Redesign stage 4 — Work page in Concept 02

Read `AGENTS.md`, `docs/redesign-brief.md`, spec §9 and §11 for the copy and data, and reuse the design system and
Home patterns from redesign stages 1–3.

Approved layout for `/work` (owner-reviewed):

```
[ hero card: eyebrow pill, h1, intro, honesty note ]  [ lavender card: 3D cube artwork ]

[ filter pills: All | Web | Mobile | Desktop | Operations ]   "Showing N concepts"
[ concept cards, 2 per row × 3 rows: CONCEPT pill, category, title, summary, mini product UI, "View concept" ]

[ per concept, a wide expanded card (id=<concept id>):
  left column  — The scenario / Proposed direction / Questions to validate / service chips / CTA
  right column — the concept's mini product UI, larger ]
```

Requirements:

1. Keep the filter behaviour: `aria-pressed` pills, no navigation, `?category=` synced with `replaceState`,
   server renders All, `aria-live` result count, empty state, the pressed pill scrolled into view inside its row,
   and all existing `work-filter` tests passing.
2. Every card and every expanded section keeps a visible CONCEPT label and the "no delivery metrics" disclaimer.
3. Reuse and restyle the six existing artwork components for the new card surfaces; keep them decorative with one
   accessible label each, and keep `content-visibility` lazy rendering for below-the-fold artwork.
4. Service chips link to `/contact?service=<slug>`; the CTA links to `/contact?project=<id>`.
5. Expanded cards stay single column below 1024px; the grid is 1 column below 768px.
6. Keep the loading and error state components driven by the `status` prop.

Do not change copy, concept data, routes or metadata. Finish with lint, typecheck, test, build passing, and report
changed files.
