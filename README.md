# Corporate Gardener — website

The site for corporategardener.co.uk, the practice of Nic Brocklebank: consultant,
facilitator and coach. Plain HTML, CSS and JavaScript, no build step, so it can be
hosted anywhere.

## Files

- `index.html` — Home, the overview page
- `what-i-do.html` — the three kinds of work: consulting, facilitation, coaching
- `how-i-work.html` — approach, beliefs, evidence, recording and consent
- `about.html` — Nic's story, why the name, professional standards
- `contact.html` — contact details, "how it usually starts", and the form
- `css/style.css` — all styling; design tokens sit in `:root` at the top
- `js/main.js` — sticky nav, mobile menu, scroll reveal, the growing line, contact form
- `assets/` — photography and favicon
- `PRODUCT.md` — who the site is for and the one job it has to do
- `DESIGN.md` — the design system: colour, type, motion, imagery, accessibility
- `netlify.toml`, `robots.txt`, `sitemap.xml` — hosting and search

The header and footer are duplicated in each HTML file on purpose (no build step).
If you change the nav or footer, change it in all five files. The growing line picks
its start and end from `data-vine-start` / `data-vine-end` attributes on sections;
pages without them (contact) simply have no vine.

## Copy rules

The whole site is written for someone who has never bought consultancy before:

- No HR or consultant jargon. If a hotel general manager wouldn't say it, rewrite it.
- Nic is a **facilitator**, never a "trainer". Don't reintroduce the word for his own work.
- British spelling, no em dashes, no joined-up hyphens, per the house style.

## Preview locally

From this folder:

```
python3 -m http.server 8000
```

then open http://localhost:8000. (The contact form only actually sends once the site is
on Netlify; locally it will show its "please email me" fallback, which is expected.)

## Before it goes live

1. **Copy sign off.** Nic reads every word. In particular: the "25+ years" figure, every
   client name (including "a global cruise line" staying anonymous), the Genoa and
   restaurant team examples, the Visa job title, and the personal detail on the About
   page (anti doping, triathlon, rugby, the bike business).
2. **Deploy and domain.** See the go live checklist in `DESIGN.md`. In short: connect the
   repo to Netlify, then point the domain at it. The contact form uses Netlify Forms, so
   enquiries arrive with no backend to run.

## Design notes

- One accent only: the brand green `--leaf` (#adb52e) at the top of `css/style.css`. The
  design works because there is a single green; keep it that way.
- Fonts are Spectral (headings) and Hanken Grotesk (body), loaded from Google Fonts.
- The hero uses a real greenhouse photo, graded to fit the muted palette. It can be
  swapped for painterly garden art later by changing `.hero-media` in the CSS.

## Housekeeping

`assets/coaching.jpg` is no longer used by the site (the CTA band is now a botanical
illustration). It is left in place in case it is wanted later; safe to delete.
