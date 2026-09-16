# Redesign stage 8 — Approach and About as standalone pages

Read `AGENTS.md`, `docs/redesign-brief.md` and spec §6, §12, §14, §15. Run this **after** redesign stage 7.
`Approach` and `About` become standalone routes (`/approach`, `/about`); Home retains both sections as teasers.

## Routes

- `/approach` — "Our approach"
- `/about` — "About us"

Both use the Concept 02 card language already built for Services, Work and Contact: card hero (dark or coral),
section-heading blocks, rotating card surfaces, pill controls, cube/slab artwork where a card needs a visual.

## Copy — use exactly these strings, do not invent claims

All copy below is either already approved on the site or comes from the approved content source. Put it in typed
content files (`src/content/approach.ts`, `src/content/about.ts`) and add both pages to `docs/v1-content-brief.md`.

### `/about`

- Title: `About Us | Forgeline`
- Meta description: `We help businesses turn complex requirements into software people can use and teams can maintain.`
- Eyebrow: `ABOUT`
- H1: `A team that connects product thinking with engineering.`
- Introduction: `We help businesses turn complex requirements into software people can use and teams can maintain.`
- Sections:
  - **Why we do this** — `A useful product needs more than a feature list. It needs a clear problem, considered trade-offs and people who take responsibility for what happens after release. That is the kind of work we want to do.`
  - **Clarity before activity** — `We ask questions, document decisions and explain the consequences of technical choices. Progress should be understandable to the people responsible for the business.`
  - **Ownership through delivery** — `We consider implementation, testing, deployment and operation together. The goal is working software with a team that understands how to change it.`
  - **A stronger team at the end** — `We share context and knowledge throughout the engagement. Your team should gain capability as the product develops.`
  - **The people behind the work** — `Product, analysis, design, engineering and quality work together around the same outcome.`
    **No team cards, photos, names, roles or headcount** — there are no approved staff details. Do not add placeholders for them.
  - Also reuse the existing Home "Your challenge. Our team." paragraph and its `PRODUCT THINKING / DESIGN / ENGINEERING / QUALITY` note from `src/content/home.ts` rather than rewriting them.
- CTA card: heading `Start with a conversation`, body `Tell us what your team is working through. We will be direct about where we can help and what we need to understand first.`, button `Meet your delivery partner` → `/contact`.

### `/approach`

- Title: `Our Approach | Forgeline`
- Meta description: `A clear process, from the first conversation to the start of development.`
- Eyebrow: `HOW WE WORK`
- H1: `How we work.`
- Introduction: reuse `homeLayout.processSupporting` (`A clear process, from the first conversation to the start of development.`)
- Sections, all from existing typed content — import it, do not copy the strings:
  - **How we begin** — the four steps from `home.process.steps` as the existing process cards.
  - **Delivery principles** — the three principles from `servicesPage.principles` (they stay on `/services` too; share the same content object, never duplicate the strings).
- CTA card: reuse the Home contact band copy (`home.contact`) with its button to `/contact`.

## Home, navigation and links

- Home keeps both blocks as **teasers**: the value statement gains a link `About us` → `/about`, the process
  section gains `Our approach` → `/approach`, in the same style as the existing "View all services" / "View all
  work" links. Do not shorten or rewrite the blocks themselves.
- Remove the now-unused `id="about"` / `id="approach"` anchors and the scroll-offset handling that existed for them.
- `src/content/navigation.ts`: `Approach` → `/approach`, `About` → `/about`, in the header, the mobile menu and the
  footer. Update every other internal reference to the former Home fragments in the repo, including
  `docs/v1-content-brief.md`.
- Both routes get `pageMetadata(...)` with canonical, Open Graph and Twitter, and both are added to
  `src/app/sitemap.ts`. The placeholder guard test must keep passing.

## Checks

Lint, typecheck, tests and production build. Confirm in the generated HTML: one `h1` per new page, correct heading
order, unique landmark labels, both routes return 200, the header marks the current route with `aria-current`, and
no link anywhere still points at the former Home About or Approach fragments.

Report changed files, the structure you chose for each page, and any contrast pairing you adjusted.
