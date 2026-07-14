# StorefrontGrowth

Marketing site for StorefrontGrowth — helping small and growing businesses
attract more customers, convert more leads, and automate follow-up.

**Live:** https://storefrontgrowth.com · https://kapilgadhire.github.io/storefrontgrowth/

## Stack
A single self-contained `index.html` — all CSS and JavaScript are inline, no
build step and no dependencies (fonts load from Google Fonts). Deployed via
GitHub Pages from `main`; the custom domain is set in `CNAME`.

## What's on the page
- Sticky glass **nav** with a mobile slide-down menu
- **Hero** with an animated dashboard mockup, floating stat cards, and a count-up figure
- Scrolling **services marquee**
- **Outcomes** cards, an accordion **services** list, and tabbed **process** section
- Interactive **ROI calculator** (traffic → leads → customers → revenue)
- **Testimonials** slider, **FAQ** accordion, and a **contact modal** form
- Scroll-reveal animations (respects `prefers-reduced-motion`)

## Before going fully live
- **Testimonials** are placeholder examples — replace with verified client quotes.
- The **contact form** only shows a success message; wire it to a real CRM or
  form endpoint (the `#contactForm` submit handler in the inline script).

## Local preview
```bash
python3 -m http.server 8787   # then open http://localhost:8787
```

## Publishing
```bash
git add -A && git commit -m "..." && git push   # Pages redeploys in ~1 min
```
