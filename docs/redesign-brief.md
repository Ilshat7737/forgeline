# Forgeline — Redesign brief (Concept 02, "Modular studio")

The approved visual direction changes from **Concept 01 — Typography** to **Concept 02 — Modular studio**,
supplied as `redes-new.png`. This brief replaces the visual sections of the V1 spec
(`software-agency-v1-implementation-spec.md` §3, §5, and the visual parts of §6–§10). Everything else in the spec
still applies: routes, page structure, copy, form behaviour, accessibility, SEO and performance requirements.

The mockup is Russian; **the site stays English**. Copy comes from the spec and `docs/v1-content-brief.md` unchanged.

## 1. What changes

| Area | Concept 01 (current) | Concept 02 (new) |
| --- | --- | --- |
| Layout | Full-width editorial bands, thin rules | **Bento grid of rounded cards** on a light canvas, cards of different sizes per row |
| Background | Flat deep plum / pale lavender sections | Light lavender-white canvas with a soft blurred purple-coral glow behind the grid |
| Corners | 0px panels, 4px fields | Cards ~24px, inner tiles ~16px, fields ~14px, **buttons fully rounded (pill)** |
| Buttons | Rectangular coral / outlined | Pill: dark plum primary in hero, coral primary in CTA/form, quiet white/lavender secondary |
| Headlines | Oversized condensed display, uppercase | Large bold grotesk, sentence case, two short lines |
| Sections | Thin-rule separators | Section label (small caps, muted) + heading left, supporting sentence right, then the card grid |
| Imagery | None (type only) | Original 3D-style cube/slab artwork inside cards, mini product UI inside concept cards |
| Icons | Line arrows only | One line icon per service and per process step, plus arrows |
| Shadows | Avoided | Soft, low-contrast card shadows |

Card surfaces used across the grid: **white**, **light lavender**, **deep plum (dark)**, **coral (accent)**.
Rotating these four surfaces is what gives the page its rhythm — no section uses only one surface.

## 2. Home page composition (from the mockup, top to bottom)

1. **Header** — wordmark left, nav (Services, Work, Approach, About) centred, pill CTA right, on the light canvas.
2. **Hero row** — two cards:
   - Left, coral: small pill eyebrow, two-line headline, supporting sentence, dark pill primary CTA + quiet pill secondary.
   - Right, lavender: 3D cube cluster artwork with a short note ("ideas into solutions") at the bottom.
3. **Strip row** — three cards: dark card with technology logos + caption; white card with a product-status vignette
   (checklist + progress); narrow dark card "Scroll on" with a long down arrow.
4. **About card** — one wide white card: label, two-line heading, paragraph, and three small tiles inside it
   (dark, lavender, coral) for new products / modern systems / strong teams.
5. **Services** — label + heading + supporting sentence, then **8 service cards in a 4×2 grid**, each with a line
   icon, title and arrow. Surfaces alternate; one card is coral.
6. **Process** — label + heading + supporting sentence, then 4 white step cards (icon chip, number, title, text)
   with small arrows between them.
7. **Insights** — label + heading, then 2 wide article cards (lavender and dark) with an "ARTICLE" pill, title,
   summary, arrow and 3D artwork.
8. **Work** — label + heading, then 2 wide concept cards with a "CONCEPT" pill, title, summary, arrow and an
   embedded mini product UI (fintech dashboard; mobile task list).
9. **Contact card** — one wide lavender card: label, heading, supporting sentence and 3D cubes on the left; short
   form (name, email, project) with a coral pill submit on the right.
10. **Footer** — wordmark, nav, legal links (only when published), copyright and tagline.

## 3. Decisions taken with the owner (2026-09-15)

- **Follow the mockup exactly**, including the progress vignette with "62%" and the technology logos.
  - The progress vignette is decorative product artwork of the same kind as the concept mini-UIs. It carries no
    client name and must stay visually consistent with them.
  - Technology logos are used nominatively for "technologies we work with". Keep them monochrome where the mockup
    shows them monochrome and do not imply partnership or certification.
- **Article cards are not links.** The mockup shows an arrow, but no article pages exist in V1, so the cards render
  as `article` elements with the arrow marked decorative. No href, no dead route.
- **Home keeps a short form** (name, email, project) using the same server action, schema subset, honeypot and
  fail-closed production behaviour as `/contact`. The full form stays on `/contact`.
- **Concept cards keep the CONCEPT label** and still link to `/work#<id>`.
- **All routes are redesigned**: `/`, `/services`, `/work`, `/contact`, the legal pages and the not-found screen.
  Only the Home layout is drawn in the mockup; the other routes reuse its system (same canvas, cards, labels,
  headings, pills) with layouts derived per page and reviewed before implementation continues.

## 4. Rules that do not change

- Copy, routes, service slugs and query behaviour from the spec and `docs/v1-content-brief.md`.
- WCAG 2.2 AA: text ≥ 4.5:1, large text and meaningful graphics ≥ 3:1 — re-measure every new surface pairing,
  especially coral on lavender and muted labels on the light canvas. The muted supporting sentences in the mockup
  are too light and must be darkened to pass.
- Keyboard access, visible focus on every surface, `prefers-reduced-motion`, no horizontal scroll at 320–1440px,
  one `h1` per page, correct heading order, unique landmark labels.
- Contact form validation, error summary, success state and fail-closed submission.
- Legal publication gate, placeholder guard test, metadata, sitemap and robots.
- No invented client evidence, testimonials, ratings, awards or metrics.
