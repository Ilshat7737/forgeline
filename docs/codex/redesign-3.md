# Redesign stage 3 — Services page in Concept 02

Read `AGENTS.md`, `docs/redesign-brief.md`, spec §8 for the copy, and reuse the design system and Home patterns
from redesign stages 1–2. `redes-new.png` shows the approved language (Home); this page reuses it.

Approved layout for `/services` (owner-reviewed):

```
[ hero card (coral): eyebrow pill, h1, intro, pill CTA ]  [ lavender card: 3D cube artwork ]

section heading: WHERE ARE YOU NOW?
[ three large pill tabs: Build a product | Improve an existing system | Strengthen your team ]
[ selected situation paragraph ]

01 Product strategy and design      (section heading block + supporting sentence)
[ 5 service cards in a grid, surfaces rotating, one accent card per group ]
02 Software engineering  → same pattern
03 AI, cloud and modernization → same pattern
04 People and ownership → same pattern

[ wide dark card: TOOLS FOLLOW THE PRODUCT + technology row ]
[ 3 principle cards ]
[ coral CTA card: NOT SURE WHERE TO START? + pill button ]
```

Requirements:

1. Keep every service card linked to `/contact?service=<slug>` with the service title in its accessible name, and
   keep all 18 services and their one-line descriptions from `src/content/services.ts`.
2. Keep the situation selector behaviour built in the previous design: ARIA tabs with arrow-key navigation when
   JavaScript runs, all three paragraphs visible and no group dimmed without it, related groups marked with a
   visible text marker as well as colour. Restyle it as pill tabs; keep the existing unit tests passing (update
   them only if the DOM structure genuinely changed).
3. Service group headings keep their numbers (01–04) and use the new section-heading block.
4. Technology row: no auto-scroll, horizontal swipe with a visible end cue on small screens, focusable scroll
   container, page never scrolls horizontally.
5. Grid responsiveness: 4 columns desktop, 2 tablet, 1 mobile, with no card below 44px touch targets.

Do not change copy, slugs, routes or metadata. Finish with lint, typecheck, test, build passing, and report changed
files plus any contrast pairing you adjusted.
