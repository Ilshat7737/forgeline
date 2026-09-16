# Concept 02 — Stage 1 report

The design foundation and shared shell now use Concept 02. Page sections, content, form behaviour, metadata and the legal publication gate retain their existing implementation.

## Design decisions

- **Font:** Manrope through `next/font/google`, Latin subset, weights 400/500/600/700, `display: swap`. Both heading and body styles use this family. Temporary aliases for the old font variables keep existing sections working without loading either old font.
- **Type scale:** display sizes 40–76px / 36–64px / 32–52px; section headings 28–44px; smaller headings 20–24px; body 16px and 18–20px; supporting text 14px; labels 12px. New headings use 1.06–1.25 line heights, bold weight and modest negative tracking. No new uppercase display treatment. Existing uppercase strings remain verbatim because content changes are outside this stage.
- **Surfaces:** canvas `#f5f0f7`, white `#fffaff`, lavender `#ece4fc`, dark plum `#2b2033`, coral `#ff8977`. Canvas glows use three static radial gradients with maximum opacities of 12%, 16%, 12%. No images, blur filters or animation.
- **Spacing:** added a 4px-based scale through 64px; retained the existing 8px Tailwind unit for compatibility. Grid gaps 12–24px, responsive card padding 20–40px, page margins 16–32px, content maximum 1440px.
- **Geometry:** cards 24px, tiles 16px, fields 14px, pills fully rounded. Three soft shadow levels remain decorative. Controls use distinct border tokens and visible focus outlines.
- **Icons:** fourteen original 24px SVG drawings, rounded 1.75px strokes. Arrows share that style, with six directions and a long downward variant. Icons are decorative by default; `Icon` accepts a label for meaningful standalone use.
- **Motion:** 180ms control colour changes and a 3px arrow shift. Reduced motion disables transitions, arrow movement and smooth scrolling.

## Contrast audit

WCAG relative-luminance calculations from the final tokens. All ratios below are standard text pairings, including muted labels. Meaningful icons inherit the same text colours.

| Surface | Main text | Muted text | Accent | Error | Focus ring |
| --- | ---: | ---: | ---: | ---: | ---: |
| White | 15.70:1 | 6.88:1 | 6.46:1 | 6.34:1 | 15.01:1 |
| Lavender | 13.15:1 | 5.76:1 | 5.41:1 | 5.31:1 | 12.58:1 |
| Dark plum | 14.65:1 | 9.83:1 | 6.70:1 | 8.49:1 | 12.36:1 |
| Coral | 6.70:1 | 5.06:1 | 6.70:1 | 6.70:1 | 6.70:1 |
| Canvas, before glow | 14.40:1 | 6.31:1 | 5.92:1 | 5.82:1 | 13.77:1 |

Adjustments made:

- Lightened the initial lavender choice from `#e5d3fa` to `#ece4fc`: the required `#a8322a` accent improves from 4.76:1 to **5.41:1**. Light surfaces use that accent and `#b3261e` error text.
- Replaced the mockup's faint labels with `#61536c` on light surfaces, `#d7c9e2` on dark plum, and `#493047` on coral.
- Coral always carries dark plum text. The darker coral button hover fill still provides **5.69:1**.
- Reduced glow opacity after checking a conservative case where all three gradients reach maximum opacity at once. Even that darker bound provides **5.00:1** for muted text, **4.70:1** for accent text and **4.61:1** for errors.
- Control borders measure 5.00:1 on white, 4.19:1 on lavender and 3.04:1 on dark plum. Coral surfaces use the dark plum control border (6.70:1). Decorative card borders and dividers are separate tokens.
- Pill labels use lavender behind dark text, plum-800 behind light text on dark cards, and white behind dark text on coral cards.

## Primitives

- `Card`: semantic `as`, four `surface` variants, four padding sizes, card/tile radius and optional shadow levels.
- `Button` / `ButtonLink`: `primary-dark`, `primary-coral`, `quiet`; retain `primary` / `secondary` compatibility. Native buttons default to `type="button"`. Optional arrow direction or no arrow. `surface` describes the surrounding surface for focus; otherwise it inherits.
- `PillLabel`: eyebrow and uppercase tag variants; text comes from callers.
- `SectionHeading`: label, h2/h3 with optional id, supporting sentence; two columns on desktop.
- `Icon` / `ArrowIcon`: local SVG only. No client boundary or dependency added.

## Changed files

- `src/styles/tokens.css`
- `src/styles/globals.css`
- `src/app/layout.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/mobile-menu.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/layout/page-shell.tsx`
- `src/components/ui/button-link.tsx`
- `src/components/ui/arrow-icon.tsx`
- New: `src/components/ui/card.tsx`
- New: `src/components/ui/button.tsx`
- New: `src/components/ui/pill-label.tsx`
- New: `src/components/ui/section-heading.tsx`
- New: `src/components/ui/icon.tsx`
- This report.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: 13 files, 95 tests passed, including menu focus, Escape, scroll locking, inert background and sticky header coverage.
- `npm run build`: passed.
- Production HTTP checks: all four main routes return 200 with one h1 and the shared landmarks. Unknown route returns 404. Both unpublished legal routes retain 404/noindex.
- New primitives rendered successfully to static HTML; checked native button type, heading semantics and decorative SVG attributes.
- Browser launch failed in this environment before a page could open. Responsive visual checks at 320/375/768/1024/1280/1440px and 200% zoom remain unverified. No browser screenshot or performance score is claimed.

No open content or design questions. Existing page bodies intentionally retain their previous layouts until their redesign stages.
