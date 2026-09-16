# Redesign stage 2 — Home page in Concept 02

Read `AGENTS.md`, `docs/redesign-brief.md` (§2 especially), spec §7 for the copy, and reuse everything built in
redesign stage 1. The attached image `redes-new.png` is the approved mockup for this page — match its composition
closely, at the level of card sizes, surface rotation and rhythm.

Rebuild `/` as the bento composition in the brief §2 (hero row → strip row → about card → services grid → process
→ insights → work → contact card → footer). Keep all existing English copy from `src/content/home.ts` and
`src/content/services.ts`; the mockup's Russian text is only a layout reference.

Requirements:

1. **Hero row**: coral card (pill eyebrow, two-line headline, supporting sentence, dark pill CTA "Discuss your
   project", quiet pill "Explore our work") + lavender card with original 3D cube-cluster artwork (CSS/SVG, no
   images, `role="img"` with a short label) and the small note at its bottom.
2. **Strip row**: dark technology card with the five technology marks (React, Node.js, .NET, Python, AWS) drawn as
   local monochrome SVG components plus the caption; white product-status vignette card (checklist + progress +
   62%) built the same way as the concept artwork — decorative, `aria-hidden` internals, one accessible label;
   narrow dark "Scroll on" card with the long arrow.
3. **About card** (`id="about"`): wide white card with label, two-line heading, paragraph and the three inner tiles
   (dark / lavender / coral).
4. **Services grid** (`id="services"`): section heading block + 8 cards in a 4×2 grid (2 columns on tablet, 1 on
   mobile), each with its line icon, title, arrow and a link to `/contact?service=<slug>`, surfaces rotating with
   one coral card as in the mockup. The accordion is replaced by this grid — remove the accordion component and its
   test, and keep "View all services" → `/services`.
5. **Process** (`id="approach"`): section heading block + 4 white step cards (icon chip, number, title, text) with
   the small connecting arrows on desktop (decorative, hidden on mobile).
6. **Insights**: section heading block + 2 wide article cards (lavender, dark) with an "ARTICLE" pill, title,
   summary, decorative arrow and 3D artwork. **These cards are not links** — render them as `article` elements with
   no href, and keep the existing "resource in preparation" status text visible.
7. **Work**: section heading block + 2 wide concept cards (CONCEPT pill, title, summary, arrow, embedded mini
   product UI reusing the existing artwork components, restyled for the new cards) linking to `/work#<id>`.
8. **Contact card**: wide lavender card — label, heading, supporting sentence and cube artwork on the left; short
   form on the right with Name, Work email and Project fields and a coral pill "Send project brief".
   It must reuse the existing server action, Zod schema (a subset: name, email, project; services empty, NDA false),
   honeypot, inline errors with `aria-describedby`, error summary focus, pending state, fail-closed production
   behaviour and the same success state. No duplicated submission logic — extract what both forms share.
   Add tests for the shared schema subset and for the short form's error and success states.

Also update the Home metadata description only if the copy changed (it should not).

Finish with lint, typecheck, test, build all passing. Report changed files, what you removed (accordion), and the
checks' results.
