# v4 addendum (2026-09-24) — sharp angle, SEO/GEO

Bob's brief: v3 was cluttered and text-heavy with no sharp angle. v4 cuts copy to ~900 words and leads with the honest-engineer position: **DC fire risk** (DC arcs don't self-extinguish; substandard e-commerce MC4/DC cable → contact resistance → fire; Bomba won't spray a live array; rapid shutdown fixes it), plus **three rules of thumb** — investment ≈ **18× monthly bill**, **~RM1/panel/day**, **~RM1.1k/panel installed**. The estimator derives from these three so the site never contradicts itself. Project cards drop modeled RM figures entirely (sizes only). SEO/GEO: canonical, OG, Organization+LocalBusiness+FAQPage JSON-LD, answer-first FAQ, robots.txt, sitemap.xml, llms.txt. Everything below is the v3 spec and remains the source for company facts.

# Butan Solar Website — Build Brief (v3, sales-pipeline-driven)

v3 supersedes the v2 brief. New inputs: z21studio.com (design reference), the Notion
Butan Solar command center (Sales FAQ, Sales Pipeline DB), and past Gamma proposal
decks (JARING 383 kWp, BHPetrol SelCo+BESS prompt). Treat this file as the prompt —
the site should be rebuildable from this document alone.

## 1. Company identity (corrected in v3 — stronger than v2 told it)

- **Butan Construction Sdn Bhd, established 1996**, Klang, Selangor — trading as
  **Butan Solar**. Nearly 30 years in piling, foundations, civil engineering.
- **Butan Solar Sdn Bhd** — SSM 202501046131 (1647539-M), incorporated 2025 (both
  entities in footer).
- **Credentials (all real, all verifiable):**
  - CIDB **Grade 7** contractor (unlimited project size)
  - **SEDA Registered PV Service Provider** — verifiable at the public SEDA directory
  - **Registered Photovoltaic Investor (RPVI)** under SEDA — the licence that makes
    Zero CapEx / SARE PPA deals possible
  - **ST Class A** registered electrical contractor (all voltage levels)
  - LONGi Malaysian distributor · Solis inverter partner
  - Full EPCC + comprehensive all-risk insurance during installation
- **Contact:** +60 11-1668 8339 (call/WhatsApp, `wa.me/601116688339`),
  butansolar@gmail.com. Campaign code **`2bob2butan`** = 2% discount (one config place).

## 2. Purpose: feed the Sales Pipeline

The site's job is to create qualified leads in Bob's **Notion Sales Pipeline** database
(collection `721ba9db-a791-834b-841a-079d2df33929`) and start WhatsApp conversations.

**Lead flow on form submit (order matters — WhatsApp first, before any await):**
1. Open pre-filled WhatsApp message (`wa.me/601116688339`).
2. `POST /api/lead` (Vercel serverless) →
   - Notion page in Sales Pipeline: `Name`, `Lead Status: Cold`,
     `Client Type: Commercial|Residential`, `Financing: Outright|0 capex|Bank loan`
     (omitted if "not sure"), `Description/Issue` = "Website lead — bill range,
     phone, date". Source noted in Description (no schema mutation).
   - Notification email via FormSubmit AJAX server-side → **chongyao1@gmail.com**,
     cc butansolar@gmail.com. ⚠️ One-time FormSubmit activation on first submission.
3. If the API fails, the visitor is already in WhatsApp; status text degrades gracefully.

**Form fields (map 1:1 to pipeline):** name/company · client type (Business/Home) ·
monthly bill range · financing interest · phone (optional). Honeypot field for spam.

## 3. Truthfulness constraints (unchanged from v2, structural)

1. Testimonials ship EMPTY behind `CONFIG.showTestimonials=false` until approved quotes.
2. Project RM figures carry `verified:false` → "Modeled estimate" tag until confirmed.
3. No stock photos as installs — owned SVG artwork + branded placeholders with `photo` slots.
4. Footer carries both legal entities. "30 years" = Butan Construction/team, est. 1996.

## 4. Content pillars (extracted from Gamma proposals + Sales FAQ)

- **Numbers band (z21-style):** Since 1996 · CIDB Grade 7 · ~1.9 MWp across featured
  projects · largest single site 999 kWp · Zero CapEx from RM0.475/kWh.
- **Journey (~3 months contract → live):** site survey & load study → design freeze
  (~2 wks) → procurement (4–6 wks) → installation (4–6 wks) → TNB commissioning &
  handover → 1–2 yr free O&M + 2 yr DLP.
- **Three ways to pay** (matches pipeline `Financing`): Outright (payback ~3.5–4.6 yr
  with GITA+CA) · Zero CapEx SARE PPA (RM0 upfront, Butan invests/owns/maintains as
  RPVI, client buys energy from RM0.475/kWh) · Bank loan.
- **Tax incentives:** GITA (60% of capex) + Capital Allowance → up to ~38% of system
  cost recovered via tax; JARING worked example: RM 632,189 system, RM 242,760 tax
  benefit, payback 4.6 → 3.5 years. Modeled label; GITA submitted to MGTC on completion.
- **Equipment (Tier-1 only):** LONGi Hi-MO 7 615W N-type TOPCon (25-yr performance,
  12-yr product, 0.40%/yr degradation) · Huawei (premium, FusionSolar) or Solis
  (value, Solis Cloud) inverters, both 10-yr warranty + built-in AFCI ·
  JJ-Lapp/Helukabel DC cables · genuine Stäubli MC4 · Butan-fabricated mounting
  (15-yr) · 2-yr DLP · 1–2 yr complimentary O&M · all-risk insurance. RSD (Fonrich)
  optional, BOMBA-recommended. No microinverters (reliability in MY heat).
- **Schemes:** Solar ATAP (current policy, replaced NEM 3.0 Jan 2026 — no quota,
  10-yr tenure, all TNB customers) · SelCo zero-export (BESS mandatory >72 kWp
  non-domestic) · SARE/PPA for non-owners.
- **Residential path:** ATAP limits 5 kWac single-phase / 15 kWac three-phase,
  ~2–3 month timeline, same Tier-1 kit, self-consumption = best savings.
- **Estimator (Butan's own rule of thumb, labeled modeled):**
  Daily kWh = kWp × 4 PSH × 82.5% efficiency; ~60.9 kWh/month per 615W panel.
- **FAQ answers** from the Sales FAQ page, incl. "Your website looks new — are you
  legit?" → est. 1996, CIDB Grade 7, verify at SEDA directory.
- **Payment structure:** milestone-based (typically 40/40/20); deposit refunded if
  ATAP/SelCo approval fails.

## 5. Featured projects & clients (same dataset as v2)

8 delivered projects (sizes real, RM modeled until verified): IKON Connaught 185.73 ·
BONIA 75 · Carlo Rino 83.025 · Dasher 52.5 · Eng Beng 999 · ePARK 237.39 (0-capex) ·
Integrated Formway 172.2 (0-capex) · Integrated Plastic Kogyo 92.25 (0-capex) kWp.
Client wall adds: DSS BHD Nilai & Puchong, Micro CTRL, JYC Battery A & B,
VES Industrial, Biotek Abadi, Wheelcorp Premium.

## 6. Design system (reference: z21studio.com)

Editorial light theme: white/near-white, generous whitespace, ONE bold accent
(Butan orange #ff6900), Sora display + Manrope text, full-bleed stat band with huge
numerals, soft-shadow cards, long-form funnel storytelling ending at the lead form,
scroll reveals (off under prefers-reduced-motion), mobile sticky Call|WhatsApp bar,
WCAG-AA contrast, semantic landmarks.

## 7. Architecture

Static HTML/CSS/JS + one Vercel serverless function. No framework, no build step.

```
index.html   markup only          data.js    ALL editable content
styles.css   design system        script.js  render + estimator + lead flow
api/lead.js  Notion + email       BRIEF.md / README.md
```

`api/lead.js` needs env var `NOTION_TOKEN` (Notion internal integration shared with
the Sales Pipeline DB). Data source ID: `721ba9db-a791-834b-841a-079d2df33929`.

## 8. Deploy & go-live checklist

- Repo `fmcog/butanwebsite` → Vercel (Bob's account).
- [ ] Create Notion internal integration, share Sales Pipeline DB, set NOTION_TOKEN
- [ ] FormSubmit activation click (first submission emails a confirm link)
- [ ] Test lead end-to-end → archive test row
- [ ] Later: verified RM figures, real photos, approved testimonials, custom domain,
      add "website" option to pipeline `Source` select
