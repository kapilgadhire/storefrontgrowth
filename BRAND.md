# StorefrontGrowth brand and site guidelines

Paste this whole file into any Claude thread that builds pages for storefrontgrowth.com.
Repo: `kapilgadhire/storefrontgrowth` (GitHub Pages, custom domain storefrontgrowth.com, deploys from `main` in about a minute).

There are two visual systems. Use the one that matches where the page will live.

- **A. Live site system** — what storefrontgrowth.com runs today. Use this for any new page that goes into this repo now.
- **B. New "brick town" direction** — the redesign in progress. Use this only for pages that belong to the new design.

---

## Who we are (positioning, both systems)

- **Brand name:** StorefrontGrowth (one word, capital S and G). Never "Storefront Growth" in copy or "Storefrontgrowth".
- **What we do:** full-service, AI-powered B2B marketing. Strategy, brand, websites, SEO/AEO, content, social, ABM, email, performance, PR, events, AI workflows and analytics, delivered by one team.
- **Who for:** B2B, SaaS and AI companies. The live site still carries older "small business, US" copy in places; new pages should use the B2B / SaaS / AI positioning.
- **Current hero line:** "AI-Powered Marketing Built to Grow Your Business."
- **Taglines in use:** "AI-powered B2B marketing, built for pipeline." · "Your growth team, without the overhead." (older, live site).
- **Contact:** hello@storefrontgrowth.com · Calendly: https://calendly.com/kapil-storefrontgrowth/30min

## Voice

- Plain, direct, confident. Short sentences. Active voice.
- Talk about outcomes the buyer recognises: pipeline, qualified leads, visibility, conversions. Not jargon about our process.
- Sentence case for headings ("Strategy and execution, under one roof."), Title Case only for the main hero line and page titles.
- CTAs are verbs: "Book a conversation", "Build your growth plan", "Explore our capabilities", "Book a Free Call" (live site).
- Never invent results, client quotes or numbers. Mark sample content as sample. Placeholders stay visibly placeholders until verified.
- No em-dash asides, no "not X but Y" framing, no exclamation marks.

---

## A. Live site system (storefrontgrowth.com today)

### Colours (CSS variables in `/assets/site.css`)
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#161714` | Headings, body on light, primary buttons |
| `--muted` | `#696b62` | Secondary text |
| `--paper` | `#f6f2e9` | Page background |
| `--paper-2` | `#eee8db` | Subtle fills, close buttons |
| `--white` | `#fffdf8` | Cards, modal, nav when scrolled |
| `--green` | `#4f6f52` | Sage accent, focus rings, highlighted words |
| `--green-dark` | `#29412e` | Forest: eyebrows, dark panels, links |
| `--lime` | `#dbea8b` | Highlight, icon chips, success states |
| `--orange` | `#ed8154` | Accent buttons, FAQ "+", the final CTA card |
| `--yellow` | `#f5c85d` | Rare secondary accent |
| `--line` | `rgba(22,23,20,0.12)` | Borders |

Page background also has two soft radial glows (lime top-left, orange top-right); see `body` in site.css.

### Type
- **Headings:** Manrope 700/800, letter-spacing -0.04em, line-height 1.08. h1 `clamp(2.6rem,5vw,4.4rem)`, h2 `clamp(2rem,3.6vw,3.1rem)`.
- **Body:** DM Sans 400–700, line-height 1.6, 16px base. Paragraphs are `--muted`.
- **Eyebrow:** `.eyebrow` — 0.78rem, 700, uppercase, letter-spacing .12em, `--green-dark`, with an orange dot before it.
- Google Fonts link: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap`

### Shape and spacing
- Radii: `--radius-xl` 34px (big panels), `--radius-lg` 24px (cards), `--radius-md` 18px (small cards, FAQ), buttons 999px.
- Shadow: `--shadow` = `0 20px 60px rgba(45,42,31,0.12)`.
- Container `min(1180px, calc(100% - 40px))`. Sections `.section` 96px vertical, `.section-sm` 64px. Page hero `.page-hero` 150px top.
- Cards are translucent off-white (`rgba(255,253,248,0.7)`) with a 1px `--line` border; lift 4–6px on hover.

### Components (all in `/assets/site.css`, behaviour in `/assets/site.js`)
- **Nav:** fixed glass pill `.header-wrap > .nav`, logo left, links + "Book a Free Call" `.btn.btn-primary.js-open-modal` right, `.menu-btn` and `.nav-mobile` slide-down menu on phones. Copy the nav and footer markup from any `services/*/index.html`.
- **Buttons:** `.btn` + `.btn-primary` (ink), `.btn-accent` (orange), `.btn-secondary` (outline glass). Optional `.btn-arrow` SVG.
- **Hero for inner pages:** `.page-hero > .container > .inner` with `.crumbs`, `h1`, `p.lede`, one button.
- **Content blocks:** `.intro-block`, `.covered-grid/.covered-card` (icon + title), `.benefits` (forest panel, lime ticks), `.without` (orange left border callout), `.faqs` (details/summary), `.related-row`, `.cta-band > .cta-card` (orange card with ring shapes).
- **Contact modal:** `#contactModal` with `#contactForm` (firstName, businessName, email, phone, service, budget, honeypot `botcheck`). Submits to Supabase table `contact_submissions` and Web3Forms, then redirects to `/thank-you/`. Keep this exact form if a page needs a CTA; do not add new form backends.
- **Scroll reveal:** add `.reveal` to blocks; site.js adds `.visible`.
- **Logos:** `/assets/logo.svg` (light backgrounds), `/assets/logo-dark.svg` (dark backgrounds), `/assets/logo-badge.svg` and `logo-badge-dark.svg` (icon only). Favicons: `/favicon.svg`, `/favicon-32.png`, `/favicon-192.png`, `/apple-touch-icon.png`.

### Page template and conventions
- One folder per page: `/<slug>/index.html` (e.g. `/services/seo-aeo/`, `/thank-you/`, `/websiteportfolio/`). Lowercase, hyphenated slugs.
- Every page head includes: charset, viewport, description, canonical, robots, `<title>… | StorefrontGrowth</title>`, the GA4 tag (`G-RZE871RS3W`), favicons, Open Graph and Twitter tags, the Google Fonts link, `/assets/site.css`, then page-specific `<style>`. Load `/assets/site.js` before `</body>`.
- Service pages add JSON-LD: `Service` + `BreadcrumbList` + `FAQPage` where there are FAQs. Organisation details: name StorefrontGrowth, url https://storefrontgrowth.com/, logo https://storefrontgrowth.com/assets/logo.svg.
- Add indexable pages to `sitemap.xml` with a `lastmod`. Pages that should not rank (thank-you, previews) get `<meta name="robots" content="noindex, nofollow">` and a `Disallow` line in `robots.txt`.
- No build step, no frameworks, no npm. Plain HTML/CSS/JS. Fonts from Google Fonts only.
- Analytics: form success is measured on `/thank-you/` with GA4 events `generate_lead` and `book_meeting`. Do not fire these elsewhere.
- Accessibility: visible focus states, `aria-label` on icon buttons, respect `prefers-reduced-motion`, no horizontal scroll at 390px.
- Check every page at 1280px and 390px before committing.

---

## B. New "brick town" direction (redesign in progress)

Preview: https://claude.ai/artifact/L1uV3f9xfXuj291YFQmJky (design-only; not deployed). Source copy in `/design-exports/brick-town-homepage.html` (not committed).

### Concept
Every marketing function is a building in one connected isometric town; roads between them show that the functions feed each other. Bricks use six-sided (hex) studs, never round, and the word "LEGO" is never used. Hover lifts a building; click opens its capability page. On phones the map is pannable and the first tap selects, the second opens.

### Colours
`--paper #f2f0e8` (page) · `--card #fbfaf6` · `--ink #161714` · `--muted #62655c` · `--forest #29412e` · `--sage #4f6f52` · `--lime #dbea8b` · `--orange #ed8154` · `--peach #f6dccd` · `--sky #e8efe4` · `--line rgba(22,23,20,.12)`.
Brick palette for 3D pieces: lime, orange, forest `#3f6045`, sage `#7fa06f`, peach, white `#f7f5ee`, black `#2e302a`, grey `#cdc8bb`, blue `#9fc4cf`.

### Type
- **Display:** Bricolage Grotesque 800, letter-spacing -0.045em, line-height ~0.96–1.0.
- **Body:** DM Sans.
- **Labels / eyebrows:** JetBrains Mono 600, 0.7rem, uppercase, letter-spacing .12em, colour sage.
- Google Fonts link: `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=DM+Sans:opsz,wght@9..40,400..700&family=JetBrains+Mono:wght@400;600&display=swap`

### Shape and motion
- Radii 22–34px on cards and bands; buttons 14px radius with a solid 5px "brick" drop shadow (`box-shadow:0 5px 0 #000`) that presses down on hover/active.
- Lime highlight behind key headline words, with small stud bumps along its top edge.
- Sections: hero (text left, animated 3D brick funnel right, hidden on phones) → town map → What we do (4 pillars) → clients → case studies → AI workflows → tools → why us → CTA → blog → FAQ → newsletter → footer.
- Motion is purposeful and loops: funnel assembles/dismantles, cars drive the town, smoke from the AI-workflows factory. Everything has a still state for `prefers-reduced-motion`.
- The 13 town functions: Strategy, Brand, Website, SEO/AEO, Content, Social, ABM, Email, Performance, PR, Events, AI workflows, Analytics (plus Product Launches and PLG as pages without buildings).
