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

## ⚠️ Content to verify before publishing

The source doc has several leftover references from other companies'
templates that were carried over verbatim. Fix these before this goes live:

1. **"Molex"** appears twice in the CSP overview ("Molex preferred method of
   transacting with Indirect Supplier", "receiving Molex communications") —
   replaced with "BioTouch" in the built page as the only sensible reading,
   but please confirm that's correct.
2. **Email domain mismatch**: support email is written as
   `suppliersupport@biotouch.com` — note `biotouch.com`, not
   `biotouchglobal.com`. Confirm the real inbox before publishing.
3. **`biotocuh.com`** (typo, invoicing FAQ) — left out of the rendered copy
   since it's unusable as-is; the sentence was rewritten to say "contact the
   BioTouch Corporate Accounts Payable team" without a bare domain. Supply
   the correct address/link.
4. ~~**`wmsc.ap@wm.com`** (PO-cancellation FAQ) — this is a Waste Management
   (wm.com) email address, almost certainly copied from a WM template by
   mistake.~~ Fixed — now `purchasing@biotouchglobal.com`.
5. All "click here" / "download guide" / "terms and conditions" links point
   to `#` placeholders (onboarding video, T&Cs, Coupa Success Portal,
   Registration & E-Invoicing guide) — swap in real URLs.
6. "First Time Users" and "Useful Documents" had no source copy for CSP —
   Useful Documents was populated with reasonable placeholder entries
   inferred from links mentioned elsewhere in the doc; First Time Users has
   a stub message. Replace both with real content when available.
