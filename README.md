# English with Sam — landing page

One-page site for Sam's online English lessons. Vite + React, Ukrainian and English.

## Run it

```bash
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # production files in dist/
npm run preview   # serve the built dist/ folder
```

## Where to edit

- **All text, prices, links:** `src/content.js` (both `ua` and `en`).
- **Layout:** `src/App.jsx`
- **Styles, colours, breakpoints:** `src/index.css` (tokens at the top)
- **Photo:** `public/sam.jpg`

## Before launch

- Fill in everything still in `[brackets]` in `src/content.js` (trial length, cancellation rule, age, payment terms, review).
- Add a real student review and photo.
- The booking form is not connected yet: on submit it only shows a thank-you message
  and a Telegram link. Connect it in `onSubmit` in `src/App.jsx`
  (e.g. Netlify Forms, Formspree, or a Telegram bot).
- Confirm whether the trial lesson is 499 ₴ or free (Sam's Linktree says free).
