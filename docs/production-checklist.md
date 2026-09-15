# Forgeline V1 — Production checklist

V1 is feature-complete and verified locally (lint, typecheck, 82 tests, production build, browser checks at
320–1440px, keyboard, reduced motion, 200% zoom). These items must be resolved before public launch.

## Required configuration

| Item | Why | Where |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml` fall back to `http://localhost:3000` without it. Set it at **build** time. | `.env` / hosting env |
| Enquiry delivery provider | Production submission fails closed with "Project enquiries are not available right now." until a real provider is connected. | `src/lib/enquiry/get-enquiry-adapter.ts` |
| Server-side rate limiting | Required by spec §10.5 once the provider is connected. | Before the adapter call in `src/app/contact/actions.ts` |
| Legal facts for Privacy Policy and Website Terms | Both pages are built from the copy map (P081, P109) but return 404 in production, stay out of the footer, sitemap and form helper, and are `noindex` until every required fact is filled. `npm run dev` shows each page with "Needs legal input" markers. Verified today: the site sets no cookies and has no analytics or browser storage — use this as input for the cookie inventory, and re-check after hosting is chosen. Legal review is still required. | `src/content/legal.ts` (`legalFacts`) |
| Brand clearance for "Forgeline" | Name chosen during planning; domain and trademark availability were not checked. | `src/content/site.ts` |
| Legal entity name | Needed before adding Organization schema (spec §15). | — |

## Known, accepted behavior

- **Console warning "CSS … was preloaded using link preload but not used within a few seconds."**
  Caused by Next.js `<Link>` prefetching neighbouring routes: the prefetched RSC payload adds `preload` hints for
  that route's stylesheet (home, services, work). Verified: the HTML contains no preload links, and the number of
  warnings per page equals the number of prefetched routes with their own CSS. Removing it would mean disabling
  prefetch (slower navigation) or merging all route CSS into the global bundle (heavier first load), so it is kept.
- `next dev` is configured with `agentRules: false` (keeps the curated `AGENTS.md`) and
  `logging.serverFunctions: false` (server action arguments — enquiry name/email — are not printed).
- Open Graph image text uses the generic sans-serif available to `next/og`; the headline is original and uses the
  site palette.

## Not measured locally

- Lighthouse scores and Core Web Vitals (spec §16) — run against the deployed production URL.
