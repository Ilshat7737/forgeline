# Redesign stage 6 — Cleanup, artwork consistency and final verification

Read `AGENTS.md`, `docs/redesign-brief.md` and spec §14–§16, §18–§19. All routes are now in Concept 02.

1. **Remove Concept 01 leftovers**: unused tokens, classes, CSS files and components from the previous direction,
   the temporary font aliases (`--font-barlow-condensed`, `--font-inter`) once nothing references them, and any
   dead utility left behind by the page stages. Do not remove anything still in use — verify with a repo-wide
   search, not assumption.
2. **Open Graph image**: redraw `src/app/opengraph-image.tsx` in Concept 02 — light canvas with the soft glow, a
   card composition, Manrope-like bold heading, coral accent, Forgeline wordmark. Keep 1200×630 and the existing
   alt text contract.
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
