# Concept 02 — Stage 2 report

Home now follows the approved bento sequence: coral hero and lavender cube cluster, technology/status/scroll strip, white About card with three tiles, eight service cards, four process cards, two articles, two concept previews, lavender contact card, and the existing Stage 1 footer.

The implementation reuses Stage 1 cards, pills, buttons, section headings, icons, arrows, tokens, font and shared shell. All artwork is local SVG or existing HTML/CSS product artwork. Home styles restyle the product previews without changing the Work page layout. Existing `home.ts` and `services.ts` strings and metadata are unchanged; CSS presents the original uppercase headings in sentence case. Additional mockup labels and accessibility descriptions live in typed `home-layout.ts`.

Both enquiry forms now render the shared `EnquiryForm`. The full schema extends the three-field schema, so validation constraints and messages remain shared. Home sends the parsed three-field subset with services empty and NDA false through the existing server action. The shared form owns the honeypot, field errors, summary focus, pending state, failures, retries and success state. The legal publication gate also applies to Home's privacy helper.

## Changed files

Updated:

- `src/app/page.tsx`
- `src/styles/home.css`
- `src/components/home/hero.tsx`
- `src/components/home/value-statement.tsx`
- `src/components/home/process-section.tsx`
- `src/components/home/insight-links.tsx`
- `src/components/home/featured-work.tsx`
- `src/components/home/contact-band.tsx`
- `src/components/contact/project-enquiry-form.tsx`
- `src/components/work/artwork/everyday-mobile-artwork.tsx` — optional accessible label for the task-list-only Home preview; default unchanged.
- `src/lib/contact-schema.ts`
- `src/lib/contact-schema.test.ts`

Added:

- `src/content/home-layout.ts`
- `src/components/home/services-grid.tsx`
- `src/components/home/studio-strip.tsx`
- `src/components/home/studio-artwork.tsx`
- `src/components/home/technology-mark.tsx`
- `src/components/home/home-composition.test.tsx`
- `src/components/contact/enquiry-form.tsx`
- `src/components/contact/enquiry-form.test.tsx`
- `docs/redesign-stage-2-report.md`

Removed the accordion and its now-unused helper:

- `src/components/home/services-accordion.tsx`
- `src/components/home/services-accordion.test.tsx`
- `src/lib/accordion.ts`
- `src/lib/accordion.test.ts`

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 13 files / 112 tests.
- `npm run build`: passed; Home remains statically rendered.
- `git diff --check`: passed.
- Production HTTP/HTML checks: Home, Services, Work and Contact return 200 with one h1. Home has unique IDs, eight service links, non-linked articles, three visitor fields, and no raster images.
- Tests cover subset validation parity, client and server field errors, summary focus and field links, pending state, payload defaults, success focus, production fail-closed behavior through the real action, retries, honeypot rejection, and full-form query defaults/optional fields/NDA. Composition tests cover service destinations, article semantics, concept anchors and artwork accessibility.

Measured WCAG contrast from the colors used by the new cards:

| Surface | Main text | Supporting text |
| --- | ---: | ---: |
| White | 15.70:1 | 6.88:1 |
| Lavender | 13.15:1 | 5.76:1 |
| Dark plum | 14.65:1 | 9.83:1 |
| Coral | 6.70:1 | 5.06:1 |

Error text on lavender: 5.31:1. Hero artwork note against the darkest gradient stop: 8.64:1. Icons and technology marks inherit passing text colors; focus rings retain the Stage 1 surface tokens. Decorative cube faces, chart fills and progress artwork are not used as interactive boundaries. Motion is limited to inherited controls and follows the global reduced-motion rule.

## Limitations and open questions

Chrome exited during launch in this environment, before a page could open. Browser screenshots, visual comparison, responsive overflow checks at 320–1440px and 200% zoom remain unverified. Responsive breakpoints and container sizing were reviewed in CSS; no browser verification is claimed.

No open content or implementation questions. No commits or pushes. The pre-existing untracked `docs/codex/redesign-6.md` was left untouched.
