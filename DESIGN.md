# Corporate Gardener — design system

The concept is a **living garden, tended over a long time**. Art direction shifts by
section: an atmospheric, low light garden in the hero, opening into a calm, warm off
white body, punctuated and grounded by deep green black bands. A single botanical
**growing line** is drawn down the page as you scroll and ties the metaphor together.

Everything is monochrome plus **one green**. The discipline is the point: the green is
used for the growing line, accent marks, focus states and small details, never as body
text (it fails contrast at body size).

## Colour tokens (`css/style.css :root`)

| Token | Value | Use |
|---|---|---|
| `--leaf` | `#adb52e` | the single accent, from the logo |
| `--leaf-deep` | `#7f861f` | darker green for hover on light backgrounds |
| `--paper` | `#f4f2ea` | warm off white body (replaces the old cream `#e4dfd9`) |
| `--paper-2` | `#ece9df` | slightly deeper panel |
| `--surface` | `#ffffff` | inputs, raised elements |
| `--ink` | `#16170f` | near black headings, faint green warmth |
| `--ink-body` | `#33342a` | body copy on paper (~11:1) |
| `--ink-mute` | `#565749` | secondary text on paper (~5.4:1, passes AA) |
| `--line` | `#d9d6ca` | hairlines on paper |
| `--forest` | `#14180d` | deep green black ground (hero scrim, credentials, CTA, footer) |
| `--forest-2` | `#1d2213` | raised forest |
| `--on-dark` | `#f4f2ea` | text on forest |
| `--on-dark-mute` | `#c2c6b2` | secondary text on forest (~5:1) |

The ink and forest ramps are nudged a hair toward the leaf hue so the whole page reads
as one warm, slightly green family rather than pure grey.

## Typography

Two families on a real contrast axis (serif + sans), both from Google Fonts, loaded via
CDN so there is no build step.

- **Display / headings — Fraunces** (400–600, `SOFT` axis at 80). A soft, organic serif
  that suits the gardening idea while staying professional. Used for h1, h2, h3, the
  pull quote and the credential numerals. (Was Spectral, before that Young Serif.)
- **Body / UI — Hanken Grotesk** (400 / 500 / 600 / 700). Clean, warm humanist sans.

Scale is fluid `clamp()`. Display letter spacing is floored at about -0.02em. Headings
use `text-wrap: balance`, long prose uses `text-wrap: pretty`.

## Layout

- Content column max `--page-max` 1180px, fluid `--gutter` (20–48px).
- Services are **editorial rows**, not a grid of identical cards, and alternate their
  emphasis left/right on wider screens so they don't read as a stamped template.
- Credentials are a **forest band** with ruled, serif numerals rather than boxed stat
  cards.
- The work list is a sticky heading beside a ruled list.

## Motion

Hand rolled in vanilla JS (`js/main.js`), no motion library, for speed and robustness.

- **The growing line.** An SVG stem is generated from live page geometry (manifesto to
  contact), drawn via `stroke-dashoffset` tied to scroll progress, with four leaves that
  sprout as the draw passes them. Rebuilt on resize so it survives reflow.
- **Scroll reveals** fade sections up as they enter; siblings in a group stagger. They
  only arm once `body.js` is set, so with no JS the content is fully visible.
- **Reduced motion:** the line is shown fully drawn and static, reveals are off, the
  hero image parallax scale is removed, and all transitions collapse. See the
  `prefers-reduced-motion` block at the end of the stylesheet.

## Imagery

- **Hero:** `assets/hero.jpg`, a real greenhouse at golden hour, graded
  (`saturate 0.82`, slightly darkened) and covered by a green black scrim so it sits in
  the muted palette. On theme (a greenhouse) and atmospheric.
- **CTA bands were removed July 2026** (Nic found them repetitive with the nav's Get in
  touch button). The botanical SVG lives only in git history now; the footer carries the
  closing contact link.
- **About:** `assets/nic-tri.jpg`, a candid of Nic in Berkshire Tri Squad kit, cropped to
  4 / 5 from a wider race day shot. Personal on purpose; it pairs with the "I started in
  sport" opening and the sport paragraph.
- **What I do:** `assets/nic-face.jpg`, a tight square face crop of the professional
  headshot, shown as a small circle beside the section heading (`.head-portrait`) so a
  face appears early in the page. The full headshot source is kept at `assets/nic.jpg`.
- Swapping the hero for commissioned or generated **painterly garden art** later is a one
  line change to `.hero-media` in the CSS. Keep roughly the same wide, low light, muted
  look.

## Accessibility

- Body text ≥ 4.5:1, large text ≥ 3:1, verified against paper and forest grounds.
- Green is never used for body text.
- Visible `:focus-visible` rings, a skip link, labelled form fields, `aria-live` status
  on the form, reduced motion honoured throughout.

## Multi page structure (added July 2026)

The site is now five pages (Home, What I do, How I work, About, Contact) sharing the
same stylesheet and script. Inner pages use the `.page-head`, `.page-section`, `.split`,
`.plain-list`, `.vignette`, `.beliefs` and `.steps` patterns. The growing line reads its
anchors from `data-vine-start` / `data-vine-end` on sections, so each page controls its
own vine; the contact page deliberately has none.

## Go live checklist

1. **Copy sign off** — Nic confirms every client name and figure, the "25+ years"
   number, both ship examples, and the personal detail on the About page.
2. **Deploy** — connect the repo to Netlify (or drag the folder in). `netlify.toml`
   publishes the folder as is; the contact form is wired to **Netlify Forms**
   (`data-netlify="true"`) so enquiries appear in the Netlify dashboard and by email with
   no backend. If a different host is preferred, switch the form to Formspree instead.
3. **Domain** — point `corporategardener.co.uk` DNS at the host. SSL is issued
   automatically, which also fixes the broken certificate on the old site.
4. **Post launch** — set a notification email on the Netlify form, and submit the sitemap
   in Google Search Console.
