# Concept 02 — Stage 4 report

`/work` now follows the approved layout: coral hero with eyebrow pill, heading, introduction and honesty note; lavender Home cube artwork; filter pills with the live result count; six concept cards; and six wide expanded cards with copy on the left and larger product artwork on the right. Shared cards, pills, buttons and surface tokens are reused. Copy, concept data, routes and metadata are unchanged.

The collection uses one column below 768px and two columns from 768px. Expanded cards use one column below 1024px and two columns from 1024px. White, lavender, dark plum and coral surfaces alternate. All six existing artwork compositions receive Work-scoped rounded treatments, preserving Home's previews. Each product illustration retains one accessible image label and hidden decorative internals. Both collection and expanded artwork retain `content-visibility: auto` with reserved aspect ratios.

All twelve concept surfaces display CONCEPT and the existing no-delivery-metrics disclaimer. Service chips retain `/contact?service=<slug>` and expanded CTAs retain `/contact?project=<id>`. Filtering still server-renders All, hydrates the URL category, uses `replaceState`, preserves other parameters/history state/fragments, announces counts, and scrolls only the filter row to reveal the pressed pill. Loading/error rendering remains driven by `status`; reset and retry behavior remain intact.

## Changed files

- `src/app/work/page.tsx`
- `src/components/work/work-hero.tsx` — added
- `src/components/work/concept-card.tsx`
- `src/components/work/concept-label.tsx`
- `src/components/work/concept-section.tsx`
- `src/components/work/work-cta.tsx`
- `src/components/work/work-filter.tsx` — toolbar markup only; behavior unchanged
- `src/components/work/work-filter.test.tsx`
- `src/styles/work.css`
- `docs/redesign-stage-4-report.md` — added

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 13 files / 113 tests.
- `npm run build`: passed; `/work` remains statically rendered.
- `git diff --check`: passed.
- Existing filter tests pass. The existing global assertion counting six disclaimers now checks each expanded region independently because collection cards also require disclaimers. Added coverage verifies disclosures, one accessible label per product illustration, decorative internals, fragment links, service chips and project CTAs for all six concepts.
- Generated production HTML verified: one h1, six collection cards, six expanded sections, twelve CONCEPT labels, twelve disclaimers, twelve labelled product illustrations, unique IDs, valid concept fragment targets, All pressed on the server, and “Showing 6 concepts” in the live region. Existing page title remains unchanged.

## Contrast

Measured using the actual solid surface tokens and WCAG relative luminance:

| Surface | Main text | Supporting text |
| --- | ---: | ---: |
| White `#fffaff` | `#261d2e`: 15.70:1 | `#61536c`: 6.88:1 |
| Lavender `#ece4fc` | `#261d2e`: 13.15:1 | `#61536c`: 5.76:1 |
| Dark plum `#2b2033` | `#fcf7ff`: 14.65:1 | `#d7c9e2`: 9.83:1 |
| Coral `#ff8977` | `#2b2033`: 6.70:1 | `#493047`: 5.06:1 |

The result count on the canvas measures 6.31:1. Selected filter text measures 14.65:1; hovered filter text measures 12.05:1. CONCEPT pill text on lavender measures 13.15:1, dark pill text on white measures 15.01:1, and light pill text on plum-800 measures 12.05:1. Product artwork text on plum-800/plum-950 measures 10.45:1/14.21:1; coral sample states use dark plum text, 6.70:1. The light mobile artwork uses the same passing white/lavender pairings as the cards.

Dark focus rings against white/lavender/coral measure 15.01:1/12.58:1/6.70:1. Light rings against dark plum measure 12.36:1. Filter control borders against white measure 5.00:1. Service chip boundaries use the shared surface control borders. Global reduced-motion handling remains in effect, and filter scrolling remains instant. Forced-colors mode gives the selected pill an explicit Highlight border.

## Limitations and open questions

Installed Chromium could not launch in the sandbox: macOS MachPortRendezvous returned permission denied. Browser screenshots, responsive overflow at 320–1440px, 200% zoom and visual focus checks remain unverified. CSS bounds artwork, uses `minmax(0, 1fr)` grid tracks and confines filter overflow to its row; no real-browser validation is claimed.

No open content or implementation questions. No commits or pushes.
