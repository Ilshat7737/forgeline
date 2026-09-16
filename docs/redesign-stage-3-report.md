# Concept 02 — Stage 3 report

Services now uses the approved coral hero and lavender cube artwork, pill situation tabs, four numbered service groups with card grids, a dark technology card, three principle cards, and a coral CTA. Shared cards, pills, icons, section headings, buttons and Home cube artwork are reused. Existing copy, service slugs, routes and metadata are unchanged; uppercase headings receive Home's CSS sentence-case treatment.

All 18 services retain their descriptions and contact query links. The entire card is linked, with the service title in its accessible name. Each group has exactly one coral accent card. Grids use one column below 640px, two from 640px, and four from 1024px. Service links are at least 17rem tall and tabs at least 3.75rem tall.

Selector enhancement, ARIA relationships, arrow/Home/End navigation and hydration behavior remain unchanged. Without JavaScript, all three situation paragraphs and every service remain visible, with no group dimmed. Related groups receive both a dark coral border/number and the existing visible text marker. The technology row retains a focusable native scroll container, with no auto-scroll, and a fade plus arrow cue below 1280px.

## Changed files

- `src/app/services/page.tsx`
- `src/components/services/services-hero.tsx` — added
- `src/components/services/service-selector.tsx`
- `src/components/services/service-group.tsx`
- `src/components/services/technology-strip.tsx`
- `src/components/services/delivery-principles.tsx`
- `src/components/services/services-cta.tsx`
- `src/styles/services.css`
- `docs/redesign-stage-3-report.md` — added

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 13 files / 112 tests. Existing selector tests were unchanged.
- `npm run build`: passed; `/services` remains statically rendered.
- `git diff --check`: passed.
- Generated production HTML: one h1, 18 service links with titles in their accessible names and descriptions, four numbered section headings, exactly one coral service card per group, three visible fallback paragraphs, no selected groups before hydration, unique IDs, and a focusable technology row containing all eight names.

## Contrast adjustments

Surface-specific text replaces the old uniform lavender descriptions and coral hover text. The new service-card hover state underlines the title while retaining its passing surface color. No global tokens changed.

Measured WCAG contrast using the solid card colors:

| Surface | Main text / icons | Supporting text |
| --- | ---: | ---: |
| White `#fffaff` | `#261d2e`: 15.70:1 | `#61536c`: 6.88:1 |
| Lavender `#ece4fc` | `#261d2e`: 13.15:1 | `#61536c`: 5.76:1 |
| Dark plum `#2b2033` | `#fcf7ff`: 14.65:1 | `#d7c9e2`: 9.83:1 |
| Coral `#ff8977` | `#2b2033`: 6.70:1 | `#493047`: 5.06:1 |

Relevance-marker text uses `--color-coral-700` (`#a8322a`) on a white pill: 6.46:1. The same accent on the base canvas is 5.92:1. Muted section text on the base canvas is 6.31:1. Selected tabs use light text on dark plum: 14.65:1. Unselected tab borders against white are 5.00:1.

Service links use inset focus rings so the ring stays against its actual card surface: dark rings on white/lavender/coral measure 15.01:1 / 12.58:1 / 6.70:1; light rings on dark plum measure 12.36:1. Tabs retain a dark outer ring against the light canvas. Dark CTA buttons retain dark outer rings against coral. Technology names and the end arrow use the passing dark-surface text colors. Decorative cube faces are not controls or meaningful indicators.

## Limitations and open questions

Browser verification was attempted, but installed Chromium failed during launch with a macOS MachPortRendezvous permission error in the sandbox. Screenshots, responsive overflow at 320–1440px, 200% zoom, and visual focus checks remain unverified in a real browser. CSS constrains grid tracks with `minmax(0, 1fr)`, bounds artwork, and confines technology overflow to its scroll container; no browser validation is claimed.

No open content or implementation questions. No commits or pushes.
