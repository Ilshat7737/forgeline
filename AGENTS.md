# AGENTS.md — Forgeline V1 website

## Sources of truth (in priority order)

1. `software-agency-v1-implementation-spec.md` — structure, routes, behavior, copy.
2. `docs/v1-content-brief.md` — brand name, extra copy, slugs, resolved conflicts.
3. `software-agency-v1-reference.png` — visual direction only (its text is Russian; site copy is English).

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

## Accessibility corrections to the spec palette

Measured WCAG contrast shows some spec pairings fail on light (lavender-100 / ivory) sections. Apply these tokens:

| Need | Dark sections (plum) | Light sections (lavender/ivory) |
| --- | --- | --- |
| Accent text / emphasis | `--color-coral-500` (7.3:1) | `--color-plum-900` or add `--color-coral-700: #a8322a` (5.5:1) |
| Error text & error border | `--color-error` `#ff5f5f` (6.3:1) | add `--color-error-strong: #b3261e` (5.4:1) |
| Focus outline | `--color-focus` `#ff9b91` | `--color-plum-900` (14:1) |
| Primary button | coral bg + plum text (6.8:1) | same — fill contrast is fine |

Never set coral-500/600 text or 1px coral outlines on lavender-100/ivory.

## Working rules

- Work only on the stage you were asked to do. Finish with lint, typecheck, test, build passing.
- Visitor-facing copy lives in `src/content/*.ts` (typed). Components do not hard-code copy.
- One `h1` per page, headings in order, semantic landmarks.
- Respect `prefers-reduced-motion`. Never hide content before hydration.
- Do not run `git push`, do not commit — the reviewer commits after each stage.
- End each stage with a short report: changed files, check results, open questions.
