# StorefrontGrowth — Home Page

Static implementation of the **StorefrontGrowth Home Page**, built to the
**"Main Street Classic" (3a)** brand system from the StoreFrontGrowth Brand
Guidelines (v1.0).

## Files
- `index.html` — the home page (semantic HTML, no build step, no dependencies)
- `styles.css` — all styling, with the brand palette as CSS variables at the top

## Run locally
It's a plain static site — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Deploy anywhere that serves static files (e.g. `vercel deploy`).

## Brand system (from the guidelines)

**Colors**
| Token | Hex | Use |
|-------|-----|-----|
| Navy | `#1E3250` | brand base |
| Growth green | `#31B665` | actions & wins (earned, not decorative) |
| Brick | `#B3402E` | awning stripe & alerts |
| Brass | `#D9A441` | ratings only |
| Cream | `#F7F2E7` | warm surface |
| White | `#FFFFFF` | page base |

**Type** — Zilla Slab (500/600/700) for headlines, Nunito (400/600/700/800) for
body & UI, loaded from Google Fonts.

**Style rules** — 0px corners everywhere, flat color (no drop shadows, no
gradients), 1.5px hairline borders (`#E5DFD0`). The awning stripe (barber-pole
diagonal) never exceeds ~16px and is never a full background. Never put green
text on navy.

## Swapping in the hero photo
The hero has a placeholder where a real photo goes. In `index.html`, replace the
`.img-placeholder` div inside `.hero-frame` with:

```html
<img src="your-photo.jpg" alt="Owner at their shop door">
```

The offset cream block behind the frame is intentional (the brand's flat "depth
through color blocking" look) and needs no change.

## Notes
- Copy is reproduced verbatim from the design. The testimonials are flagged
  **placeholder** — replace with real, attributable quotes before publishing
  (per the brand's "publish real testimonials only" rule).
- Fully responsive: multi-column grids collapse to a single column and the nav
  becomes a hamburger toggle at ≤640px.
