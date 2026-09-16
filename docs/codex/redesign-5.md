# Redesign stage 5 — Contact, legal pages and not-found in Concept 02

Read `AGENTS.md`, `docs/redesign-brief.md`, spec §10 for the copy, and reuse the design system and patterns from
redesign stages 1–4. This is the last page-level stage.

## `/contact` — approved layout (owner-reviewed)

```
[ dark hero card: eyebrow pill, h1, intro ]

[ one wide lavender card:
  left  — "What happens next" heading, paragraph, the three supporting points, cube artwork
  right — the full enquiry form on a white inner card ]
```

Requirements:

1. Keep the whole form contract unchanged: fields and labels, Required/Optional indicators, placeholders, Zod
   validation and messages, `aria-describedby` error wiring, error summary that takes focus, honeypot, pending
   state, `role="alert"` failure message, fail-closed production behaviour, success state that takes focus, and
   `?service=` / `?project=` prefill. Restyle only — pill submit button, rounded fields (~14px), checkbox chips on
   the new surfaces.
2. Field and error contrast must pass on the white inner card; keep the dark error token.
3. One column below 900px, inputs ≥ 16px, touch targets ≥ 44px.
4. Share components with the Home short form rather than duplicating them.

## Legal pages (`/privacy-policy`, `/terms-of-service`)

Restyle inside the existing publication gate — do not touch `src/content/legal.ts`, `src/lib/legal.ts` or the
404-in-production behaviour. Layout: hero card, then a wide white card containing the sticky contents list
(left, lavender inner tile) and the document body (right). Keep the "Needs legal input" markers legible and clearly
non-final in development.

## Not-found screen

One centred card on the canvas: eyebrow pill, heading, text, pill primary "Back to home" and quiet pill
"Explore services". Keep the `noindex` metadata.

Finish with lint, typecheck, test, build passing. Report changed files and confirm the form contract is unchanged.
