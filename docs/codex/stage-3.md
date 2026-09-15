# Stage 3 — Services page

Read `AGENTS.md`, spec §8, §12 (Services), §13, §14 and `docs/v1-content-brief.md` §4. The attached image is the
approved visual direction. Stages 1–2 are in place: reuse tokens, UI primitives, `src/content/services.ts` and
section patterns from Home. Do not duplicate primitives or the service list.

## Stage 2 review fixes (do these first)

1. `services-accordion.tsx`: remove the `sr-only` "Expand details"/"Collapse details" text inside the toggle. It
   pollutes the h3/button name ("01Web developmentCollapse details") and "Collapse" is false for the open item,
   which cannot close. `aria-expanded` already conveys state. Keep the `aria-hidden` number. Update tests.
2. Contact band outlined heading: use `-webkit-text-stroke: 1.5px` at ≥ 1024px so the thin outline keeps ≥ 3:1
   graphic legibility on plum-950.

Build `/services` from components in `src/components/services/`, copy in `src/content/services.ts` (extend it):

1. Page hero — dark plum, eyebrow SERVICES, h1 "CHOOSE THE SUPPORT YOUR PRODUCT NEEDS." with a flat coral block
   behind "PRODUCT NEEDS." (plum text on coral; typographic, not a card; must wrap cleanly at 320px),
   introduction, primary CTA, thin bottom rule. Extract a reusable `page-hero` pattern for Work and Contact.
2. `service-selector` — heading "WHERE ARE YOU NOW?", three large tabs (brief §4 mapping to groups).
   Without JS: all three situation paragraphs are visible and no group is dimmed. With JS: proper ARIA tabs
   (`role="tablist"`, arrow-key navigation, `aria-selected`, `aria-controls`), selected paragraph shown, related
   groups highlighted (coral number/left rule + a text marker such as "Relevant to your situation" — never color
   alone). Stack to three full-width buttons < 640px. Pure function for tab→groups mapping with a unit test.
3. `service-group` × 4 — full-width editorial groups: big display number, heading, introduction, rows. Each row:
   title, one-line description (brief table), arrow link "Discuss this service" (accessible name includes service
   title) → `/contact?service=<slug>`; hover/focus turns title coral (on dark) and moves the arrow 6px.
   Rows stay single-column readable on mobile.
4. Technology strip — heading "TOOLS FOLLOW THE PRODUCT.", body, large typographic row of React, React Native,
   Node.js, .NET, Python, Go, MongoDB, AWS. No auto-scroll. Horizontal swipe on small screens with a visible end
   fade; the scroll container is keyboard focusable (`tabIndex=0`, labelled) and the page body never scrolls
   horizontally.
5. `delivery-principles` — lavender, three columns (stack on mobile).
6. CTA — "NOT SURE WHERE TO START?", text, "Tell us about the challenge" → `/contact`.

Page metadata per spec §15. Follow light-section contrast rules in AGENTS.md.
Finish with lint, typecheck, test, build green. Report changed files and results.
