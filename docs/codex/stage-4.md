# Stage 4 — Work page

Read `AGENTS.md`, spec §9, §11, §12 (Work), §13, §14 and `docs/v1-content-brief.md` §5. The attached image is the
approved visual direction. Stages 1–3 are in place: reuse tokens, primitives, `page-hero`, services data and the
concept artwork components created for Home (`src/components/work/artwork/`).

## Stage 3 review note

Browser console on `/services` warns that a CSS chunk "was preloaded using link preload but not used within a few
seconds". It comes from importing route CSS inside components (`page-hero.css`, `services.css`). For new Work styles,
import the stylesheet once from the route (`src/app/work/page.tsx`) or `globals.css`, not from leaf components, and
move the `page-hero.css` import to `globals.css`. Confirm the warning is gone in `next start`.

Build `/work` from components in `src/components/work/`, copy in `src/content/work.ts`:

1. Data — typed `WorkConcept` (spec §11) for the six concepts in brief §5. `relatedServices` are service slugs
   validated against `services.ts` at type level. The CONCEPT label lives in the component, not in data.
   `image` may describe the native artwork (alt text, aspect ratio) instead of a raster file.
2. Hero — eyebrow WORK, h1 "PRODUCT PROBLEMS. CLEAR DIRECTIONS.", introduction, and the small honesty note.
3. `work-filter` (client) — buttons All/Web/Mobile/Desktop/Operations with `aria-pressed`; filters without
   navigation; syncs `?category=` via `window.history.replaceState` (shallow); reads the param on mount; invalid
   values fall back to All; server renders All. Result count in an `aria-live="polite"` region
   ("Showing 6 concepts"). Empty state with brief copy and "Show all concepts". The row scrolls horizontally when
   needed. Pure `filterConcepts(concepts, category)` + `parseCategory(param)` with unit tests (correct category,
   restores All, ignores unknown).
   Loading/error states: filtering is synchronous, so implement the loading and error UI as components driven by a
   `status` prop and render them only if that status occurs (e.g. wrap client hydration in an error boundary). Do
   not add fake delays.
4. `concept-grid` / `concept-card` — 1 column < 768px, 2 columns ≥ 768px. Card: visible CONCEPT label (text, not
   color only), category, h3 title, summary, large original artwork, "View concept" anchor → `#<id>`.
   Filtering hides cards only; expanded sections stay in the DOM.
5. Expanded concept sections (`id=<concept id>`, h2 heading from brief) — The scenario, Proposed direction,
   Questions to validate (two bullets), Relevant services chips → `/contact?service=<slug>`,
   "Discuss a similar challenge" → `/contact?project=<id>`, and the no-metrics disclaimer. Single column until
   1024px. Every section shows CONCEPT.
6. Artwork — six original HTML/CSS/SVG compositions matching the spec's visual direction column; neutral sample
   data only; decorative internals `aria-hidden`, a meaningful `role="img"` + `aria-label` on the composition.
   Restrained shadow allowed inside artwork only. Below-the-fold artwork must not block LCP.
7. CTA — "HAVE A SIMILAR CHALLENGE?", text, "Discuss your project" → `/contact`.

Page metadata per spec §15. Follow light-section contrast rules in AGENTS.md.
Finish with lint, typecheck, test, build green. Report changed files and results.
