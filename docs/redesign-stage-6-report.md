# Concept 02 — Stage 6 report

Implemented cleanup, the new Open Graph image, a desktop 3 + 2 service arrangement, shared artwork treatments, and accessibility fixes. Automated verification passes. Browser visual, responsive and performance verification remains blocked by the sandbox, as detailed below.

## Changes

- Removed the unrendered `PageHero`, its stylesheet and all three dead hero `emphasis` fields/types. Removed `SectionLabel`, whose only consumer was `PageHero`, and the unused `Button` renderer; its still-used appearance type now lives with `ButtonLink`.
- Migrated the remaining artwork font alias to inherited Manrope. Removed both temporary font aliases, unused display/spacing/layout/color/radius/shadow tokens and Tailwind aliases, `content-grid`, `.page-heading`, and the obsolete uppercase-heading override. Migrated live `primary`/`secondary` button names and the `light` surface alias before deleting their compatibility styles.
- Five-service groups use six desktop tracks: the first three cards span two tracks each, the final two span three. The three-service group fills a single row. Tablet keeps two columns from 640px; mobile keeps one. All 18 links, icons, titles and descriptions remain, with one coral card per group.
- Redrew the 1200 × 630 Open Graph image with a light glow, coral/lavender/plum cards, cube artwork and the Forgeline wordmark. The `home.hero.lines.join(" ")` exported alt contract and existing page metadata remain unchanged. A local, licensed, static Manrope 700 ASCII subset avoids runtime font requests for image generation. The built PNG was visually inspected; Next's output trace includes its font asset.
- Consolidated the current product artwork styles into the shared baseline and removed superseded transforms/backgrounds. Moved artwork into the components cascade layer so Home's scoped preview styles can take effect. All cube, slab and product compositions now expose one container image label with hidden decorative descendants.
- Icons, including previous Unicode check/arrow/sparkle glyphs, use rounded 1.75px strokes on a 24px coordinate system. Technology mark outlines use the equivalent 3.5px stroke on their 48px system. Geometry edge highlights and the filled Python logo remain artwork, rather than line icons.
- Outer cards use the same 24px radius and soft shadow. Inner tiles remain 16px and flat; the menu keeps its raised overlay shadow. Native miniature product UI corners continue to scale with the artwork.
- Added inset focus rings to the dark Home service/scroll links; coral buttons now have plum borders. Increased the privacy link target to 44px. Removed the desktop hero's forced nonwrapping text. Removed redundant named form/technology regions and the extra legal aside landmark, and gave mobile navigation a distinct label.

## Performance and accessibility evidence

The production client-reference manifests contain only these application entry points:

| Route | Client entry points |
| --- | --- |
| `/` | Mobile menu, shared enquiry form |
| `/services` | Mobile menu, service selector |
| `/work` | Mobile menu, work filter |
| `/contact` | Mobile menu, shared enquiry form |

`ContactSuccess` remains client code inside the forms because it focuses the success heading. Artwork and static page sections are server components. All four configured Manrope weights are used: 400 for body copy, 500 for labels/artwork, 600 for controls, and 700 for headings. The web font configuration still uses `next/font/google`, Latin preload and `display: swap`.

Below-fold product compositions, scattered cubes and slabs use `content-visibility: auto`; explicit aspect ratios reserve their dimensions. Removed the Work artwork's fixed 250px intrinsic placeholder in favor of its actual aspect ratio. Above-fold hero artwork remains eagerly painted. This defers browser layout/paint, not the server generation or HTML transfer of native artwork.

Rendered HTML checks passed for `/`, `/services`, `/work`, `/contact` and a standalone missing route: one h1, no skipped heading levels, unique IDs and named landmarks, valid ARIA references, labelled artwork with hidden descendants, one main landmark and a skip link. Separate development HTML checks passed for both legal drafts, including heading order, IDs, noindex and contents anchors. Both legal routes still return 404 in production and remain absent from footer links and sitemap.

All 18 service links, eight Home service links, six concepts, one accent per service group, nonlinked articles, internal routes and concept anchors were checked. Existing tests cover menu focus/closing behavior, selector keyboard interactions, filters and both forms' validation, pending, failure and success states. Tests were updated for the distinct mobile landmark label and the artwork container semantics.

## Final contrast measurements

Reproduce with `node scripts/contrast-audit.mjs`. Uses WCAG sRGB relative luminance, testing unrounded results against 4.5:1 for text and 3:1 for control boundaries/focus. Text/icon columns use the stricter text threshold. Canvas values below are conservative minima with all three glow layers at maximum opacity at once; the actual gradient varies by position. Disabled controls and decorative chart/cube fills are not meaningful control boundaries.

| Surface | Text / icons | Muted text | Accent | Error | Control boundary | Focus |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Canvas + strongest combined glow | 11.42:1 | 5.00:1 | 4.70:1 | 4.61:1 | 3.64:1 | 10.92:1 |
| White | 15.70:1 | 6.88:1 | 6.46:1 | 6.34:1 | 5.00:1 | 15.01:1 |
| Lavender | 13.15:1 | 5.76:1 | 5.41:1 | 5.31:1 | 4.19:1 | 12.58:1 |
| Dark plum | 14.65:1 | 9.83:1 | 6.70:1 | 8.49:1 | 3.04:1 | 12.36:1 |
| Coral | 6.70:1 | 5.06:1 | 6.70:1 | 6.70:1 | 6.70:1 | 6.70:1 |

| Additional pairing | Minimum contrast |
| --- | ---: |
| Coral button text, normal / hover (minimum) | 5.69:1 |
| Dark button / selected filter text, normal / hover (minimum) | 12.05:1 |
| Quiet button text, normal / hover (minimum) | 12.58:1 |
| Dark badge text | 12.05:1 |
| Hero artwork note, darkest gradient stop | 8.64:1 |
| Field placeholder (66% ink on white) | 5.18:1 |
| Submission failure text on 8% error tint, white / lavender (minimum) | 4.70:1 |
| OG wordmark on darkest glow stop | 11.34:1 |
| OG wordmark dot on darkest glow stop | 4.88:1 |

Coral surfaces continue to use plum text. Accent/error text on light cards uses the strong dark tokens. Neutral outer card separators are decorative; link text and measured focus rings identify interactivity. Existing palette tokens already pass; the boundary and focus fixes change which passing colors are used rather than introducing a new palette.

## Checks and remaining verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 13 files / 113 tests.
- `npm run build`: passed.
- `node scripts/contrast-audit.mjs`: passed.
- `git diff --check`: passed.
- Production HTTP/HTML, build manifests, Open Graph dimensions/font tracing, and legal draft HTML: checked as described above.

Chromium launch failed before loading a page: macOS denied `bootstrap_check_in ... MachPortRendezvousServer` with `Permission denied (1100)`. Browser checks at 320/375/768/1024/1280/1440px, 200% zoom, actual focus visibility/clipping, no horizontal overflow, hydration behavior and reduced-motion presentation therefore remain **unverified in a browser**. CSS constraints, target sizes and reduced-motion rules were reviewed, but this is not a substitute for rendering. Lighthouse and measured LCP/CLS/INP are also pending; no performance score or zero-CLS claim is made.

No approval was requested because this environment does not allow sandbox escalation. Complete those visual checks in an environment that can launch a browser before considering final visual sign-off complete.

## Deliberately retained

- Approved English copy, service/query contracts, six illustrative concepts, sample technology/progress/product artwork, and the nonlinked article treatment.
- The legal publication gate and production form's fail-closed behavior. No submission provider, legal facts, claims, pages or external links were invented.
- `cn`, the shared artwork files, live plum/lavender/ivory tokens, and the raised menu shadow: repository searches confirmed live consumers. Historical briefs/specifications/reports and the previous mockup asset remain reference documents; the previous mockup was not used for implementation.
- The existing Next.js legal-route 404 fallback behavior. The legal drafts were audited in development and the standalone not-found page in production; browser behavior of the gated legal URLs remains part of the pending browser review.
- No dependency changes, commits or pushes.

## Changed files

- `src/app/not-found.tsx`
- `src/app/opengraph-image.tsx`
- `src/components/contact/contact-success.tsx`
- `src/components/contact/enquiry-form.tsx`
- `src/components/home/hero.tsx`
- `src/components/home/home-composition.test.tsx`
- `src/components/home/studio-artwork.tsx`
- `src/components/home/studio-strip.tsx`
- `src/components/home/technology-mark.tsx`
- `src/components/layout/mobile-menu.test.tsx`
- `src/components/layout/mobile-menu.tsx`
- `src/components/legal/legal-document.tsx`
- `src/components/services/technology-strip.tsx`
- `src/components/ui/button-link.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/icon.tsx`
- `src/components/work/artwork/artwork.css`
- `src/components/work/artwork/concept-artwork.tsx`
- `src/components/work/artwork/everyday-mobile-artwork.tsx`
- `src/components/work/artwork/financial-workspace-artwork.tsx`
- `src/components/work/work-hero.tsx`
- `src/content/contact.ts`
- `src/content/home-layout.ts`
- `src/content/navigation.ts`
- `src/content/services.ts`
- `src/content/work.ts`
- `src/styles/contact.css`
- `src/styles/globals.css`
- `src/styles/home.css`
- `src/styles/services.css`
- `src/styles/tokens.css`
- `src/styles/work.css`
- `scripts/contrast-audit.mjs`
- `src/assets/fonts/manrope-latin-700.ttf`
- `src/assets/fonts/OFL.txt`
- `src/assets/fonts/README.md`
- `docs/redesign-stage-6-report.md`

## Deleted files

- `src/components/layout/page-hero.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/section-label.tsx`
- `src/styles/page-hero.css`
