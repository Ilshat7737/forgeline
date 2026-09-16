# Legal review pack — Forgeline

Two documents are attached for review:

- `privacy-policy.md` — published at https://forgeline.tech/privacy-policy
- `website-terms.md` — published at https://forgeline.tech/terms-of-service

Both texts are drafts written by the site's authors, not by a lawyer. They are live on the
site but the site itself is not yet publicly launched.

## What the website actually is and does

- A four-section marketing site for a software development practice: services, example
  project concepts, an approach/about description, and a contact page. No accounts, no
  login, no payments, no user-generated content.
- **Cookies: none.** The site sets no cookies and loads no analytics, advertising or
  tracking scripts. It writes nothing to `localStorage` or `sessionStorage`. Verified by
  inspecting the running site, not assumed.
- **Fonts** are served from the site's own domain (self-hosted through the framework), so
  no third-party font service receives visitor IP addresses.
- **The contact form does not deliver anything yet.** At the owner's instruction it
  currently simulates a successful submission: the visitor sees a confirmation saying we
  will reply within 7 business days, but nothing is sent, stored, logged or forwarded.
  A real delivery provider will be connected before or shortly after launch. The privacy
  notice describes this state in section 5 and the future state in the same paragraph —
  please confirm this is an acceptable way to describe it, or tell us how to phrase it.
- **Server logs** are the only personal data the site processes today: standard web server
  access logs (IP, timestamp, requested path, referrer, user agent).
- **Hosting** is a server located in the European Union. No processing outside the EU/EEA.

## Facts we assumed and want confirmed

1. **No registered company.** The operator is currently an individual trading as
   "Forgeline"; there is no registered legal entity and no registered address. The
   documents therefore identify the controller by name and email only. Is that sufficient
   under the GDPR and Estonian law, and what must change once a company is registered?
2. **Registered address.** The Website Terms have a slot for an address that stays hidden
   until a company exists. As published, section 1 reads as two bare lines ("Forgeline" /
   the email address). Should this be rewritten as a sentence, and is an address mandatory
   for a site of this kind?
3. **Estonian law and jurisdiction** are stated in the Website Terms. Please confirm this
   matches the operator's actual situation.
4. **Legal basis.** We claim legitimate interest (Art. 6(1)(f) GDPR) both for answering
   enquiries and for server logs. Is that the right basis, and do we need a documented
   balancing test?
5. **Retention.** 12 months after the last exchange for enquiries; "rotated on a regular
   schedule" for server logs. Should the log period be stated as a concrete number?
6. **Supervisory authority.** We name the Estonian Data Protection Inspectorate
   (Andmekaitse Inspektsioon).
7. **Response time.** The privacy notice promises an answer to data requests within one
   month; the contact form promises a business reply within 7 business days.
8. **Content and scraping clause.** Website Terms section 4 restricts republication,
   commercial use, automated collection and use for model training. Please check this is
   enforceable as written.
9. **"Concept" disclaimer.** The site's project examples are illustrative, not delivered
   client work, and both the site and Website Terms section 3 say so explicitly. Please
   confirm the wording is strong enough to avoid a misleading-advertising claim.

## Please also flag

- Anything legally required that is missing entirely.
- Anything we claim that we would have to prove.
- Whether a cookie banner or consent mechanism is required given that no cookies are set.

## How changes get applied

The text is not hard-coded in the pages: it lives in a single content file
(`src/content/legal.ts`) with the company-specific facts separated from the boilerplate.
Any edits can come back as marked-up text or tracked changes on these Markdown files.
