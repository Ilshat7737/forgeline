# Redesign stage 7 — Eight additional Work concepts behind the category filters

Read `AGENTS.md`, `docs/redesign-brief.md`, spec §9 and §11, and `docs/v1-content-brief.md` §5. Run this **after**
redesign stage 6. The Work page is already in Concept 02 with six concepts and filter pills.

## What the owner asked for

Add **two more concepts to each category** — Web, Mobile, Desktop, Operations — so the collection grows from 6 to
**14**. The first filter keeps showing only the original six: the eight new concepts appear **only inside their
category tabs**.

Because that first filter is no longer "everything", rename it:

- Label `All` → **`Featured`** (keep the `all` query value and the existing default so `/work` and
  `/work?category=web` keep working; only the visible label and copy change).
- While Featured is selected, render one short line under the count, e.g.
  **"Featured selection. Use the category filters to see all 14 concepts."** — no other claims.
- The result count stays honest per view: 6 for Featured, 4 for each category.

## Data and filtering

1. Extend `WorkConcept` in `src/content/work.ts` with `featured: boolean`. The six existing concepts are
   `featured: true`; the eight new ones are `featured: false`. Do not reorder or reword the existing six.
2. `filterConcepts` returns featured concepts for `all`, and every concept of the category (featured and new) for
   `web` / `mobile` / `desktop` / `operations`. `parseCategory` is unchanged.
3. Update `src/lib/work-filter.test.ts` and `src/components/work/work-filter.test.tsx`: Featured shows 6, each
   category shows 4, unknown values fall back to Featured, the URL sync and pressed-pill behaviour are unchanged.
4. Every concept, including the new eight, keeps an expanded section with a stable `id`, so `/work#<id>` and
   `/contact?project=<id>` keep working for all 14.

## The eight new concepts

Write them yourself, in the same voice and shape as the existing six (title, one-sentence summary, expanded
heading, `scenario`, `proposedDirection`, exactly two `validationQuestions`, two or three `relatedServices` taken
from the real slugs in `src/content/services.ts`, and an `image` entry). Requirements:

- Two per category, none duplicating an existing concept's subject or interface.
- Illustrative product scenarios only: no client names, no industries the agency has not claimed, no metrics,
  no outcomes, no dates. Every card and section keeps the **CONCEPT** label and the existing
  "No delivery metrics or client outcomes are asserted for this concept." disclaimer.
- Add the same entries to `docs/v1-content-brief.md` §5 so the content source stays complete.

## Artwork

Draw **eight new original compositions** in `src/components/work/artwork/`, in the established style: HTML/CSS/SVG
only, no raster images, neutral sample data ("Account A", "Request B", round sample numbers), decorative internals
`aria-hidden`, one `role="img"` with a meaningful `aria-label` per composition, the same rounded Work card
treatment, reserved aspect ratio and `content-visibility: auto` for below-the-fold cards. Mobile concepts use
device-free canvases, as the existing mobile artwork does.

## Checks

Lint, typecheck, tests and production build must pass. Confirm in the generated HTML: 14 cards in the DOM, 6
visible under Featured, 4 under each category, 28 CONCEPT labels and 14 disclaimers across cards and sections,
valid fragment targets, and no horizontal overflow risk in the grid.

Report changed files, the eight concepts you wrote, and the contrast of any new surface pairing.
