# Stage 10 — A distinct hero artwork for every page

Read `AGENTS.md`, `docs/redesign-brief.md` and the existing artwork components. Run after stage R9.

## Problem

Every page hero currently shows the same isometric cube cluster (`CubeArtwork` from
`src/components/home/studio-artwork.tsx`), so Home, Services, Work and About look interchangeable at first glance.
Approach already differs (`SlabArtwork`), and Contact reuses the scattered cubes.

## What to do

Give each page its **own original composition**, recognisable as the same family — isometric, lavender/plum/coral,
soft shadow, no raster images — but clearly different in subject and silhouette:

| Page | Card | Direction (your call on the exact form) |
| --- | --- | --- |
| `/` | lavender hero card | keep the cube cluster: it is the approved mockup composition |
| `/services` | lavender hero card | something that reads as "choosing a combination", e.g. interlocking modules or a sorted set |
| `/work` | lavender hero card | something that reads as "products in context", e.g. stacked screens or framed surfaces |
| `/about` | lavender hero card | something that reads as "a team around one outcome", e.g. converging planes or linked nodes |
| `/contact` | support column | keep it quiet and small; it must not compete with the form |
| `/approach` | dark hero card | keep the existing slabs |

Rules that do not change:

- HTML/CSS/SVG only, no raster assets and no new dependencies.
- One `role="img"` with a meaningful `aria-label` per composition, decorative internals `aria-hidden`.
- Reserved aspect ratio, `content-visibility: auto` for below-the-fold pieces, no layout shift.
- Contrast of any visible text or meaningful line inside the artwork stays ≥ 4.5:1 (text) / 3:1 (graphics);
  rerun `node scripts/contrast-audit.mjs` and extend it if you add new pairings.
- Keep the existing file layout: shared pieces in `src/components/home/studio-artwork.tsx`, page-specific ones in
  their own module, styles alongside the other artwork CSS.
- The reveal animation (`data-reveal-group`) must keep working: artwork sits inside cards that are revealed, so do
  not add transforms that fight the reveal transition.

## Checks

Lint, typecheck, tests and production build. Confirm in the browser that each hero is visually distinct at 1440 and
375, that no page scrolls horizontally, and that every composition still exposes exactly one labelled image.

Report what you drew for each page and the contrast figures.
