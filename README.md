# Butan Solar — C&I Solar EPCC Landing Page

Static single-page site for Butan Solar Sdn Bhd (SSM 202501046131 (1647539-M)).
No build step — deployable as-is to GitHub Pages, Vercel, or any static host.

Full build spec and extracted context: [BRIEF.md](./BRIEF.md).

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Files

- `index.html` — markup only, no content data
- `styles.css` — all styling (light theme, orange accent, reduced-motion aware)
- `data.js` — **all editable content**: config, bill bands, clients, projects, testimonials, FAQ
- `script.js` — rendering + estimator + lead flow (don't edit for copy changes)

## Editing content

Everything lives in `data.js`:

- `CONFIG` — phone, WhatsApp number, email, campaign code, feature flags
- `PROJECTS` — per project, set `verified: true` once RM figures are confirmed
  against final bill data (removes the "Modeled estimate" tag), and set `photo`
  to a real site photo path to replace the branded placeholder
- `TESTIMONIALS` — ships empty; add only client-approved quotes, then set
  `CONFIG.showTestimonials = true`

## Lead flow

On submit, the form opens a pre-filled WhatsApp message to +60 11-1668 8339 and
sends a backup email notification via FormSubmit.

⚠️ **Before go-live:** FormSubmit requires one-time activation — the first
submission emails a confirmation link to butansolar@gmail.com. Click it once or
email notifications silently drop (WhatsApp flow works regardless).
