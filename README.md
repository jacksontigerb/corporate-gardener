# Corporate Gardener — website

A one page site for corporategardener.co.uk, the coaching and organisation
development practice of Nic Brocklebank. Plain HTML, CSS and JavaScript, no build
step, so it can be hosted anywhere.

## Files

- `index.html` — the whole site, one scrolling page
- `css/style.css` — all styling; design tokens sit in `:root` at the top
- `js/main.js` — sticky nav, mobile menu, scroll reveal, the growing line, contact form
- `assets/` — photography and favicon
- `PRODUCT.md` — who the site is for and the one job it has to do
- `DESIGN.md` — the design system: colour, type, motion, imagery, accessibility
- `netlify.toml`, `robots.txt`, `sitemap.xml` — hosting and search

## Preview locally

From this folder:

```
python3 -m http.server 8000
```

then open http://localhost:8000. (The contact form only actually sends once the site is
on Netlify; locally it will show its "please email me" fallback, which is expected.)

## Before it goes live

1. **Phone number.** In `index.html`, search for `[PHONE]` and `PHONE-GOES-HERE` in the
   contact section and put in Nic's real number, or delete that line. Email is already in.
2. **Copy sign off.** All client names and figures come from Nic's public bio. He should
   read every word and correct anything that has drifted.
3. **Deploy and domain.** See the go live checklist in `DESIGN.md`. In short: connect the
   repo to Netlify, then point the domain at it. The contact form uses Netlify Forms, so
   enquiries arrive with no backend to run.

## Design notes

- One accent only: the brand green `--leaf` (#adb52e) at the top of `css/style.css`. The
  design works because there is a single green; keep it that way.
- Fonts are Young Serif (headings) and Hanken Grotesk (body), loaded from Google Fonts.
- The hero uses a real greenhouse photo, graded to fit the muted palette. It can be
  swapped for painterly garden art later by changing `.hero-media` in the CSS.

## Housekeeping

`assets/coaching.jpg` is no longer used by the site (the CTA band is now a botanical
illustration). It is left in place in case it is wanted later; safe to delete.
