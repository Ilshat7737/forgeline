# Stage 5 — Contact page and enquiry submission

Read `AGENTS.md`, spec §10, §12 (Contact), §14, §17 and `docs/v1-content-brief.md` §6. The attached image is the
approved visual direction. Stages 1–4 are in place: reuse primitives, `page-hero`, services and work data.

Build `/contact` from components in `src/components/contact/` and `src/components/ui/` field primitives, copy in
`src/content/contact.ts`:

1. Layout — dark hero (eyebrow CONTACT, h1, introduction), then a lavender area split 5/7 on desktop with a
   vertical rule: left = supporting points + "What happens next"; right = form (not a floating card).
   One column below 900px. Inputs ≥ 16px text, touch targets ≥ 44px, radius 4px.
2. `src/lib/contact-schema.ts` — Zod schema for spec §10.3 rules (trim, lengths, email ≤ 254, services enum from
   brief option slugs, NDA boolean) with the spec's error messages. Shared by client and server.
3. `src/lib/contact-query.ts` — `resolveContactQuery(searchParams)` mapping `?service=` via the brief table to a
   form option and `?project=` to the suggestion sentence using the concept title; unknown values ignored.
   The page reads `searchParams` on the server and passes defaults to the form. The project suggestion is inserted
   only if the textarea is empty.
4. Fields (`field`, `textarea-field`, `checkbox-field`) — visible label, Required/Optional indicator, helper,
   inline error linked via `aria-describedby` and `aria-invalid`. Checkbox group in a `fieldset` + `legend`.
   Error text/borders use the light-surface error token.
5. `project-enquiry-form` (client, React Hook Form + zodResolver) — validate on submit then on change; after a
   failed attempt render a linked error summary above the form ("Check the highlighted fields.", each item links
   to its field) and move focus to it. Honeypot field: visually hidden, `tabIndex=-1`, `autocomplete="off"`,
   `aria-hidden`; filled honeypot is rejected silently on the server. Button "Send project brief" / pending
   "Sending…", disabled while pending. General failure shows the spec message in a `role="alert"` region and keeps
   all input. Nothing is written to storage, console or analytics.
6. `src/app/contact/actions.ts` — server action: parse with the same schema (return field errors), honeypot check,
   then call the adapter. Returns a discriminated union result.
7. `src/lib/enquiry/` — `ProjectEnquiry` and `SubmitProjectEnquiry` types (spec §10.5); `development-adapter.ts`
   returns `{ enquiryId: "dev-" + random }` and is only selectable when `NODE_ENV !== "production"`;
   `get-enquiry-adapter.ts` returns the real provider when configured (none in V1) and otherwise, in production,
   returns an adapter that throws a typed `EnquiryNotConfiguredError` → UI shows the brief's
   "not available right now" message. Never fake success in production. Mark the dev adapter visibly in the success
   state only in development (e.g. small "Development submission — not delivered" note).
   Leave a clear TODO for rate limiting where the real provider will be connected.
8. `contact-success` — replaces the form region only after the server confirms: heading from spec §10.6 receives
   focus (`tabIndex=-1`), text, "Explore our work" → `/work`, "Back to home" → `/`.

Tests: schema accepts a valid enquiry and rejects each invalid required field (name, email, project); query
resolution maps known service/project values and ignores unknown ones; adapter selection fails closed in
production.

Page metadata per spec §15. Follow light-section contrast rules in AGENTS.md.
Finish with lint, typecheck, test, build green. Report changed files and results.
