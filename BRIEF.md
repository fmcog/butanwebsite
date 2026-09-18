# Butan Solar Website — Build Brief (v2, rebuilt from scratch)

This is the full extracted context from the v1 draft (received via WhatsApp, originally
generated in `~/Desktop/codex/butan-landing`) plus company facts from Butan's other
systems, rewritten as the spec this site is built against. Treat this file as the
"prompt" — anyone (or any model) should be able to rebuild the site from this document.

## 1. Company identity

- **Entity:** BUTAN SOLAR SDN BHD — SSM 202501046131 (1647539-M), incorporated 2025.
  Sister company of Butan Construction; the engineering team's track record (30+ years)
  belongs to the team/Butan Construction, NOT to the 2025 entity. Copy must say
  "team with 30+ years engineering experience", never "company with 30 years".
- **Business:** Commercial & Industrial (C&I) solar EPCC in Malaysia —
  engineering, procurement, construction, commissioning.
- **Two delivery models:**
  1. **Outright purchase** — client owns the system; typical payback ~3 years.
  2. **Zero CapEx** — Butan funds the system, client buys energy **from RM0.475/kWh**;
     RM0 upfront, immediate OPEX savings.
- **Largest system delivered:** 999 kWp (Eng Beng Manufacturing).
- **Contact:** phone/WhatsApp **+60 11-1668 8339** (`wa.me/601116688339`),
  email **butansolar@gmail.com**.
- **Campaign:** discount code **`2bob2butan`** = 2% discount. Must be configurable
  in one place (it appears in hero badge, WhatsApp message, footer).

## 2. Purpose & conversion strategy (unchanged from v1 intent)

Single-offer landing page whose only job is to produce a WhatsApp conversation.

- **Primary CTA everywhere:** "Get proposal on WhatsApp".
- **Lead form asks exactly two things:** company name + monthly bill range (RM).
  On submit: build a pre-filled WhatsApp message (company, bill range, estimated
  system size & savings, campaign code) → open `wa.me` link → also fire an email
  notification via FormSubmit AJAX (`https://formsubmit.co/ajax/butansolar@gmail.com`).
  WhatsApp is the primary channel; email is best-effort backup.
  ⚠️ FormSubmit requires one-time activation: the first real submission emails a
  confirmation link to butansolar@gmail.com — someone must click it or emails silently drop.
- **Mobile sticky bottom bar:** Call | WhatsApp (mobile is the main traffic source).
- **Bill-to-savings estimator** driven by the bill-range selection (bands in §5).

## 3. Truthfulness constraints (why v1 was rejected)

The v1 draft fabricated credibility. The rebuild enforces these rules **structurally**:

1. **No fabricated testimonials.** v1 invented quotes attributed to real clients
   (e.g. "Finance Director, Integrated Formway"). The testimonial section exists in
   code behind `CONFIG.showTestimonials = false` and ships EMPTY. It renders only
   when approved, attributed quotes are added to `TESTIMONIALS`.
2. **Modeled numbers must say so.** Project financials (before/after bills, cost,
   payback) are modeled estimates until signed-off actuals replace them. Every
   project has `verified: false` → card shows a "Modeled estimate" tag. Flip to
   `true` per project once Bob confirms the numbers from the accounting data.
3. **No stock photos passed off as our installs.** No Unsplash. Projects render a
   branded placeholder visual until a real site photo path is set in `photo`.
   Hero uses an owned SVG illustration, not a stock photo.
4. **Footer carries the legal identity:** company name + SSM number.

## 4. Client portfolio (real names — from v1, confirmed by Bob's project docs)

IKON Connaught (mall + office, KL) · BONIA Warehouse (Selangor) · Carlo Rino
Warehouse (Selangor) · Dasher Office (KL, office + cafe) · DSS BHD Nilai ·
DSS BHD Puchong · Micro CTRL · Eng Beng Manufacturing (factory, 999 kWp) ·
ePARK Residence (2 residential blocks) · Integrated Formway · Integrated Plastic
Kogyo · JYC Battery A · JYC Battery B · VES Industrial · Biotek Abadi ·
Wheelcorp Premium.

### Featured projects (8) — sizes are real; RM figures MODELED until verified

| Project | Type / Location | Model | Size | Before → After (modeled) | Cost (modeled) | Payback |
|---|---|---|---|---|---|---|
| IKON Connaught | Mall + Office, KL | Outright | 185.73 kWp | RM54.5k → RM31.9k | RM770k | 2.8–3.4 yr |
| BONIA Warehouse | Warehouse, Selangor | Outright | 75 kWp | RM21.7k → RM12.9k | RM300k | 2.9–3.5 yr |
| Carlo Rino Warehouse | Warehouse, Selangor | Outright | 83.025 kWp | RM24.2k → RM14.3k | RM337k | 2.9–3.6 yr |
| Dasher Office | Office + Cafe, KL | Outright | 52.5 kWp | RM15.6k → RM9.1k | RM214k | 2.8–3.5 yr |
| Eng Beng Manufacturing | Factory | Outright | 999 kWp | RM286k → RM166.5k | RM3.98m | 2.8–3.4 yr |
| ePARK Residence | 2 residential blocks | Zero CapEx @ RM0.475 | 237.39 kWp | RM68.9k → RM50.6k | RM0 upfront | immediate |
| Integrated Formway | Factory | Zero CapEx @ RM0.475 | 172.2 kWp | RM49.3k → RM36.7k | RM0 upfront | immediate |
| Integrated Plastic Kogyo | Factory | Zero CapEx @ RM0.475 | 92.25 kWp | RM26.6k → RM19.4k | RM0 upfront | immediate |

## 5. Estimator bill bands (monthly TNB bill → modeled outcome)

| Bill range (RM/mo) | System | Savings /mo | Savings /yr |
|---|---|---|---|
| Below 10k | 35–70 kWp | RM2.5k–6k | RM30k–72k |
| 10k–25k | 70–160 kWp | RM6k–12k | RM72k–144k |
| 25k–50k | 180–320 kWp | RM10k–22k | RM120k–264k |
| 50k–100k | 320–700 kWp | RM22k–46k | RM264k–552k |
| Above 100k | 700 kWp–1.5 MWp | RM46k–100k+ | RM552k–1.2m+ |

Estimator output is always labeled "modeled estimate — confirmed after site assessment".

## 6. Page structure (v2)

1. **Topbar** — brand, anchor nav, call button (sticky).
2. **Hero** — headline on Zero CapEx + savings; sub on EPCC credibility; CTAs
   (WhatsApp proposal / view projects); campaign-code badge; owned SVG panel artwork
   with floating stat chips (999 kWp, Outright + 0 CapEx).
3. **Trust band** — 4 chips: 30+ yrs team experience · up to 999 kWp · Zero CapEx
   from RM0.475/kWh · fast WhatsApp reply.
4. **Two models compared** — Outright vs Zero CapEx side-by-side card comparison
   (new in v2; this is the core commercial decision for a C&I buyer).
5. **Featured projects** — 8 data-driven cards: size/type/location real, RM metrics
   tagged "Modeled estimate" until `verified: true`, photo slot with branded fallback.
6. **Client wall** — animated marquee of the 16 client names + sectors
   (pauses on hover, disabled under `prefers-reduced-motion`).
7. **Estimator + lead form** — bill-band selector previews modeled outcome; 2-field
   form → WhatsApp + FormSubmit email.
8. **Testimonials** — hidden until real quotes exist (§3.1).
9. **FAQ** — 4 short C&I objections (roof suitability, downtime, maintenance, Zero CapEx terms).
10. **Footer** — legal entity + SSM, contact, campaign code.
11. **Mobile sticky Call | WhatsApp bar.**

## 7. Technical requirements

- **Stack:** static HTML + CSS + vanilla JS, no build step (GitHub Pages / Vercel ready).
- **All content data lives in `data.js`** (CONFIG, BILL_BANDS, CLIENTS, PROJECTS,
  TESTIMONIALS, FAQ) — copy edits never touch markup or logic.
- **Design:** light, premium; orange accent `#ff6900`; Sora (display) + Manrope (text)
  via Google Fonts; generous whitespace; subtle reveal-on-scroll (IntersectionObserver,
  off under `prefers-reduced-motion`).
- **SEO/meta:** title, description, Open Graph, canonical placeholder, JSON-LD
  LocalBusiness (name, phone, email), inline SVG favicon.
- **Accessibility:** semantic landmarks, labels on all inputs, `aria-live` form status,
  visible focus states, WCAG-AA contrast.
- **Performance:** no frameworks, no stock-photo payloads; fonts are the only
  external requests.

## 8. Deploy & next steps

- Repo: `github.com/fmcog/butanwebsite` (currently empty) → GitHub Pages or Vercel.
- Before go-live: activate FormSubmit (§2), confirm project RM figures (§4),
  collect real site photos, decide on a proper domain + email
  (butansolar@gmail.com works but a domain email looks better on a premium page).
