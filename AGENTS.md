# AGENTS.md — Forgeline website

## Sources of truth (in priority order)

1. `docs/redesign-brief.md` — the approved visual direction, **Concept 02 "Modular studio"**. It replaces the
   visual sections of the V1 spec (§3, §5 and the visual parts of §6–§10).
2. `redes-new.png` — the Concept 02 mockup (Home only; its text is Russian, the site stays English).
3. `software-agency-v1-implementation-spec.md` — routes, page structure, copy, form behaviour, accessibility,
   SEO and performance. Its visual rules are superseded by 1–2.
4. `docs/v1-content-brief.md` — brand name, extra copy, service slugs, resolved content conflicts.

`software-agency-v1-reference.png` is the **previous** direction (Concept 01) and must not be used any more.

Do **not** read or implement `software-agency-page-map-and-copy-en.md`; everything V1 needs from it is already in
the content brief. Never add pages, claims, numbers, testimonials, logos or links not defined in 1–2.

## Stack

Next.js (App Router, latest stable) · TypeScript strict · Tailwind CSS with CSS custom-property tokens ·
`next/font/google` (Barlow Condensed, Inter) · React Hook Form + Zod · Vitest. npm as package manager.
No component or icon libraries. Server components by default; `"use client"` only for interactive pieces.

## Commands (must pass before a stage is done)

```
npm run lint
npm run typecheck   # tsc --noEmit
npm run test        # vitest run
npm run build
```

## Accessibility rules for the Concept 02 surfaces

Concept 02 puts text on four card surfaces (white, lavender, dark plum, coral) over a light canvas. Every pairing
must be measured, not assumed:

- Body and label text ≥ 4.5:1; large text (≥ 24px bold / 32px regular) and meaningful icons ≥ 3:1.
- Coral surfaces carry **dark plum text**, never white or light lavender text.
- On white and lavender cards, accents and error text use the dark tokens (`--color-coral-700` `#a8322a` ≥ 5.4:1,
  `--color-error-strong` `#b3261e`), never coral-500/600.
- The mockup's muted grey supporting sentences and section labels are too light: darken them until they pass 4.5:1
  on the actual card or canvas colour behind them.
- Focus rings must stay visible on all four surfaces: dark ring on light surfaces, light ring on dark ones.
- Soft shadows and blurred glows are decorative only; never rely on them to separate interactive elements.

## Working rules

- Work only on the stage you were asked to do. Finish with lint, typecheck, test, build passing.
- Visitor-facing copy lives in `src/content/*.ts` (typed). Components do not hard-code copy.
- One `h1` per page, headings in order, semantic landmarks.
- Respect `prefers-reduced-motion`. Never hide content before hydration.
- Do not run `git push`, do not commit — the reviewer commits after each stage.
- End each stage with a short report: changed files, check results, open questions.
