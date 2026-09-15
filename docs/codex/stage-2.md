# Stage 2 — Home page

Read `AGENTS.md`, spec §7, §12 (Home), §13, §14 and `docs/v1-content-brief.md` §3–4. The attached image is the
approved visual direction. Stage 1 (tokens, UI primitives, header/footer) is already in place — reuse it, do not
duplicate primitives.

Build `/` with sections as separate components in `src/components/home/` and copy in `src/content/home.ts` and
`src/content/services.ts` (the full typed `Service` list from brief §4 incl. `homeOrder`, `homeTitle`,
`homeDescription`):

1. `hero` — spec §7.1: 3-line h1 (line 2 coral), eyebrow, supporting text, CTA row, technology line anchored near
   the bottom, lavender outlined arrow + stacked note in the right margin (hidden < 768px), near-invisible radial
   plum variation. CSS-only load reveal (opacity + translateY 20px, 450–650ms, ≤80ms stagger) that never hides text
   without JS and is disabled under reduced motion. Mobile hero size `clamp(3.5rem,17vw,5.5rem)`, no overflow at 320px.
2. `value-statement` (`id="about"`) — lavender, 8/4 columns.
3. `services-accordion` (`id="services"`) — single-open, first open, `aria-expanded`/`aria-controls`, plus/minus
   icon, "Discuss this service" → `/contact?service=<slug>`, "View all services" → `/services`. Only this and the
   mobile menu are client components on Home. Extract open-state logic to a pure function for testing.
4. `process-section` (`id="approach"`) — lavender, 4 columns with diagonal rules; vertical rule on mobile.
5. `insight-links` — two non-link `article`s with "RESOURCE IN PREPARATION".
6. `featured-work` — lavender, two rows: copy cols 1–3, original HTML/CSS product composition cols 4–12
   (financial dashboard; mobile task screens without device hardware). Image first on mobile. Visible CONCEPT label.
   Links → `/work#financial-workspace`, `/work#everyday-mobile-service`. Build the artwork as reusable components in
   `src/components/work/artwork/` so stage 4 can reuse them.
7. `contact-band` — huge outlined coral type (text-stroke with a solid fallback), one CTA.

Page metadata per spec §15. Tests: accordion exposes exactly one open item and correct aria attributes.

## Stage 1 review fixes (do these first)

1. Footer `nav` reuses the `aria-label` "Main navigation" → duplicate landmark names. Add
   `navigation.footerLabel = "Footer navigation"` and use it in `site-footer.tsx`.
2. Mobile menu panel is only as tall as its links, so the footer shows beneath it on short pages. Make
   `.mobile-menu__panel` fill the viewport below the header (`height: calc(100dvh - var(--layout-header-height))`).
3. Fonts: spec asks Barlow Condensed 500–700 and Inter 400–700. Load Barlow `500`, `600`, `700`; Inter `400`–`700`
   only if used — remove unused weights rather than adding them.
4. Add `src/app/icon.svg` (coral "F." on plum-950, square) so `/favicon.ico` no longer 404s.
5. Note: `--spacing` is 0.5rem, so Tailwind `p-1` = 8px, `p-2` = 16px. Keep this 8px-base convention consistently.

Keep the header 84px overlay only if hero contrast holds. Check light-section contrast rules in AGENTS.md.
Finish with lint, typecheck, test, build green. Report changed files and results.
