# Redesign stage 5 — Contact, legal pages and not-found in Concept 02

Read `AGENTS.md`, `docs/redesign-brief.md`, spec §10 for the copy, and reuse the design system and patterns from
redesign stages 1–4. This is the last page-level stage.

## Stage 4 review fix (do this first, across all pages)

Sentence case is currently faked in CSS: content strings are still uppercase and `home.css`, `services.css` and
`work.css` apply `text-transform: lowercase` with an `::first-letter { text-transform: uppercase }` override. A
heading that contains two sentences therefore renders wrong — `/work` shows **"Product problems. clear
directions."** — and screen readers still receive the uppercase source string, which some spell out letter by letter.

Fix it at the content level:

1. Rewrite the affected strings in `src/content/*.ts` in real sentence case (for example `"Product problems. Clear
   directions."`, `"We build software. You move your business forward."`, `"Your challenge. Our team."`,
   `"Choose the support your product needs."`, `"Where are you now?"`, `"Tools follow the product."`,
   `"Not sure where to start?"`, `"How we begin."`, the Home hero lines and the Services hero emphasis).
   Keep the wording identical — change only letter case. Page titles and meta descriptions already use normal case
   and must not change.
2. Delete the `text-transform` / `::first-letter` pairs from all three stylesheets. Small uppercase pill labels and
   section labels keep their own uppercase styling.
3. Check every page afterwards for headings that still read wrong, including the Services hero emphasis fragment
   (the coral highlight must still cover exactly the same words).

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
