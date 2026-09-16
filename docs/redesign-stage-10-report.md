# Stage 10 — Distinct page artwork

Four original SVG compositions now distinguish Services, Work, About and Contact. Home keeps the approved cube cluster; Approach keeps its slabs. No raster assets, dependencies, routes or marketing claims were added.

| Page | Composition |
| --- | --- |
| Home | Existing lavender cube cluster, unchanged. |
| Services | Isometric selection tray with six complementary modules; a coral module floats above its place. |
| Work | Framed desktop workspace and upright mobile panel on a shared isometric platform. |
| About | Four cylindrical nodes connected around a single coral outcome tile. |
| Contact | Two overlapping message cards, limited to 12rem wide in the support column. |
| Approach | Existing three floating slabs, unchanged. |

All new compositions reserve a 6:5 aspect ratio, use `content-visibility: auto` (including when the stacked mobile layout puts them below the fold), and expose one labelled image with hidden SVG internals. Labels live in typed content. Removed the ancestor `aria-hidden` from About and Approach artwork cards so their image labels are accessible. Shadows are decorative. Isometric transforms are confined to inner SVG groups; reveal containers retain their existing transforms and transitions.

## Changed files

- `src/components/home/studio-artwork.tsx`: shared image wrapper and isometric tile primitive; existing cube/slab drawing code unchanged.
- `src/components/services/services-artwork.tsx`, `src/components/work/work-hero-artwork.tsx`, `src/components/about/about-artwork.tsx`, `src/components/contact/contact-artwork.tsx`: page-specific compositions.
- `src/content/hero-artwork.ts`: typed image labels.
- `src/components/services/services-hero.tsx`, `src/components/work/work-hero.tsx`, `src/components/contact/contact-support.tsx`, `src/app/about/page.tsx`: connect the new artwork.
- `src/app/approach/page.tsx`: expose its existing labelled image.
- `src/components/work/artwork/artwork.css`: reserved dimensions, deferred rendering and soft shadows.
- `src/styles/services.css`, `src/styles/work.css`, `src/styles/contact.css`: artwork sizing.
- `scripts/contrast-audit.mjs`: new graphics pairings.
- `docs/redesign-stage-10-report.md`: this report.

## Contrast

`node scripts/contrast-audit.mjs` passes. New artwork has no visible text. Opaque contours, symbols and connecting lines use plum; low-contrast shadows and depth shading carry no information.

| Meaningful graphics | Contrast |
| --- | ---: |
| Plum-900 on white | 15.01:1 |
| Plum-900 on surface lavender (including About connectors) | 12.58:1 |
| Plum-900 on lavender-300 (including screen details and the darkest hero gradient stop) | 8.64:1 |
| Plum-900 on coral | 6.70:1 |
| Plum-800 node centres / message dots on white | 12.35:1 |

All exceed the 3:1 graphics requirement. The retained Home artwork note measures at least 8.64:1, exceeding 4.5:1 for text.

## Verification and remaining check

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 147 tests across 14 files.
- `npm run build`: passed.
- `node scripts/contrast-audit.mjs`: passed.
- `git diff --check`: passed.
- Production HTML checked with JSDOM for all six routes: one labelled image per hero/support composition, no hidden ancestor, SVG internals hidden, no nested image role, one H1 per page.
- Rendered and visually inspected the six SVG compositions using the existing Sharp installation. Distinct silhouettes confirmed in these standalone vector previews; these are not browser screenshots. Local preview: `/private/tmp/forgeline-stage10/vector-overview.png`.
- Browser checks could not be run by Codex: Playwright Chromium was prevented from launching by the macOS sandbox (`bootstrap_check_in … MachPortRendezvousServer … Permission denied (1100)`). **Claude ran them afterwards against a production server on port 3100**, with these results:
  - All six routes at 1440 and 375: horizontal overflow 0, exactly one `<h1>` each.
  - Every composition exposes one `role="img"` with its label, the inner `<svg>` is `aria-hidden="true"`, there is no nested image role and no ancestor with `aria-hidden` — including About and Approach, whose ancestor attribute this stage removed.
  - The six drawings hash differently from one another, and the rendered artwork was inspected visually at 1440: cube cluster, module tray, desktop-and-mobile screens, connected nodes, slabs, message cards.
  - Repeating reveal: an element below the fold sits at opacity 0, animates to 1 on entry (0.42s with a staggered delay), returns to 0 when scrolled away and animates again on re-entry. A full-page sweep found nothing left below opacity 1 while more than half visible; elements peeking in at 9% are still hidden, which is the observer threshold behaving as designed.
  - `prefers-reduced-motion: reduce`: no reveal element is left invisible, artwork opacity 1.
  - Without JavaScript the HTML still carries the artwork and its label, and no `data-reveal="on"` flag, so nothing is hidden.

No content or design questions are open. Stage sign-off still requires the browser check in a session that permits Chromium to launch. No commit or push was made.
