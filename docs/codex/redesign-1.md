# Redesign stage 1 — Concept 02 design system and shell

Read `AGENTS.md`, `docs/redesign-brief.md` (all), and spec §12–§16. The attached image `redes-new.png` is the
approved mockup. The site already exists in the previous visual direction and all four routes work — this stage
replaces the design foundation, not the content.

You own the visual details in this redesign: choose the exact scale values, spacing rhythm, icon set drawing style
and motion, as long as the result matches the mockup's character and passes the accessibility rules in `AGENTS.md`.

Do this stage only:

1. **Tokens** (`src/styles/tokens.css`): rebuild for Concept 02 — canvas and glow background, the four card
   surfaces (white, lavender, dark plum, coral), text colours per surface, border/divider colours, radii
   (card ~24px, tile ~16px, field ~14px, pill = full), soft shadow levels, and a spacing scale that fits the bento
   grid. Keep existing token names where they still mean the same thing so unrelated code keeps working; add the
   new ones rather than renaming everything at once.
2. **Typography**: the mockup uses one bold grotesk for headings and the same family for body. Replace Barlow
   Condensed with a Google font that matches the mockup (your choice — e.g. Manrope, Plus Jakarta Sans, Onest),
   loaded through `next/font/google` with only the weights used. Define a heading/body scale for sentence-case
   headings; drop the uppercase display treatment.
3. **Primitives** (`src/components/ui/`): `card` (surface + padding + radius + optional shadow variants), pill
   `button-link` and `button` (primary dark, primary coral, quiet), `pill-label` (the small rounded labels:
   eyebrow, ARTICLE, CONCEPT), `section-heading` (label + heading + supporting sentence, heading left and sentence
   right on desktop), `icon` set (one consistent 1.5–2px line style; draw the ~14 icons the mockup needs as local
   SVG components — no icon package), `arrow-icon` variants. Keep `cn`.
4. **Shell**: restyle `site-header` (pill nav on the canvas, pill CTA, sticky behaviour preserved), `mobile-menu`
   (keep the current accessible behaviour: focus move, Escape, scroll lock, inert background), `site-footer`,
   `page-shell`, skip link and focus styles for the new surfaces.
5. **Canvas**: page background with the soft blurred purple/coral glow — implement with CSS gradients, no images,
   and keep it behind content with no effect on scrolling performance. Respect `prefers-reduced-motion` (no
   animated glow).
6. Keep every existing route rendering. Pages will look mixed until later stages — that is expected — but nothing
   may crash, lose copy, or lose its current accessibility behaviour.

Do not restyle page sections yet (Home, Services, Work, Contact, legal, not-found bodies come later).
Do not change copy, routes, slugs, form logic, metadata, sitemap, robots or the legal publication gate.

Finish with `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` all passing. Report changed files,
the token and typography decisions you made, and any contrast pairing you had to adjust.
