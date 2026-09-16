# Task R9 — Repeating scroll-reveal animation across the site

**Implementer: Claude** (the owner asked for this one to be done in Claude, not Codex.)
Run after R6, R7 and R8 are reviewed and committed.

## Goal

Blocks animate into view as the visitor scrolls, **every time** they enter the viewport — not once per page load.
The site should feel alive but stay comfortable to read and use.

## Reference patterns

Taken from the most repeated results in the 21st.dev catalogue (searched 2026-09-16):

| Pattern | 21st.dev examples | How we reproduce it |
| --- | --- | --- |
| Scroll reveal wrapper | `cnippet-dev/scroll-reveal`, `asanshay/reveal` | `fade-up`: opacity 0 → 1, `translateY(14px)` → 0 |
| Staggered grid | `cnippet-dev/scroll-reveal` (stagger prop) | children delayed by index, ≤ 60ms apart, capped at 6 steps |
| Word stagger heading | `tom_ui/words-stagger`, `ddoemonn/text-reveal` | section headings revealed word by word |
| Blur reveal | `tom_ui/blur-reveal`, `educalvolpz/soft-blur-in` | used sparingly: page hero heading only, small blur radius |

The owner chose the **restrained** intensity: no large travel, no heavy blur on big areas, no parallax, no
scroll-driven scrubbing.

## Technique (decided with the owner)

CSS + a single `IntersectionObserver`. **No new dependencies** — Motion is not installed.

- `src/components/ui/reveal.tsx`: one small `"use client"` wrapper (`<Reveal variant="fade-up" | "stagger" | "words">`).
  Children stay server-rendered — the wrapper only marks the element.
- One shared observer instance for the whole page (module-level), elements registered on mount, unregistered on
  unmount. `threshold ≈ 0.15`, `rootMargin ≈ "0px 0px -10%"`.
- **Repeat:** the observer is not `once`. Entering adds the visible state, leaving removes it, so the animation
  replays on the next entry.
- **No-JS and pre-hydration safety:** the hidden state is applied only after the client marks the document
  (`document.documentElement.dataset.reveal = "on"`). Without JS, or before hydration, everything renders fully
  visible. Never hide content waiting for JavaScript.
- **Reduced motion:** if `matchMedia("(prefers-reduced-motion: reduce)")` matches, the observer is never armed and
  the document is never marked, so nothing animates and nothing is hidden. The CSS also disables the transitions
  under the same media query as a second line of defence.
- **Focus safety:** `:focus-within` forces the visible state immediately, so keyboard users never focus an element
  that is mid-animation or transparent.
- Animate only `opacity` and `transform` (plus a small `filter: blur()` on the hero heading). Durations 350–600ms,
  `ease-out`. Nothing animates layout properties.

## Where it applies

- **Yes:** Home, Services, Work, Contact, Approach, About — section cards, grids, heroes, headings.
- **No:** `/privacy-policy` and `/terms-of-service` (documents stay static, per the owner).
- **Never animate:** the sticky header, the mobile menu, form fields and their labels, validation errors, the error
  summary, the success state, and any control while the visitor may be interacting with it.
- Grids stagger their cards; a section reveals its heading and its cards, not every paragraph.

## Checks

1. `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
2. Unit tests: the delay helper (index → delay, capped) and that the wrapper renders children unchanged when
   reduced motion is on.
3. Browser at 1440 and 375: scroll down and back up and confirm the animation replays; confirm no layout shift
   (cards reserve their space), no horizontal overflow, and that the header, menu and form never move.
4. Emulate `prefers-reduced-motion: reduce` and confirm everything is visible and static.
5. Disable JavaScript and confirm the whole site still renders fully visible.
6. Confirm the legal pages have no reveal markup at all.

Report what was added, the variants used per page, and the verification results.
