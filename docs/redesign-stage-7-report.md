# Redesign stage 7 — Additional Work concepts

Implemented eight new illustrative concepts and native HTML/CSS/SVG compositions. The original six entries retain their order and wording, with `featured: true`; all additions have `featured: false`. The default `all` query value now displays Featured and its explanatory note. Category filtering includes featured and additional concepts, with honest counts. Expanded sections remain available regardless of the selected filter.

## Count conflicts in the request

The original category distribution is Web 2, Mobile 1, Desktop 1, Operations 2. Adding exactly two to each gives **14 total**, with **4 / 3 / 3 / 4** category counts. Four per category would require 16 concepts, or changes to the single-category model. This implementation preserves the requested eight additions and original entries. Clarification was requested; no response was received before implementation finished.

The existing disclaimer is present on both cards and expanded sections. Preserving that requirement gives **28 disclaimers**, alongside **28 CONCEPT labels**, rather than the conflicting requested total of 14 disclaimers.

## New concepts

| Category | Concept / stable fragment | Composition |
| --- | --- | --- |
| Web | Knowledge library / `knowledge-library` | Topic navigation, search results, source-aware reader |
| Web | Service configurator / `service-configurator` | Selectable modules, dependency map, draft configuration |
| Mobile | Offline field notes / `offline-field-notes` | Device-free capture canvas and local/shared comparison |
| Mobile | Mobile access pass / `mobile-access-pass` | Device-free invitation and permission pass |
| Desktop | Data comparison desk / `data-comparison-desk` | Aligned datasets, changed fields, chosen-value preview |
| Desktop | Local environment manager / `local-environment-manager` | Environment tree, grouped settings, switch preview |
| Operations | Team capacity planner / `team-capacity-planner` | Allocation matrix, draft assignments, unassigned work tray |
| Operations | System dependency map / `system-dependency-map` | Service graph, relationship details, change scope |

All sample interface copy lives in typed content. Each artwork has one labelled `role="img"` and decorative internals hidden from assistive technology. Mobile compositions have no device hardware. Existing reserved aspect ratios, rounded treatments and `content-visibility: auto` remain in use. No raster assets or new dependencies were added.

## Changed files

- `src/content/work.ts`: eight entries, featured flags, Featured label and explanatory/reset copy.
- `src/content/additional-work-artwork.ts`: typed sample interface copy.
- `docs/v1-content-brief.md`: complete new entries, artwork descriptions, filtering and count clarification.
- `src/lib/work-filter.ts`: featured-only default and complete category results; parser unchanged.
- `src/components/work/concept-grid.tsx`: featured field in server-rendered card entries.
- `src/components/work/work-filter.tsx`: explanatory note below the live count.
- `src/app/work/page.tsx`: featured metadata and repeating existing surface rhythm for all 14 entries.
- `src/styles/work.css`: explanatory note styles and shrinkable summary container.
- `src/components/work/artwork/concept-artwork.tsx`: registers all eight compositions.
- `src/components/work/artwork/additional-concept-artwork.tsx`: eight original compositions.
- `src/components/work/artwork/additional-artwork.css`: composition layouts using existing tokens.
- `src/lib/work-filter.test.ts`: original featured order, two additions per category, category contents and fallback.
- `src/components/work/work-filter.test.tsx`: hydration, honest counts, URL/pressed-state behaviour, all cards/sections, labels, disclosures, artwork and links.
- `src/lib/contact-query.test.ts`: project-prefill resolution for every concept.
- `scripts/contrast-audit.mjs`: repeatable contrast measurements for additional artwork.
- `docs/redesign-stage-7-report.md`: this report.

The concurrent change to `docs/codex/QUEUE.md` was not made or modified by this stage.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 132 tests across 13 files.
- `npm run build`: passed; `/work` remains statically generated.
- `node scripts/contrast-audit.mjs`: passed.
- Parsed `.next/server/app/work.html` with JSDOM, excluding script data from element counts: 14 cards in the DOM, six unhidden Featured cards, 14 expanded sections, 28 CONCEPT labels, 28 disclaimers, unique IDs, valid fragment targets and project links, one labelled image per card/section. Category card metadata totals Web 4, Mobile 3, Desktop 3, Operations 4; interaction tests verify those views.
- Grid/CSS review: single-column and two-column grids retain `minmax(0, 1fr)` and shrinkable children; new internal grids use zero minimum tracks, container-relative dimensions, and clipped artwork bounds. The filter row retains its own horizontal scrolling. No new horizontal overflow risk identified in code review.
- **Browser layout verification remains unverified:** Playwright Chromium could not launch because the macOS sandbox denied `bootstrap_check_in` for its Mach rendezvous server. No browser screenshots or measured viewport-overflow claims are made. The production browser-check script is available locally at `/tmp/forgeline-browser-check/stage7.mjs` for a session that permits launching Chromium.

## Contrast

No new palette tokens. Ratios below are the minimum across every listed background; text meets 4.5:1 and meaningful graphic lines exceed 3:1. Low-opacity placeholder lines are decorative, carry no information and are hidden from assistive technology.

| Foreground / background | Minimum contrast |
| --- | ---: |
| Ink `#261d2e` / white `#fffaff`, lavender `#ece4fc` | 13.15:1 |
| Light text `#fcf7ff` / plum `#201727`, `#2b2033`, `#3b2d46` | 12.05:1 |
| Dark plum `#2b2033` / coral `#ff8977` | 6.70:1 |
| Lavender graphic lines `#d4b5f5` / plum `#201727`, `#2b2033` | 8.64:1 |
| Featured note: muted `#61536c` / canvas including strongest combined glow | 5.00:1 |

Open questions: the two conflicting count requirements above. No commits or pushes were made.
