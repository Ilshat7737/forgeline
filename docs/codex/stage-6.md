# Stage 6 — SEO, metadata, hardening and final checks

Read `AGENTS.md`, spec §15, §16, §18, §19. All four pages exist.

1. Metadata — confirm each route's title/description from spec §15 (Forgeline). Canonical URLs from
   `NEXT_PUBLIC_SITE_URL` via `alternates.canonical`. Open Graph + Twitter title/description on every page.
2. Open Graph image — an original 1200×630 image via `src/app/opengraph-image.tsx` (`next/og`): plum-950 ground,
   oversized Barlow-style condensed headline "WE BUILD SOFTWARE." with the coral second line, Forgeline wordmark.
   Do not use the reference PNG.
3. `src/app/robots.ts` and `src/app/sitemap.ts` for `/`, `/services`, `/work`, `/contact` only (no filtered URLs).
   No Organization, Review, AggregateRating or Project schema.
4. Production guard — a unit test or build-time check that no rendered copy or content file contains `[` + upper-case
   placeholder tokens such as `[COMPANY_NAME]`, and that the development enquiry adapter cannot be selected when
   `NODE_ENV=production`.
5. Performance — verify only menu, accordion, service selector, work filter and contact form are client
   components; remove unused font weights; below-the-fold artwork does not ship large DOM/JS on first load;
   explicit aspect ratios everywhere (CLS).
5b. The "CSS chunk was preloaded using link preload but not used within a few seconds" console warning still
   appears on `/services` and `/work` in `next start` after stage 4 moved imports. Investigate the root cause
   (per-route CSS imports vs. one global stylesheet, Next.js CSS chunking) and resolve it without regressing
   first-load CSS size. If it is a known framework behavior that cannot be fixed cleanly, document why in the report.
   `.concept-card__artwork` uses `content-visibility: auto`; keep it, but confirm no CLS when cards enter view.
6. Accessibility sweep — one h1 per page, heading order, unique landmark labels, focus visible on dark and light
   surfaces, `prefers-reduced-motion` removes movement and smooth scrolling, 200% zoom keeps actions reachable,
   no horizontal page scroll at 320/375/768/1024/1280/1440 except the technology and filter rows.
7. Run lint, typecheck, test, build. Fix everything caused by the site code.

Report: changed files, check results, and a "Production configuration still required" list (site URL, real
enquiry provider + rate limiting, legal pages, domain/brand clearance for Forgeline).
