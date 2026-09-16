# Redesign stage 6 — Cleanup, artwork consistency and final verification

Read `AGENTS.md`, `docs/redesign-brief.md` and spec §14–§16, §18–§19. All routes are now in Concept 02.

0. **Dead `emphasis` content fields**: the Concept 02 heroes no longer highlight a fragment of the heading (the
   coral card replaced that treatment), so `emphasis` in `servicesPage.hero`, `workPage.hero` and
   `contactPage.hero`, the `emphasis` prop in `page-hero.tsx` and the `.page-hero__emphasis` styles are unused.
   Verify with a repo-wide search, then remove them together with `page-hero.tsx` itself if nothing renders it.
1. **Remove Concept 01 leftovers**: unused tokens, classes, CSS files and components from the previous direction,
   the temporary font aliases (`--font-barlow-condensed`, `--font-inter`) once nothing references them, and any
   dead utility left behind by the page stages. Do not remove anything still in use — verify with a repo-wide
   search, not assumption.
2. **Open Graph image**: redraw `src/app/opengraph-image.tsx` in Concept 02 — light canvas with the soft glow, a
   card composition, Manrope-like bold heading, coral accent, Forgeline wordmark. Keep 1200×630 and the existing
   alt text contract.
2b. **Services grid rhythm**: groups with five services currently wrap as 4 + 1 on desktop, leaving three empty
   columns under the last card. Give those groups a deliberate arrangement instead — for example a wider first or
   last card, a 3 + 2 split, or a span rule that fills the row — while keeping every card's link, icon, title and
   description, one accent card per group, and the 2-column tablet / 1-column mobile behaviour.
3. **Icon and artwork consistency**: one stroke style across all icons; every decorative composition
   `aria-hidden` with a single accessible label on its container; identical card radii and shadow levels across
   pages.
4. **Performance**: confirm only the interactive pieces are client components (mobile menu, service selector, work
   filter, both forms); keep below-the-fold artwork lazily rendered; only used Manrope weights loaded; explicit
   aspect ratios so the bento grid does not shift (CLS).
5. **Accessibility sweep** across `/`, `/services`, `/work`, `/contact`, both legal drafts and the not-found
   screen: one h1 per page, heading order, unique landmark labels, visible focus on every surface, 44px targets,
   `prefers-reduced-motion`, 200% zoom, and no horizontal scroll at 320/375/768/1024/1280/1440px.
6. **Re-measure contrast** for every pairing that changed during stages 2–5 and fix anything below 4.5:1 for text
   or 3:1 for large text, meaningful icons and control borders.
7. Run lint, typecheck, test and build; fix anything the redesign broke.

Report: changed files, what you deleted, the final contrast table, and anything you deliberately left as is.
