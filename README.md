# BioTouch Global — Supplier Page

Standalone React (Vite) build of the Supplier page. No site header/footer is
included — this is meant to be embedded into (or deployed alongside) the
existing biotouchglobal.com shell.

## Run it locally

Node.js was not detected on the machine this was built on, so it hasn't been
run yet. Install Node.js 18+ (https://nodejs.org), then from this folder:

```
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for deployment

```
npm run build
```

Outputs a static bundle to `dist/` that can be hosted anywhere (or the
`SupplierPage` component in `src/SupplierPage.jsx` can be dropped straight
into the main site's React app instead of deploying separately).

## Structure

- `src/SupplierPage.jsx` — the page, with in-page tabs (Supplier / Coupa
  Supplier Portal / FAQs & Coupa Guides), matching the box/card layout from
  the reference screenshot.
- `src/supplierContent.js` — all copy, transcribed from
  `COUPA WEBSITE PAGE.txt`, kept separate from markup so it's easy to edit.
- `src/SupplierPage.css` — styling using colors/font pulled from
  biotouchglobal.com's own stylesheet (Poppins font; green #60bc14, purple
  #5e2e9b / #3e2b56, teal #4eb3bd; pill buttons; large-radius cards).
- `src/icons.jsx` — small inline SVG icons (no external icon library).

