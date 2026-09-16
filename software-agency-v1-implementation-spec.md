# Software Agency Website V1 — Implementation Specification

## 1. Purpose

Build the first public version of an English-language website for a software development agency. The implementation must follow the approved **Concept 01 — Typography** visual direction: oversized type, deep plum backgrounds, coral accents, pale lavender sections, rectangular controls and thin divider lines.

This specification is written for implementation through Codex. Treat it as the source of truth for V1. Do not add pages, claims, testimonials, client logos, ratings, numbers, awards, office addresses or integrations that are not explicitly defined here.

### V1 goals

1. Explain what the agency builds and how it can help.
2. Show the complete range of services without creating dozens of thin service pages.
3. Present a small, honest work section using clearly labelled product concepts.
4. Convert qualified visitors through a project enquiry form.
5. Establish a reusable design and content system that can support the larger page map later.

### V1 success criteria

- A visitor can understand the offer from the first viewport.
- All key capabilities are reachable within one click from the header.
- Every main page has one clear path to `/contact`.
- The experience feels designed, editorial and technically credible on desktop and mobile.
- The site never presents illustrative concepts as completed client work.
- The form has complete validation, success and failure states.
- The implementation meets the accessibility, performance and responsive requirements in this document.

## 2. V1 scope

Build exactly four public pages:

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Main positioning, capabilities, process, selected work and contact conversion |
| `/services` | Services | Detailed service groups and engagement options |
| `/work` | Work | Curated product concepts and explanation of the agency's thinking |
| `/contact` | Contact | Full project enquiry form and next-step information |

Also implement these route states without treating them as navigation pages:

- Custom `not-found` screen for invalid routes.
- Inline contact-form success state on `/contact`; do not create a separate thank-you page in V1.
- Loading, empty and error states for work filters and form submission.

### Explicitly deferred

- Separate pages for every service and technology.
- Blog, guides, webinars, podcasts and search.
- About, careers and team profile pages.
- Individual project detail pages.
- CMS and authoring interface.
- Additional languages.
- Client portal, authentication or dashboard.
- Newsletter subscription.
- Real client logos, testimonials, awards and performance metrics.
- Cookie banner unless optional analytics or marketing technologies are actually introduced.

Information about the company, approach and team remains on the Home page in V1. Service CTAs that would later open detailed service pages go to `/contact?service=<slug>` and preselect the relevant service in the form.

## 3. Approved visual reference

Use the supplied `software-agency-v1-reference.png` as a **directional reference**, not as a bitmap to place on the website. Recreate its hierarchy and character with accessible HTML and CSS.

Preserve these qualities:

- Deep plum is the dominant background.
- Coral is used for emphasis and primary actions.
- Pale lavender creates strong section changes.
- Headlines are unusually large and tightly composed.
- Sections use thin borders and rules instead of floating shadow cards.
- Buttons are rectangular with modest or no rounding.
- The services area reads like an editorial accordion.
- Project previews are wide and product-led.
- The layout alternates dense typographic moments with generous whitespace.

Avoid:

- Generic SaaS dashboards as the overall page layout.
- Glassmorphism, neon glow, excessive gradients or decorative 3D ribbons.
- Pill-shaped controls everywhere.
- Small grey text with weak contrast.
- Stock photography of a group smiling around a laptop.
- Fake browser chrome as decoration around every image.
- Animations that delay access to content.

## 4. Technology and project setup

Use the latest stable versions available in the target repository at implementation time. Do not upgrade unrelated dependencies in an existing repository.

### Recommended stack for a new project

- Next.js with App Router.
- TypeScript with strict mode.
- React server components by default; client components only for interactions.
- CSS Modules or Tailwind CSS, depending on the existing repository convention. If starting fresh, use Tailwind CSS with CSS custom properties for tokens.
- `next/font` for locally optimized fonts.
- `next/image` for raster product visuals.
- React Hook Form plus Zod for the contact form.
- Motion library only if already installed. Otherwise implement small transitions with CSS.
- Vitest or the repository's existing unit-test setup for form schema and filtering logic.
- Playwright only if the repository already uses it or the implementation requires browser-level verification.

### Core engineering rules

- Do not put all page markup into one component.
- Keep visitor-facing copy in typed data files so it can move to a CMS later.
- Use semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`, `form`.
- Use heading levels in document order. Each page has exactly one `h1`.
- Render useful content on the server. Filtering may enhance the Work page on the client.
- Avoid runtime requests for static page copy.
- Do not install a heavy component library. Build the small V1 system directly.

### Suggested project structure

```text
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    services/
      page.tsx
    work/
      page.tsx
    contact/
      page.tsx
      actions.ts
  components/
    layout/
      site-header.tsx
      mobile-menu.tsx
      site-footer.tsx
      page-shell.tsx
    ui/
      button-link.tsx
      section-label.tsx
      arrow-icon.tsx
      wordmark.tsx
      field.tsx
      textarea-field.tsx
      checkbox-field.tsx
    home/
      hero.tsx
      technology-strip.tsx
      value-statement.tsx
      services-accordion.tsx
      process-section.tsx
      insight-links.tsx
      featured-work.tsx
      contact-band.tsx
    services/
      service-selector.tsx
      service-group.tsx
      engagement-options.tsx
      delivery-principles.tsx
    work/
      work-filter.tsx
      concept-grid.tsx
      concept-card.tsx
    contact/
      project-enquiry-form.tsx
      contact-success.tsx
  content/
    navigation.ts
    home.ts
    services.ts
    work.ts
    contact.ts
  lib/
    contact-schema.ts
    cn.ts
  styles/
    globals.css
    tokens.css
public/
  images/
    work/
    editorial/
```

If the target repository already has a sound structure, adapt these responsibilities rather than duplicating folders.

## 5. Design system

### Color tokens

```css
:root {
  --color-plum-950: #160f1b;
  --color-plum-900: #231525;
  --color-plum-800: #332035;
  --color-coral-500: #ff786a;
  --color-coral-600: #ec675b;
  --color-lavender-300: #e0b7ff;
  --color-lavender-100: #f0e5f6;
  --color-ivory: #fff9f5;
  --color-ink: #1d1220;
  --color-white: #ffffff;
  --color-border-dark: rgb(240 229 246 / 26%);
  --color-border-light: rgb(35 21 37 / 22%);
  --color-focus: #ff9b91;
  --color-error: #ff5f5f;
  --color-success: #d8ffcf;
}
```

Use coral for primary actions and selected states. Lavender is a structural background and secondary emphasis color. Do not introduce blue, green or yellow as brand accents. Product interface artwork may use low-saturation neutral data colors, but the website frame must remain in the approved palette.

### Typography

Use two families:

- **Display:** `Barlow Condensed`, variable weight 500–700, for oversized headlines, service numbers and major labels.
- **Body/UI:** `Inter`, variable weight 400–700, for navigation, paragraphs, buttons, forms and metadata.

Both are available from Google Fonts and should be loaded through `next/font/google`. If the product must avoid external font licensing or retrieval, use approved local alternatives with similar proportions.

Desktop scale:

| Token | Size / line height | Usage |
| --- | --- | --- |
| `display-xl` | `clamp(5.5rem, 9.2vw, 10rem) / 0.84` | Home hero |
| `display-lg` | `clamp(4rem, 7vw, 7.5rem) / 0.88` | Page heroes |
| `display-md` | `clamp(3rem, 5vw, 5.5rem) / 0.92` | Major section headings |
| `heading-lg` | `clamp(2.25rem, 3.5vw, 4rem) / 1` | Content headings |
| `heading-md` | `1.75rem / 1.1` | Cards and accordion titles |
| `body-lg` | `1.25rem / 1.55` | Section introductions |
| `body-md` | `1rem / 1.6` | Standard copy |
| `label` | `0.75rem / 1.2`, uppercase, `0.14em` spacing | Eyebrows and metadata |

Mobile hero type must remain forceful but fit without cropped words: `clamp(3.5rem, 17vw, 5.5rem)` with `0.86` line height. Do not reduce it to ordinary heading size.

### Layout

- Maximum content width: `1440px`.
- Wide desktop horizontal padding: `48px–64px`.
- Tablet padding: `32px`.
- Mobile padding: `20px`.
- Use a 12-column desktop grid with 24px gutters.
- Use an 8px spacing base.
- Major desktop section padding: `112px–160px` vertically.
- Mobile section padding: `72px–88px` vertically.
- Full-width rules align to the outer content grid.
- Long body paragraphs use a maximum measure of approximately 66 characters.

### Corners, borders and shadows

- Standard radius: `0px` for large content panels and primary buttons.
- Small functional radius: `4px` for form fields, chips and compact interface previews.
- Use 1px borders with the appropriate dark or light token.
- Avoid default card shadows. A restrained shadow is permitted only on product UI artwork to distinguish layers.

### Buttons and links

Primary button:

- Coral background, plum text, 48–56px height.
- Horizontal padding 24–32px.
- Text plus northeast arrow.
- Hover: plum background and ivory text on light sections; lavender background and plum text on dark sections.
- Focus: visible 2px outline with 3px offset.

Secondary button:

- Transparent background and 1px border.
- Same height and type treatment as the primary button.
- Never rely only on color to indicate hover or focus.

Editorial links use text plus a horizontal arrow. The underline or border must visibly change on hover.

### Iconography

- Use a consistent 1.5px line style.
- Prefer simple custom SVG icons or the repository's existing icon set.
- Icons must use `currentColor`.
- Do not install an icon package for fewer than ten icons.
- Decorative icons receive `aria-hidden="true"`.

## 6. Shared layout

### Header

Desktop header is 84px high and sits inside the page flow. It may overlay the Home hero only when contrast remains sufficient.

Content:

- Wordmark: `[COMPANY_NAME].` linking to `/`.
- Navigation: Services, Work, Approach, About.
- CTA: Discuss your project.

Routes:

- Services → `/services`
- Work → `/work`
- Approach → `/approach`
- About → `/about`
- Discuss your project → `/contact`

Behavior:

- Sticky after the visitor scrolls beyond the first 120px.
- When sticky, use an opaque plum-950 background with a bottom border. Do not use blur as the only means of separation.
- Highlight the current route with an underline and `aria-current="page"`.
- The Home anchor links should scroll with an offset for the sticky header.

Mobile:

- 64px bar with wordmark and Menu button.
- Menu opens as a full-width plum panel below the header, not a small dropdown.
- Focus moves to the first link when opened and returns to the Menu button when closed.
- Close with the Close button, Escape or after selecting a link.
- Lock background scrolling while open.

### Footer

Use a deep plum footer with a thin top divider.

Columns:

1. Brand and the line: **Software built around your business.**
2. Navigation: Services, Work, Approach, About.
3. Contact: Discuss your project.
4. Legal: Privacy Policy placeholder and Website Terms placeholder.

V1 legal links may point to `#` only during local development. Before production, either provide real pages or hide the links. Do not ship dead links.

Bottom line:

- `© [CURRENT_YEAR] [COMPANY_NAME]. All rights reserved.`
- Back to top.

Do not show social icons until real destinations are supplied.

### Page hero pattern

Inner-page heroes use:

- Dark plum background.
- Small uppercase section label.
- One oversized display heading, maximum two or three lines.
- Short introduction under the heading.
- Optional coral text emphasis, limited to one phrase.
- A thin bottom rule connecting into the next section.

## 7. Home page — `/`

The Home page is the primary product and must receive the most implementation attention.

### 7.1 Hero

Minimum desktop height: `calc(100svh - 84px)`, with a sensible minimum of 720px. Use a typographic composition rather than a device mockup.

Visible copy:

- Eyebrow: **SOFTWARE DEVELOPMENT & DIGITAL PRODUCTS**
- H1 line 1: **WE BUILD SOFTWARE.**
- H1 line 2, coral: **YOU MOVE YOUR**
- H1 line 3: **BUSINESS FORWARD.**
- Supporting text: **From the first product decision to development, launch and ongoing improvement.**
- Primary CTA: **Discuss your project** → `/contact`
- Secondary CTA: **Explore our work** → `/work`
- Technology line: **React / Node.js / .NET / Python / AWS**

Composition:

- Headline occupies approximately columns 1–10.
- Right margin contains a large lavender outlined arrow angled downward-right and a small stacked note: **PRODUCT / ENGINEERING / DELIVERY**.
- CTA row sits under the supporting text.
- Technology line is anchored near the bottom of the hero.
- Use a subtle radial plum variation behind the type. Keep it nearly invisible.

Motion:

- On initial load, reveal the three headline lines with opacity and `translateY(20px)` over 450–650ms.
- Stagger by no more than 80ms.
- Do not hide the text before hydration.
- Disable transforms when `prefers-reduced-motion: reduce` is set.

### 7.2 Value statement — Home teaser linking to `/about`

Use a pale lavender background with plum text and a two-column layout.

- Section label: **ABOUT**
- Heading: **YOUR CHALLENGE. OUR TEAM.**
- Body: **Build a new product. Improve the system you already have. Add expertise where your team needs it. We work with you to understand the business problem, make technical choices visible and deliver software your team can own.**
- Supporting note: **PRODUCT THINKING / DESIGN / ENGINEERING / QUALITY**

The heading occupies eight columns; the body occupies four. Do not use stock photography in V1.

### 7.3 Services accordion — `#services`

Dark section. Heading: **FROM STRATEGY TO A STABLE RELEASE.**

Show eight numbered rows:

1. Web development
2. Mobile applications
3. AI and automation
4. UX/UI and product design
5. QA and automated testing
6. Cloud and DevOps
7. Software modernization
8. Team augmentation

Each row includes:

- Two-digit number.
- Service title.
- Plus icon when closed and minus icon when open.
- One paragraph when open.
- Text link: **Discuss this service** → `/contact?service=<slug>`.

Descriptions:

- **Web development:** Customer-facing platforms and internal tools built around real workflows.
- **Mobile applications:** Focused mobile experiences designed for devices, interruptions and everyday use.
- **AI and automation:** Useful AI capabilities and automated workflows with evaluation and human oversight designed in.
- **UX/UI and product design:** Clear journeys, consistent interfaces and product decisions grounded in user needs.
- **QA and automated testing:** Confidence in the product paths your customers and operations depend on.
- **Cloud and DevOps:** Repeatable releases, observable systems and environments your team can operate.
- **Software modernization:** A controlled route away from the constraints of legacy systems.
- **Team augmentation:** Additional expertise integrated into your priorities, tools and delivery practices.

Behavior:

- This is an accessible single-open accordion on desktop and mobile.
- The first row is open by default.
- Accordion buttons use `aria-expanded` and `aria-controls`.
- Animate panel height and opacity only if motion is allowed.
- Link beneath the section: **View all services** → `/services`.

### 7.4 Process — Home teaser linking to `/approach`

Use a pale lavender background. Heading: **HOW WE BEGIN.**

Four columns on desktop, stacked on mobile:

1. **FIRST CONVERSATION** — Tell us about your goals, users and current constraints.
2. **UNDERSTAND THE PROBLEM** — We review the available evidence and identify the questions that need answers.
3. **SCOPE AND PLAN** — We agree on the work, responsibilities and assumptions behind the estimate.
4. **START DELIVERY** — We build the first useful increment and establish a clear rhythm for decisions and feedback.

Use oversized `01–04` display numerals and diagonal separator rules inspired by the approved mockup. On mobile, use a vertical rule.

### 7.5 Insights preview

Dark background. This section establishes future editorial capacity without requiring article pages in V1.

- Label: **PERSPECTIVES**
- Heading: **IDEAS YOU CAN PUT TO WORK.**

Render two static editorial entries:

1. **Launching an MVP: decide what to learn first**
   - Summary: A practical starting point for choosing the first useful version of a product.
2. **When your architecture needs to change**
   - Summary: Recognize the constraints that justify investment before committing to a rewrite.

Since article pages are deferred, the items do not behave as links in V1. Use semantic `article` elements and show the label **RESOURCE IN PREPARATION**. Do not create dead routes.

### 7.6 Featured work

Use a pale lavender background.

- Label: **SELECTED WORK**
- Heading: **SOFTWARE IN CONTEXT.**
- Link: **View all work** → `/work`

Render two wide concept rows:

1. **Financial workspace**
   - Type: Web platform
   - Summary: A clear view of balances, activity and available actions.
   - Label: **CONCEPT**
2. **Everyday mobile service**
   - Type: Mobile product
   - Summary: A focused experience for recurring tasks and progress.
   - Label: **CONCEPT**

Each row places copy in columns 1–3 and an original product interface composition in columns 4–12. The previews must be created as native HTML/CSS or supplied original images. Do not copy interfaces, logos or branded assets from another agency.

In V1, concept cards link to `/work#financial-workspace` and `/work#everyday-mobile-service`.

### 7.7 Contact band

Dark plum background with huge outlined coral type.

- Label: **START A CONVERSATION**
- Heading: **WHAT SHOULD WE BUILD TOGETHER?**
- Text: **Tell us what you want to create or improve. We will help you find a practical starting point.**
- CTA: **Discuss your project** → `/contact`

Use one strong CTA rather than embedding the complete form on Home. This reduces duplication and keeps V1 implementation focused.

## 8. Services page — `/services`

### 8.1 Hero

- Eyebrow: **SERVICES**
- H1: **CHOOSE THE SUPPORT YOUR PRODUCT NEEDS.**
- Introduction: **Bring us a new idea, a delivery challenge or a system that needs to change. Start with the problem; we will help define the right combination of skills.**
- CTA: **Discuss your project** → `/contact`

Use a coral block behind the final words **PRODUCT NEEDS.** It should feel typographic and flat, not like a card.

### 8.2 Situation selector

Heading: **WHERE ARE YOU NOW?**

Three large selectable tabs:

1. Build a product
2. Improve an existing system
3. Strengthen your team

Selecting a tab changes the supporting paragraph and highlights the related service groups below. The content must still remain available in the DOM and understandable without JavaScript.

Copy:

- **Build a product:** Connect discovery, design, engineering and launch around a clear first outcome.
- **Improve an existing system:** Remove the constraints affecting delivery, reliability or user experience.
- **Strengthen your team:** Add focused expertise while keeping priorities and product ownership inside your organization.

### 8.3 Service groups

Use four full-width editorial groups. Every group has a number, heading, introduction and service rows.

#### 01 — Product strategy and design

Introduction: **Turn uncertain requirements into a direction your team can evaluate and build.**

- Business analysis
- Discovery workshops
- Product strategy
- Product design
- UX/UI design

#### 02 — Software engineering

Introduction: **Build complete workflows with the frontend, backend and quality practices considered together.**

- Web development
- Mobile development
- Desktop development
- Software architecture
- QA and automated testing

#### 03 — AI, cloud and modernization

Introduction: **Introduce new capabilities while keeping the system understandable and operable.**

- AI development and automation
- Generative AI
- Cloud solutions
- Cloud engineering and DevOps
- Legacy application modernization

#### 04 — People and ownership

Introduction: **Build capability inside your organization as the product moves forward.**

- Team augmentation
- Client enablement
- Knowledge transfer

Each service row has:

- Title.
- One-line description.
- Arrow link to `/contact?service=<slug>`.
- Hover state that changes the title to coral and moves the arrow by 6px.

Do not create individual service routes in V1.

### 8.4 Technology strip

Heading: **TOOLS FOLLOW THE PRODUCT.**

Body: **We choose technologies around the product, the system you already operate and the skills your team needs to retain.**

Visible list: React, React Native, Node.js, .NET, Python, Go, MongoDB, AWS.

Show names as a large typographic marquee-like row. It must not auto-scroll. Allow horizontal swipe on small screens and provide visible overflow cues.

### 8.5 Delivery principles

Pale lavender background. Three columns:

- **Clarity before activity** — Make assumptions, decisions and dependencies visible.
- **Complete increments** — Review working behavior rather than disconnected task output.
- **Ownership after release** — Include testing, deployment, diagnosis and knowledge transfer in delivery.

### 8.6 CTA

- Heading: **NOT SURE WHERE TO START?**
- Text: **Describe the outcome you need and the constraints you already know. We can begin with a focused assessment.**
- CTA: **Tell us about the challenge** → `/contact`

## 9. Work page — `/work`

This is a concept portfolio for V1. Every item must display the word **CONCEPT** prominently.

### 9.1 Hero

- Eyebrow: **WORK**
- H1: **PRODUCT PROBLEMS. CLEAR DIRECTIONS.**
- Introduction: **Explore illustrative product scenarios across web, mobile, desktop and operational software. Each concept shows how we turn a workflow problem into a product direction.**

Add a small note under the introduction:

**These are illustrative concepts, not completed client engagements or measured client results.**

### 9.2 Filter controls

Categories:

- All
- Web
- Mobile
- Desktop
- Operations

Requirements:

- Use buttons with `aria-pressed`.
- Filter without navigation.
- Update the URL query parameter, for example `/work?category=mobile`, using shallow client-side navigation.
- The page must render All by default on the server.
- Display result count through an `aria-live="polite"` region.
- Empty text: **No concepts match this filter. Choose another category.**

### 9.3 Concept collection

Implement six concepts:

| ID | Title | Category | Summary | Visual direction |
| --- | --- | --- | --- | --- |
| `financial-workspace` | Financial workspace | Web | Bring balances, activity and available actions into one clear workspace. | Dark data interface with lavender chart and coral action state |
| `everyday-mobile-service` | Everyday mobile service | Mobile | Help users complete recurring tasks and understand their progress. | Mobile UI canvases without branded device hardware |
| `workflow-automation` | Workflow automation | Operations | Make approvals, handoffs and exceptions visible to the people responsible for them. | Queue, status and approval interface |
| `creative-production-tool` | Creative production tool | Desktop | Organize content, review feedback and local-file work inside a focused desktop experience. | Wide production workspace |
| `asset-processing-console` | Asset processing console | Web | Configure work, follow processing stages and recover from failures. | Pipeline and job-status interface |
| `delivery-flow-workspace` | Delivery flow workspace | Operations | Show where work waits and give blocked items enough context to act. | Delivery stages and blocker details |

Card structure:

- Visible Concept label.
- Category.
- H2 or H3 title based on document context.
- Summary.
- Large product artwork.
- Anchor link: **View concept**.

Because detail pages are deferred, selecting a card scrolls to an expanded section on the same page. Use fragment IDs matching the table.

### 9.4 Expanded concept pattern

Each concept section contains:

1. **The scenario** — one paragraph describing the user or operational problem.
2. **Proposed direction** — one paragraph explaining the interface or workflow approach.
3. **Questions to validate** — two bullets.
4. **Relevant services** — two or three chips linking to `/contact?service=<slug>`.
5. CTA: **Discuss a similar challenge** → `/contact?project=<concept-id>`.

Do not include invented outcomes, quotes, client names or delivery dates.

### 9.5 CTA

- Heading: **HAVE A SIMILAR CHALLENGE?**
- Text: **Bring us the workflow, product idea or system you want to improve.**
- CTA: **Discuss your project** → `/contact`

## 10. Contact page — `/contact`

### 10.1 Layout

Use a dark plum hero and pale lavender form area. On desktop, the page is a 5/7 split:

- Left: headline, reassurance and process summary.
- Right: form inside the page grid, separated by a vertical rule. It is not a floating white card.

Mobile stacks the content above the form.

### 10.2 Copy

- Eyebrow: **CONTACT**
- H1: **WHAT DO YOU WANT TO CREATE OR IMPROVE?**
- Introduction: **Share a little context about the product, your goals and the constraints you are working with. You do not need a finished specification to start the conversation.**

Supporting points:

- We begin with your goal and current situation.
- You can keep the first description high level.
- If an NDA is needed, mention it before sharing sensitive material.

Do not promise a response within a fixed time until the business approves such a commitment.

### 10.3 Form fields

| Field | Type | Required | Rules |
| --- | --- | ---: | --- |
| Your name | Text | Yes | Trimmed, 2–100 characters |
| Work email | Email | Yes | Valid email, maximum 254 characters |
| Company | Text | No | Maximum 120 characters |
| What do you need help with? | Multi-select checkbox group | No | Options listed below |
| Tell us about your project | Textarea | Yes | Trimmed, 20–4,000 characters |
| Desired timing | Text | No | Maximum 160 characters |
| NDA request | Checkbox | No | Boolean |

Service options:

- New product
- Existing product
- Web development
- Mobile application
- AI and automation
- UX/UI and product design
- QA and automated testing
- Cloud and DevOps
- Team augmentation
- Not sure yet

Query behavior:

- `?service=<slug>` preselects the matching option.
- `?project=<concept-id>` inserts a non-destructive suggestion into the project textarea only if the visitor has not already typed: **I would like to discuss a challenge similar to [concept title].**
- Ignore unknown query values safely.

Visible helper:

**We will use these details to respond to your enquiry. Read our Privacy Policy.**

If no Privacy Policy page exists in V1, render plain text without a fake link until the real route is supplied.

Button: **Send project brief**. Pending: **Sending…**

### 10.4 Validation messages

- Name: **Enter your name.**
- Email: **Enter a valid email address.**
- Project: **Tell us a little more about your project.**
- General submission: **We could not send your message. Your information is still here, so you can try again.**

Show inline errors next to fields and a linked error summary above the form after a failed validation attempt. Move focus to the summary.

### 10.5 Submission strategy

Implement an adapter with this interface:

```ts
export type ProjectEnquiry = {
  name: string;
  email: string;
  company?: string;
  services: string[];
  project: string;
  timing?: string;
  ndaRequested: boolean;
};

export type SubmitProjectEnquiry = (
  enquiry: ProjectEnquiry
) => Promise<{ enquiryId: string }>;
```

For V1 without a confirmed backend:

- Implement the server action and validation boundary.
- Keep the delivery provider behind the adapter.
- In local development, use a clearly labelled development adapter that returns a generated non-sensitive test ID.
- In production, fail closed with a helpful configuration error if the real provider is absent. Do not pretend a message was delivered.
- Do not write enquiry content to browser storage, console output or analytics.
- Add a honeypot field hidden from sighted users and excluded from the visible tab order.
- Add server-side rate limiting when the production endpoint is connected.

### 10.6 Success state

Replace the form region with:

- Heading: **THANKS. YOUR PROJECT BRIEF HAS BEEN RECEIVED.**
- Text: **We will review the context you shared and contact you about the next step.**
- Primary link: **Explore our work** → `/work`
- Secondary link: **Back to home** → `/`

Move focus to the success heading. Do not clear the form until the server confirms submission.

## 11. Content data models

Use typed content objects.

```ts
export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  group: "product" | "engineering" | "systems" | "team";
  homeOrder: number;
};

export type WorkCategory = "web" | "mobile" | "desktop" | "operations";

export type WorkConcept = {
  id: string;
  title: string;
  category: WorkCategory;
  summary: string;
  scenario: string;
  proposedDirection: string;
  validationQuestions: string[];
  relatedServices: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};
```

Keep each concept's label as `CONCEPT` in the component rather than allowing arbitrary credibility labels in content data.

## 12. Responsive behavior

### Breakpoints

- Small: below 640px.
- Medium: 640–1023px.
- Large: 1024px and above.
- Wide: 1440px and above, where content stops growing and side margins expand.

### Home

- Hero headline uses three to five lines depending on width; never overflow horizontally.
- Decorative arrow disappears below 768px.
- Value statement becomes a single column.
- Services keep full-width rows.
- Process becomes a vertical sequence.
- Featured work changes from copy/image rows to image followed by copy.

### Services

- Situation tabs become three stacked buttons.
- Service group rows remain readable and do not turn into tiny multi-column cards.
- Technology line allows horizontal scrolling with a visible end fade.

### Work

- Filter row scrolls horizontally if needed.
- Concept collection is one column below 768px and two columns above it.
- Expanded sections remain single-column until 1024px.

### Contact

- The two-column layout becomes one column below 900px.
- Touch targets are at least 44 × 44px.
- Fields use at least 16px input text to avoid mobile browser zoom.

Test at minimum widths: 320, 375, 768, 1024, 1280 and 1440px.

## 13. Motion and interaction

- Default transition duration: 180ms for controls, 350–600ms for section reveals.
- Use `ease-out` for entrance and `ease-in-out` for state changes.
- Do not animate all paragraphs as the user scrolls.
- A section may reveal its heading and one primary visual when entering the viewport.
- Never animate layout in a way that moves a control while the visitor is interacting with it.
- Honor `prefers-reduced-motion` by removing non-essential movement and smooth scrolling.
- Hover behavior must have an equivalent focus behavior.

## 14. Accessibility requirements

- Target WCAG 2.2 AA.
- Maintain text contrast of at least 4.5:1 for standard text and 3:1 for large text and meaningful graphical elements.
- Include a visible Skip to main content link.
- Every page has a descriptive title and meta description.
- Use landmarks and valid heading order.
- All functionality is keyboard accessible.
- Focus indicators remain visible on dark and light backgrounds.
- Accordion and menu state is conveyed programmatically.
- Work filters use real buttons and expose selection.
- Form errors are associated through `aria-describedby`.
- Status changes use restrained live regions.
- Product concept artwork has useful alt text; decorative geometry uses empty alt text or `aria-hidden`.
- Do not encode Concept status by color alone.
- Zoom at 200% must not hide content or actions.

## 15. SEO and metadata

| Route | Title | Meta description |
| --- | --- | --- |
| `/` | Software Development & Digital Products \| [COMPANY_NAME] | Product strategy, design and software engineering for teams building new products or improving existing systems. |
| `/services` | Software Development Services \| [COMPANY_NAME] | Explore product design, web, mobile, AI, cloud, modernization and team augmentation services. |
| `/work` | Product Concepts & Software Work \| [COMPANY_NAME] | Explore illustrative web, mobile, desktop and operational product concepts from [COMPANY_NAME]. |
| `/contact` | Discuss Your Software Project \| [COMPANY_NAME] | Tell us what you want to create or improve and start a practical software project conversation. |

Requirements:

- Configure canonical URLs from one environment variable, such as `NEXT_PUBLIC_SITE_URL`.
- Add Open Graph title, description and an original 1200 × 630 image.
- Do not use the chosen mockup screenshot as the final Open Graph image.
- Provide `robots.ts` and `sitemap.ts` for the four routes.
- Do not include filtered Work URLs as separate sitemap entries.
- Add Organization schema only after the legal name and real public URL are supplied.
- Do not add Review, AggregateRating or fake Project schema.

## 16. Performance requirements

- Target Lighthouse scores on a production build: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Target Core Web Vitals: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms under representative conditions.
- Keep initial client JavaScript small. The Home page requires client JavaScript only for menu and accordion interactions.
- Use responsive image sizes and modern image formats.
- Set explicit image dimensions or aspect ratios.
- Load product artwork below the fold lazily.
- Do not autoplay video.
- Subset fonts through `next/font` and use only required weights.
- Avoid rendering large off-screen decorative assets.

## 17. Analytics and privacy

Do not add analytics in the first implementation unless the owner supplies the provider and consent requirements.

When analytics is approved later, define events without sending form content:

- `cta_clicked` with route and CTA identifier.
- `service_opened` with service slug.
- `work_filter_changed` with category.
- `contact_form_started`.
- `contact_form_submitted` with no personal fields or free text.
- `contact_form_failed` with a generic failure code.

Never send name, email, company, project description or NDA selection to analytics.

## 18. Verification

### Required automated checks

- Contact schema accepts valid submissions and rejects each invalid required field.
- Contact query preselection maps known service and project values and ignores unknown values.
- Work filtering returns the correct category and restores All.
- Home accordion exposes one open item and correct accessibility attributes.

Avoid tests that simply duplicate static copy or implementation details.

### Required manual verification

1. Compare every desktop section against the selected typographic reference for hierarchy, palette, rules and button style.
2. Review all four pages at 320, 375, 768, 1024, 1280 and 1440px.
3. Navigate the entire site using keyboard only.
4. Test with reduced motion enabled.
5. Verify the mobile menu focus cycle and closing behavior.
6. Verify all accordion states.
7. Verify every CTA and route.
8. Test form validation, pending, server error and confirmed success.
9. Confirm no concept appears without its Concept label.
10. Run a production build and resolve all TypeScript, lint and accessibility errors.
11. Confirm there are no horizontal scrollbars at supported widths except the intentional technology and filter rows.
12. Check that no placeholder, bracketed configuration value or development-only adapter success can reach production.

## 19. Definition of done

V1 is complete when:

- The four routes are implemented with the copy and sections defined here.
- Header, footer and all page navigation work on desktop and mobile.
- The final visual treatment clearly matches Concept 01 — Typography.
- All layouts are responsive at the required widths.
- The Work page contains six honest, visibly labelled concepts.
- The Contact form is fully validated and connected to a real production submission provider, or production submission remains explicitly unavailable rather than faking success.
- There are no dead links, placeholder values, fake claims or console errors.
- Required automated checks pass.
- Production build passes.
- Keyboard, reduced-motion and form-state reviews pass.
- Metadata, sitemap, not-found screen and final original imagery are present.

## 20. Codex implementation instruction

Give Codex this specification and the reference image, then use the instruction below:

> Implement the four-page V1 website exactly as described in `software-agency-v1-implementation-spec.md`. Use `software-agency-v1-reference.png` only as the approved visual direction. First inspect the existing repository and follow its conventions. Reuse sound dependencies and structure where possible. Do not add invented content, client evidence or additional pages. Build the shared design system and layout before page-specific sections. Keep visitor-facing copy in typed content files. Implement the Home page first, then Services, Work and Contact. Add the required validation and focused tests. Run the existing lint, type-check and production build commands, fix failures caused by the work, and report the changed files, validation results and any production configuration still required.

