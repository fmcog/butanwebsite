# Butan Solar — Website (v3)

Sales-pipeline-driven site for Butan Solar (Butan Construction Sdn Bhd, est. 1996,
CIDB Grade 7). Static HTML/CSS/JS + one Vercel serverless function.

Full build spec and extracted context: [BRIEF.md](./BRIEF.md).

## Run locally

```bash
python3 -m http.server 8000
```

(The `/api/lead` function only runs on Vercel or `vercel dev`; the static page
degrades gracefully without it — WhatsApp still opens.)

## Files

- `index.html` — markup only, no content data
- `styles.css` — z21-inspired editorial design system (light, orange accent)
- `data.js` — **all editable content**: config, credentials, stats, journey,
  financing models, tax story, projects, clients, equipment, residential, FAQ, bill bands
- `script.js` — rendering + estimator + lead flow
- `api/lead.js` — Vercel function: Notion Sales Pipeline write
- `api/content.js` — Vercel function: reads the Notion Website Content DB (gallery + logos)

## Lead flow

On submit: WhatsApp opens immediately with a pre-filled message, then `POST /api/lead`:

1. Creates a page in the Notion **Sales Pipeline** DB — `Lead Status: Cold`,
   `Client Type`, `Financing`, bill range + phone in `Description/Issue`.
2. Emails chongyao1@gmail.com (cc butansolar@gmail.com) via FormSubmit.

## Deploy checklist (Vercel)

1. **Notion integration** (one-time, ~2 min):
   - notion.so/my-integrations → New integration (internal), workspace: Butan
   - Copy the secret → Vercel project env var `NOTION_TOKEN`
   - Open the Sales Pipeline database in Notion → ⋯ → Connections → add the integration
2. **FormSubmit activation** (one-time): the first submission emails a confirmation
   link to chongyao1@gmail.com — click it, or email notifications silently drop.
3. Deploy; test a lead end-to-end; archive the test row in Notion.

## Photos & logos — edited in Notion (the CMS)

Open **Butan Solar → 🖼️ Website Content** in Notion. Each row is either a
`Project` (photo gallery) or a `Client logo` (scrolling "Trusted by" bar).

- Upload to **Photo** (project: landscape, ~1600px wide; logo: PNG/SVG with
  transparent background), fill **Caption / Size / Model**, set **Order**,
  tick **Published**.
- The site (`/api/content`) re-reads the database every 5 minutes. Untick
  Published to hide a row; delete nothing.
- If Notion is unreachable, the site falls back to the names in `data.js`.

The Notion integration must be connected to this database as well as to the
Sales Pipeline (⋯ → Connections on the database page).

## Content rules

- `PROJECTS[n].verified: true` removes the "Modeled estimate" tag — only after the
  RM figures are confirmed against final bill data.
- `PROJECTS[n].photo` — set a real site photo path to replace the branded placeholder.
- `TESTIMONIALS` ships empty; add only client-approved quotes, then set
  `CONFIG.showTestimonials = true`. Never publish unapproved quotes.
