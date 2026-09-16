# Forgeline V1 — Production checklist

V1 is feature-complete and verified locally (lint, typecheck, 146 tests, production build, browser checks at
320–1440px, keyboard, reduced motion, 200% zoom). These items must be resolved before public launch.

## Required configuration

| Item | Why | Where |
| --- | --- | --- |
| ~~`NEXT_PUBLIC_SITE_URL`~~ — done | Set to `https://forgeline.tech` in the committed `.env.production`, so a plain `npm run build` produces the right canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml`. Override only for a staging host. | `.env.production` |
| DNS and TLS for `forgeline.tech` | `A`/`AAAA` for the apex and `www`, then certbot. `www` redirects to the apex in nginx. | `deploy/nginx.conf`, `docs/deployment.md` |
| **Enquiry delivery provider — submissions are currently simulated** | At the owner's request the form always confirms: the server returns success after a short delay and the visitor is told we will reply within 7 business days. **Nothing is delivered, stored or forwarded**, so no enquiry reaches anyone until a real provider is connected here. | `src/lib/enquiry/acknowledge-adapter.ts`, `get-enquiry-adapter.ts` |
| Server-side rate limiting | Required by spec §10.5 once a real provider is connected. | Before the adapter call in `src/app/contact/actions.ts` |
| Response-time promise | The success screen commits to a reply "within 7 business days". Keep it only while the business can honour it. | `src/content/contact.ts` (`success.body`) |
| ~~Legal facts~~ — published, review pending | Privacy Policy and Website Terms are live: facts filled from the owner's answers (controller "Forgeline", contact `privacy@forgeline.tech`, 12-month retention once delivery exists, server in the EU, Estonian law) and from verified site behaviour (no cookies, no analytics, no browser storage). **Still to do:** have both texts reviewed by a lawyer, add the registered address once a company exists, and make sure `privacy@forgeline.tech` actually receives mail before launch. | `src/content/legal.ts` (`legalFacts`) |
| Brand clearance for "Forgeline" | Name chosen during planning; domain and trademark availability were not checked. | `src/content/site.ts` |
| Registered legal entity | There is no registered company yet, so the legal pages name "Forgeline" as controller with an email contact and no address, and the Organization schema carries no `legalName`. Once a company exists, add the registered address to `legalFacts` and the legal name to the schema. | `src/content/legal.ts`, `src/components/layout/organization-schema.tsx` |

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
