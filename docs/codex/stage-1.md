# Stage 1 — Project scaffold, design system, shared layout

Read `AGENTS.md`, `software-agency-v1-implementation-spec.md` (§1–6, §12–16) and `docs/v1-content-brief.md` (§0–2, §7–8).
The attached image is the approved visual direction.

The directory has no application yet. Do this stage only:

1. Scaffold Next.js (App Router, TypeScript strict, Tailwind, ESLint, `src/` dir, npm) in the current directory
   without deleting existing files. Add scripts `typecheck` (tsc --noEmit) and `test` (vitest run). Install Vitest,
   React Hook Form, Zod (form work comes later, install now).
2. Design tokens: `src/styles/tokens.css` with spec §5 colors plus the accessibility tokens from `AGENTS.md`;
   typography scale (display-xl … label) and spacing/grid as Tailwind theme values mapped to CSS variables;
   fonts via `next/font/google`, only the weights needed.
3. Shared UI in `src/components/ui/`: button-link (primary/secondary, dark/light surface variants, northeast arrow),
   section-label, arrow-icon (1.5px stroke, currentColor, northeast/east/down-right variants), wordmark
   ("Forgeline" + coral dot), plus `src/lib/cn.ts`.
4. Content: `src/content/site.ts` (name, footer lines, current-year helper) and `src/content/navigation.ts`.
5. Layout: `site-header` (desktop 84px, sticky after 120px with opaque plum-950 + bottom border, `aria-current`),
   `mobile-menu` (full-width panel, focus to first link / back to button, Escape, close on link, scroll lock,
   Open menu / Close menu labels), `site-footer` (legal column hidden per brief), `page-shell`, skip link,
   `scroll-margin-top` for anchor targets, reduced-motion handling.
6. `src/app/layout.tsx` with metadata base from `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`),
   `src/app/not-found.tsx` per brief §7, and a minimal placeholder `src/app/page.tsx` containing just the one h1
   "WE BUILD SOFTWARE. YOU MOVE YOUR BUSINESS FORWARD." (Home sections come in stage 2). Create empty-safe
   placeholder pages for `/services`, `/work`, `/contact` with their spec h1 only so nav links resolve.
7. `.env.example` with `NEXT_PUBLIC_SITE_URL=`.

Do not build Home sections, Services/Work/Contact content, the form, sitemap or OG image yet.

Finish with `npm run lint`, `npm run typecheck`, `npm run test` (allow "no tests" to pass via `--passWithNoTests`),
`npm run build` all green. Report changed files and results.
