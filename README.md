# English with Sam — landing page

One-page bilingual (UA/EN) site for Sam's online English lessons.
Plain HTML, CSS and JavaScript: **no build step, nothing to install**.

## Open it

- Double-click `index.html`, or
- deploy the folder as-is (Netlify, Fly.io, any static host).

## Where to edit

| What | File |
| --- | --- |
| All text (both languages), prices, links | `assets/js/content.js` |
| Page structure | `index.html` |
| Colours, layout, animation, mobile styles | `assets/css/styles.css` |
| Interactive parts (language, goals, steps, prices, form) | `assets/js/app.js` |
| Photos | `assets/img/` (`sam.webp` + `sam.png` fallback) |

The original 43 MB photo in `Photo/` is kept out of git; the site uses the
web-sized copies in `assets/img/`.

## Deploy

- **Netlify:** `netlify.toml` publishes the folder with no build.
  The booking form uses **Netlify Forms**: submissions appear in the Netlify
  dashboard under *Forms → trial* (turn on form detection in site settings
  if it is off, and add an email notification there).
- **Fly.io:** `Dockerfile` serves `index.html` + `assets/` on port 8080.

## Before launch

- Fill in everything still in `[brackets]` in `assets/js/content.js`
  (trial length, cancellation rule, age, payment terms, student review).
- Confirm whether the trial lesson is 499 ₴ or free.
