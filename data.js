/* All site content lives here. Edit this file — never index.html — for copy/data changes. */

const CONFIG = {
  brandName: "Butan Solar",
  legalLine1: "Butan Construction Sdn Bhd — trading as Butan Solar. Established 1996 · CIDB Grade 7.",
  legalLine2: "Butan Solar Sdn Bhd — SSM 202501046131 (1647539-M).",
  phoneDisplay: "+60 11-1668 8339",
  phoneTel: "+601116688339",
  whatsappNumber: "601116688339",
  teamEmail: "butansolar@gmail.com",
  leadEndpoint: "/api/lead",
  /* Email notifications go browser → FormSubmit (datacenter IPs are blocked,
     so this cannot live in the serverless function). Needs one-time activation. */
  notifyEmailEndpoint: "https://formsubmit.co/ajax/chongyao1@gmail.com",
  notifyCc: "butansolar@gmail.com",
  campaignCode: "2bob2butan",
  campaignOffer: "2% discount",
  zeroCapexRate: "RM0.475/kWh",
  sedaDirectoryUrl: "https://www.seda.gov.my/directory/registered-pv-service-provider-directory/",
  // Testimonials stay hidden until TESTIMONIALS holds real, approved quotes.
  showTestimonials: false
};

/* Credential chips shown in the hero. All real and verifiable. */
const CREDENTIALS = [
  "Est. 1996",
  "CIDB Grade 7",
  "SEDA Registered PV Service Provider",
  "Registered Photovoltaic Investor",
  "ST Class A Electrical Contractor",
  "LONGi & Solis Partner"
];

/* z21-style numbers band. */
const STATS = [
  { value: "1996", label: "Building in Malaysia since", note: "Butan Construction — piling, civil, and now solar EPCC" },
  { value: "Grade 7", label: "CIDB registration", note: "Qualified for projects of unlimited size" },
  { value: "1.9 MWp", label: "Delivered across featured projects", note: "Commercial & industrial rooftops" },
  { value: "999 kWp", label: "Largest single installation", note: "Eng Beng Manufacturing" },
  { value: "RM0.475", label: "Zero CapEx energy rate /kWh", note: "Below grid tariff, RM0 upfront" }
];

/* Contract-to-live journey (~3 months), from actual proposal timelines. */
const JOURNEY = [
  { step: "Week 0", title: "Survey & load study", text: "Site survey, rooftop structural review, and a load profile study of your TNB bills — so the system is sized to how you actually use power." },
  { step: "Weeks 1–2", title: "Design freeze", text: "Detailed system design, single line diagram, and construction timeline. You see the savings model before committing." },
  { step: "Weeks 3–8", title: "Procurement", text: "Tier-1 equipment ordered and delivered — LONGi panels, Huawei or Solis inverters, German cabling." },
  { step: "Weeks 8–14", title: "Installation", text: "Mounting, panels, inverters, and commissioning — staged around your operating hours." },
  { step: "Week 12–14", title: "TNB commissioning", text: "Inspection, testing, and handover. System live — savings start. Then 1–2 years complimentary O&M and a 2-year defect liability period." }
];

/* Three ways to pay — matches the sales pipeline's Financing options exactly. */
const FINANCING_MODELS = [
  {
    tag: "Outright purchase",
    title: "Own the asset, keep every ringgit saved",
    accent: false,
    points: [
      "Maximum lifetime savings — the full bill reduction is yours for 25+ years",
      "Typical payback ~3.5–4.6 years; GITA + Capital Allowance can recover up to ~38% of system cost through tax",
      "Milestone payments (typically 40 / 40 / 20) aligned to project progress",
      "Full warranties handed over, with complimentary O&M for 1–2 years"
    ],
    fit: "Best when capital is available and long-term ROI is the goal."
  },
  {
    tag: "Zero CapEx (SARE / PPA)",
    title: "RM0 upfront. Just buy cheaper energy.",
    accent: true,
    points: [
      "Butan invests, installs, owns, and maintains the system — we are a SEDA Registered Photovoltaic Investor",
      "You buy the solar energy from RM0.475/kWh — below your grid tariff — savings from month one",
      "Works even if you don't own the building: we arrange it with your landlord",
      "ESG-friendly: real Scope 2 emission reductions with zero capital allocation"
    ],
    fit: "Best when capital should stay in the business — or the building isn't yours."
  },
  {
    tag: "Bank loan",
    title: "Finance it, let the savings pay the instalments",
    accent: false,
    points: [
      "Green financing facilities available from Malaysian banks for solar assets",
      "Monthly savings typically offset a large share of the instalment",
      "You still own the system and claim GITA + Capital Allowance",
      "We support the application with the engineering and savings documentation banks ask for"
    ],
    fit: "Best when you want ownership without deploying capital today."
  }
];

/* Tax incentive story — worked example from a real (modeled) C&I proposal. */
const TAX = {
  headline: "The tax system pays for a third of your solar",
  points: [
    { title: "GITA — Green Investment Tax Allowance", text: "60% of qualifying capital expenditure as a tax allowance. We submit the MGTC application on project completion." },
    { title: "Capital Allowance", text: "Standard depreciation on the asset — Year 1 combines a 20% initial and 14% annual allowance." },
    { title: "Combined effect", text: "Up to ~38% of the system cost recovered through tax, typically cutting payback from ~4.6 to ~3.5 years." }
  ],
  example: {
    label: "Worked example — 383 kWp factory system (modeled estimate)",
    rows: [
      ["System investment", "RM 632,189 (SST included)"],
      ["Total tax benefit (GITA + CA)", "RM 242,760 — 38.4% of cost"],
      ["Year-1 bill savings", "RM 136,986"],
      ["Payback with incentives", "~3.5 years"]
    ]
  }
};

/*
 * Featured projects. System sizes are real; RM figures are MODELED estimates
 * until confirmed against signed-off bill data — set verified: true per project
 * once Bob confirms, and the "Modeled estimate" tag disappears.
 * photo: "" renders a branded placeholder. Set a real site-photo path when available.
 */
const PROJECTS = [
  { name: "Eng Beng Manufacturing", type: "Factory", location: "Malaysia", model: "Outright", size: "999 kWp",
    beforeBill: "RM286,000 / month", afterBill: "RM166,500 / month", projectCost: "RM3,980,000", payback: "2.8 – 3.4 years", verified: false, photo: "" },
  { name: "ePARK Residence", type: "2 Residential Blocks", location: "Malaysia", model: "Zero CapEx", size: "237.39 kWp",
    beforeBill: "RM68,900 / month", afterBill: "RM50,600 / month", projectCost: "RM0 upfront", payback: "Immediate OPEX savings", verified: false, photo: "" },
  { name: "IKON Connaught", type: "Mall + Office", location: "Kuala Lumpur", model: "Outright", size: "185.73 kWp",
    beforeBill: "RM54,500 / month", afterBill: "RM31,900 / month", projectCost: "RM770,000", payback: "2.8 – 3.4 years", verified: false, photo: "" },
  { name: "Integrated Formway", type: "Factory", location: "Malaysia", model: "Zero CapEx", size: "172.2 kWp",
    beforeBill: "RM49,300 / month", afterBill: "RM36,700 / month", projectCost: "RM0 upfront", payback: "Immediate OPEX savings", verified: false, photo: "" },
  { name: "Integrated Plastic Kogyo", type: "Factory", location: "Malaysia", model: "Zero CapEx", size: "92.25 kWp",
    beforeBill: "RM26,600 / month", afterBill: "RM19,400 / month", projectCost: "RM0 upfront", payback: "Immediate OPEX savings", verified: false, photo: "" },
  { name: "Carlo Rino Warehouse", type: "Warehouse", location: "Selangor", model: "Outright", size: "83.025 kWp",
    beforeBill: "RM24,200 / month", afterBill: "RM14,300 / month", projectCost: "RM337,000", payback: "2.9 – 3.6 years", verified: false, photo: "" },
  { name: "BONIA Warehouse", type: "Industrial Warehouse", location: "Selangor", model: "Outright", size: "75 kWp",
    beforeBill: "RM21,700 / month", afterBill: "RM12,900 / month", projectCost: "RM300,000", payback: "2.9 – 3.5 years", verified: false, photo: "" },
  { name: "Dasher Office", type: "Office + Cafe", location: "Kuala Lumpur", model: "Outright", size: "52.5 kWp",
    beforeBill: "RM15,600 / month", afterBill: "RM9,100 / month", projectCost: "RM214,000", payback: "2.8 – 3.5 years", verified: false, photo: "" }
];

const CLIENTS = [
  { name: "IKON Connaught", sector: "Mall + Office" },
  { name: "BONIA Warehouse", sector: "Industrial Warehouse" },
  { name: "Carlo Rino Warehouse", sector: "Warehouse" },
  { name: "Dasher Office", sector: "Office + Cafe" },
  { name: "DSS BHD Nilai", sector: "Warehouse" },
  { name: "DSS BHD Puchong", sector: "Warehouse" },
  { name: "Micro CTRL", sector: "Industrial + Office" },
  { name: "Eng Beng Manufacturing", sector: "Factory" },
  { name: "ePARK Residence", sector: "Residential Blocks" },
  { name: "Integrated Formway", sector: "Factory" },
  { name: "Integrated Plastic Kogyo", sector: "Factory" },
  { name: "JYC Battery A", sector: "Industrial" },
  { name: "JYC Battery B", sector: "Industrial" },
  { name: "VES Industrial", sector: "Industrial" },
  { name: "Biotek Abadi", sector: "Industrial" },
  { name: "Wheelcorp Premium", sector: "Commercial" }
];

/* Equipment & warranty stack — from actual proposal decks and the Sales FAQ. */
const EQUIPMENT = [
  { item: "Solar panels", spec: "LONGi Hi-MO 7, 615W — N-type TOPCon, Tier-1", warranty: "25-yr performance · 12-yr product" },
  { item: "Inverters", spec: "Huawei (premium, FusionSolar) or Solis (value, Solis Cloud) — both with built-in AFCI fire safety", warranty: "10 years" },
  { item: "DC cables", spec: "JJ-Lapp (Germany) / Helukabel — halogen-free, flame-retardant, UV-resistant", warranty: "Per manufacturer" },
  { item: "Connectors", spec: "Genuine Stäubli MC4, IP68 — no generic cross-mating", warranty: "Per manufacturer" },
  { item: "Mounting structure", spec: "Designed & fabricated by Butan Solar", warranty: "15 years" },
  { item: "Workmanship", spec: "Defect Liability Period from commissioning", warranty: "2 years" },
  { item: "O&M", spec: "Annual preventive maintenance, cleaning, thermal imaging, remote monitoring + monthly reports", warranty: "1–2 years complimentary" },
  { item: "Insurance", spec: "All-risk cover: comprehensive liability + workers' compensation during installation", warranty: "1 year" }
];

const SAFETY_NOTE = "Every install includes AFCI arc-fault fire protection, surge protection, and earth-fault relays as standard. Optional: Fonrich rapid shutdown (BOMBA-recommended, module-level 1V shutdown) and rooftop safety lifeline systems.";

/* Residential path — Solar ATAP. */
const RESIDENTIAL = {
  headline: "Solar for your home — under Solar ATAP",
  intro: "The same Tier-1 equipment and CIDB Grade 7 engineering, sized for your house. Solar ATAP replaced NEM 3.0 in January 2026: no quota limits, 10-year tenure, open to every TNB customer.",
  points: [
    { title: "System limits", text: "Up to 5 kWac on single-phase or 15 kWac on three-phase supply — we size to your roof and usage." },
    { title: "Timeline", text: "Roughly 2–3 months from signing to switch-on, including TNB approval. We handle all SEDA and TNB paperwork." },
    { title: "How you save", text: "Self-consumed solar avoids the full retail tariff — the best savings. Exports offset at the energy rate, with no credit rollover, so we size for self-consumption first." },
    { title: "Note on the TNB account", text: "The TNB account must be in the applicant's name — if it isn't, we'll guide you through changing it first for a smooth application." }
  ]
};

/*
 * EMPTY on purpose. Never publish quotes that clients have not approved.
 * Add only approved quotes: { quote, name, role, approvedOn }
 * then set CONFIG.showTestimonials = true.
 */
const TESTIMONIALS = [];

/* Real answers from the internal Sales FAQ. */
const FAQ = [
  {
    q: "Your website looks new. Are you legit?",
    a: "Fair question. Butan Construction Sdn Bhd has been operating since 1996 and is CIDB Grade 7 certified. We are a SEDA Registered PV Service Provider — you can verify us in the public SEDA directory (search \"Butan Construction Sdn Bhd\")."
  },
  {
    q: "Is my roof suitable for solar?",
    a: "Most C&I metal-deck roofs and residential roofs are. We confirm structural loading, orientation, and shading during a free site survey before any commitment — and if reinforcement is needed, it's assessed transparently and separately."
  },
  {
    q: "How long until my system is live?",
    a: "Residential: about 2–3 months from signing. Commercial: about 3–4 months — survey and design first, then 4–6 weeks procurement and 4–6 weeks installation, ending with TNB commissioning."
  },
  {
    q: "How does Zero CapEx actually work?",
    a: "We fund, build, own, and maintain the system on your roof — we're a SEDA Registered Photovoltaic Investor, which is the licence this model requires. You sign a power purchase agreement and buy the solar energy from RM0.475/kWh, below your grid tariff, so savings start from month one with RM0 invested."
  },
  {
    q: "Who maintains the system? What can I see?",
    a: "We include 1–2 years complimentary O&M: annual preventive maintenance, panel cleaning, thermal imaging, plus 24/7 remote monitoring through Huawei FusionSolar or Solis Cloud — live generation, savings trends, and automatic fault alerts on your phone."
  },
  {
    q: "Is the deposit refundable?",
    a: "The deposit is non-refundable in general — but if your ATAP or SelCo application is not approved, we refund it in full."
  },
  {
    q: "Can I expand the system later?",
    a: "Yes. We design with expansion headroom where the roof allows, and inverter platforms like Huawei SmartLogger take additional capacity with minimal disruption."
  },
  {
    q: "Are there tax benefits?",
    a: "Commercial clients can claim GITA (60% of qualifying capex) plus Capital Allowance — combined, up to roughly 38% of the system cost comes back through tax, typically pulling payback under 4 years. We prepare the MGTC submission on completion."
  }
];

/*
 * Estimator — Butan's own conservative rule of thumb (from the Sales FAQ):
 * Daily kWh = kWp × 4 peak sun hours × 82.5% system efficiency.
 * A 615W panel produces ~60.9 kWh/month. Assumed blended tariff for the
 * bill-to-size mapping: ~RM0.50/kWh (C&I LV range). Always labeled modeled.
 */
const BILL_BANDS = {
  "Below RM10,000": { system: "35 – 70 kWp", savings: "RM2.5k – RM6k / month" },
  "RM10,000 - RM25,000": { system: "70 – 165 kWp", savings: "RM6k – RM13k / month" },
  "RM25,000 - RM50,000": { system: "165 – 330 kWp", savings: "RM13k – RM26k / month" },
  "RM50,000 - RM100,000": { system: "330 – 660 kWp", savings: "RM26k – RM52k / month" },
  "Above RM100,000": { system: "660 kWp – 1.5 MWp", savings: "RM52k – RM120k+ / month" },
  "Home (below RM1,000)": { system: "4 – 15 kWac (ATAP)", savings: "RM150 – RM700 / month" }
};
