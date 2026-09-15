# Forgeline V1 — Content Brief

This brief supplements `software-agency-v1-implementation-spec.md` (the **spec**). It selects only the copy
from `software-agency-page-map-and-copy-en.md` (the **copy map**) that V1 needs, and resolves conflicts.

## 0. Source priority

1. **Spec** — structure, routes, sections, behavior, and any copy it defines verbatim. Always wins.
2. **This brief** — resolved decisions and extra copy the spec does not define.
3. **Copy map** — do not read or implement it directly. It describes ~120 pages; V1 has four.

Ignore from the copy map: every route other than `/`, `/services`, `/work`, `/contact` and the not-found screen;
`/case-studies` and concept detail routes, `/services/*`, `/guides/*`, `/webinars/*`, `/about-us`, `/hello`,
`/search`, `/careers`, `/contact/thank-you`, legal pages, Resources nav item, Technologies/Industries/Resources
footer columns, search, pagination, cookie UI, social links, compact home form, "Product design" filter.

## 1. Brand

| Field | Value |
| --- | --- |
| `COMPANY_NAME` | **Forgeline** |
| Wordmark | `Forgeline` followed by a coral `.` |
| Copyright | `© {current year} Forgeline. All rights reserved.` (year computed at build/render time) |
| Legal entity | Not supplied. Do not render one. No Organization schema. |

Keep the name in one constant (`src/content/site.ts`). No `[BRACKETED]` placeholders may render anywhere.

## 2. Shared shell

**Header** — as spec §6 (Services, Work, Approach, About; CTA "Discuss your project").
Mobile menu button accessible names: **Open menu** / **Close menu**. Nav landmark label: **Main navigation**.
Skip link: **Skip to main content**.

**Footer** — as spec §6, plus a description under the brand line:
> Product strategy, design and engineering for teams creating something new or improving what already works.

Legal column: Privacy Policy and Website Terms have no real pages in V1 → **hide the Legal column** until real
routes exist (spec §6: no dead links). Keep it as a commented-out/configurable entry in `navigation.ts`.
Back to top label: **Back to top**.

## 3. Home `/`

All copy from spec §7. Additions/decisions:

- Hero, services accordion descriptions, process copy: **use the spec wording** (copy map variants are older).
- Accordion toggles expose state via `aria-expanded`; visually-hidden helper text on the icon: **Expand details** /
  **Collapse details**.
- About section: no "How we work" link (its route does not exist in V1).
- Perspectives: no links (spec §7.5). Copy map guide links are dropped.
- Featured work link label: **View concept** (matches Work page cards).

## 4. Services `/services`

All copy from spec §8. The spec requires a one-line description per service row but does not supply it.
Use this table. `slug` is canonical everywhere (`/contact?service=<slug>`, concept chips, accordion).

| Group | Slug | Title | One-line description |
| --- | --- | --- | --- |
| product | `business-analysis` | Business analysis | Turn business complexity into clear requirements. |
| product | `discovery-workshops` | Discovery workshops | Agree on the problem before committing to the build. |
| product | `product-strategy` | Product strategy | Choose a direction your team can build on. |
| product | `product-design` | Product design | Design the product behind the screens. |
| product | `ux-ui-design` | UX/UI design | Make the next action obvious. |
| engineering | `web-development` | Web development | Build web products that support real work. |
| engineering | `mobile-development` | Mobile development | Make the important moments work on mobile. |
| engineering | `desktop-development` | Desktop development | Give specialist workflows a dedicated home. |
| engineering | `software-architecture` | Software architecture | Make the structure serve the product. |
| engineering | `qa-automated-testing` | QA and automated testing | Protect the workflows your users rely on. |
| systems | `ai-automation` | AI development and automation | Put AI to work on a clearly defined problem. |
| systems | `generative-ai` | Generative AI | Create useful AI experiences with clear boundaries. |
| systems | `cloud-solutions` | Cloud solutions | Make cloud decisions around the product you run. |
| systems | `cloud-devops` | Cloud engineering and DevOps | Make delivery and operations part of the same system. |
| systems | `legacy-modernization` | Legacy application modernization | Move forward without losing what already works. |
| team | `team-augmentation` | Team augmentation | Add the skills your team needs to move forward. |
| team | `client-enablement` | Client enablement | Build the capability to keep moving without us. |
| team | `knowledge-transfer` | Knowledge transfer | Keep the knowledge with the people who need it. |

Home accordion rows reuse these slugs with the spec's home titles and home descriptions:

| homeOrder | Slug | Home title |
| --- | --- | --- |
| 1 | `web-development` | Web development |
| 2 | `mobile-development` | Mobile applications |
| 3 | `ai-automation` | AI and automation |
| 4 | `ux-ui-design` | UX/UI and product design |
| 5 | `qa-automated-testing` | QA and automated testing |
| 6 | `cloud-devops` | Cloud and DevOps |
| 7 | `legacy-modernization` | Software modernization |
| 8 | `team-augmentation` | Team augmentation |

Situation selector → highlighted groups: Build a product → product, engineering; Improve an existing system →
engineering, systems; Strengthen your team → team.

## 5. Work `/work`

Hero, filters, empty text and CTA from spec §9. Additional state copy:

- Loading: **Loading concepts…**
- Error: **We could not load this content. Please try again.** Action: **Try again**
- Reset (shown in empty state): **Show all concepts**
- Under each expanded concept: **No delivery metrics or client outcomes are asserted for this concept.**

Card CTA: **View concept** (spec). Expanded section CTA: **Discuss a similar challenge** (spec).

### Concepts

Summary and category come from the spec table. Expanded-section content:

**`financial-workspace`** — Web
- Heading: Bring financial information into a clear workspace
- The scenario: Users need to understand activity and status without guessing how different records relate to each other.
- Proposed direction: The concept separates summary information, detailed activity and available actions. Every status has an explanation and an appropriate next step.
- Questions to validate: Can users locate an activity record and understand its state? / Does the interface distinguish available information from pending updates?
- Relevant services: `web-development`, `ux-ui-design`

**`everyday-mobile-service`** — Mobile
- Heading: Make a recurring activity easier to complete
- The scenario: A daily service loses value when users have to navigate too much before reaching the action they came for.
- Proposed direction: The concept gives the next activity priority, keeps progress understandable and makes notification preferences explicit.
- Questions to validate: Can a returning user complete the main action quickly? / Can they understand and change how reminders work?
- Relevant services: `mobile-development`, `ux-ui-design`, `product-design`

**`workflow-automation`** — Operations
- Heading: Make approvals and exceptions visible
- The scenario: Manual handoffs make it difficult to tell which work is waiting, why it is blocked and who can resolve it.
- Proposed direction: The concept provides a queue with explicit status, assigned ownership and a history of decisions, supported by configurable validation rules.
- Questions to validate: Can an operator identify a blocked item and its next action? / Is the reason for a decision available to an authorized reviewer?
- Relevant services: `ai-automation`, `business-analysis`, `web-development`

**`creative-production-tool`** — Desktop
- Heading: A desktop workspace for creative production
- The scenario: Creative teams need specialist tools that fit their review and iteration process.
- Proposed direction: The concept combines content organization, review notes and preview behavior in a focused desktop application with clear local-file handling.
- Questions to validate: Can a creator find the current version and collect feedback? / Does the tool recover clearly after an interrupted save?
- Relevant services: `desktop-development`, `product-design`

**`asset-processing-console`** — Web
- Heading: Make a complex processing pipeline understandable
- The scenario: Users need to configure work, follow progress and recover from failures without understanding every internal implementation detail.
- Proposed direction: The concept makes input requirements, processing stages and failure causes visible in a unified workspace.
- Questions to validate: Can a user explain why a job failed and safely retry it? / Can they distinguish a queued job from a stalled one?
- Relevant services: `web-development`, `software-architecture`, `cloud-devops`

**`delivery-flow-workspace`** — Operations
- Heading: Understand where delivery work waits
- The scenario: A busy team may have little visibility into blocked work and long review queues.
- Proposed direction: The concept makes work stages and waiting time visible while preserving context about scope, dependencies and rework.
- Questions to validate: Which stage accumulates waiting work? / Does a process change improve flow without moving problems elsewhere?
- Relevant services: `business-analysis`, `cloud-devops`

Concept artwork: original HTML/CSS/SVG compositions (or original raster images generated in-repo). Placeholder data
inside artwork must be neutral and obviously sample (e.g. "Account A", round sample figures); no real brands.

## 6. Contact `/contact`

All copy from spec §10. Additions from the copy map:

| Element | Text |
| --- | --- |
| Form heading (h2) | Tell us about your project. |
| Name placeholder | How should we address you? |
| Email placeholder | you@company.com |
| Company placeholder | Your company or project |
| Project placeholder | What are you trying to create or improve? Include any goals, constraints or questions you already have. |
| Timing placeholder | A target date or a rough timeframe |
| NDA checkbox label | I would like to discuss an NDA before sharing sensitive details. |
| Required / optional indicator | Required / Optional |
| Error summary heading | Check the highlighted fields. |
| Production not configured error | Project enquiries are not available right now. Please try again later. |

Left column "process summary" (h2 **What happens next**):
> We review your message and contact you to clarify the next step. If the work is a fit, we agree on the people who
> should join the conversation and any materials that would help.

Validation messages, success state and general error: **use spec wording** (spec §10.4, §10.6).
Privacy helper: plain text "We will use these details to respond to your enquiry." — the "Read our Privacy Policy."
sentence is omitted until a real policy route exists (spec §10.3).

### Form service option slugs and query mapping

Form options (value → label): `new-product` New product; `existing-product` Existing product; `web-development`
Web development; `mobile-application` Mobile application; `ai-automation` AI and automation; `ux-ui-product-design`
UX/UI and product design; `qa-automated-testing` QA and automated testing; `cloud-devops` Cloud and DevOps;
`team-augmentation` Team augmentation; `not-sure` Not sure yet.

`?service=<service slug>` → preselected option:

| Service slugs | Option |
| --- | --- |
| `business-analysis`, `discovery-workshops`, `product-strategy`, `desktop-development` | `new-product` |
| `legacy-modernization`, `software-architecture` | `existing-product` |
| `web-development` | `web-development` |
| `mobile-development` | `mobile-application` |
| `ai-automation`, `generative-ai` | `ai-automation` |
| `product-design`, `ux-ui-design` | `ux-ui-product-design` |
| `qa-automated-testing` | `qa-automated-testing` |
| `cloud-solutions`, `cloud-devops` | `cloud-devops` |
| `team-augmentation`, `client-enablement`, `knowledge-transfer` | `team-augmentation` |

Unknown values are ignored. `?project=<concept id>` behaves as spec §10.3.

## 7. Not-found screen

- H1: **This page is not here.**
- Text: The link may have changed, or the page may no longer be available.
- Primary: **Back to home** → `/`; Secondary: **Explore services** → `/services`
- Title: `Page Not Found | Forgeline`, `robots: noindex`.

## 8. Metadata

Use the spec §15 table with `[COMPANY_NAME]` = Forgeline. Work meta description:
"Explore illustrative web, mobile, desktop and operational product concepts from Forgeline."
