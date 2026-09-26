/* All site content lives here. Edit this file — never index.html — for copy/data changes. */

const CONFIG = {
  siteUrl: "https://butansolar.com",
  brandName: "Butan Solar",
  legalLine1: "Butan Construction Sdn Bhd — trading as Butan Solar. Established 1996 · CIDB Grade 7.",
  legalLine2: "Butan Solar Sdn Bhd — SSM 202501046131 (1647539-M).",
  phoneDisplay: "+60 11-1668 8339",
  phoneTel: "+601116688339",
  whatsappNumber: "601116688339",
  teamEmail: "butansolar@gmail.com",
  leadEndpoint: "/api/lead",
  contentEndpoint: "/api/content",
  /* Email notifications go browser → FormSubmit (datacenter IPs are blocked,
     so this cannot live in the serverless function). Needs one-time activation. */
  notifyEmailEndpoint: "https://formsubmit.co/ajax/chongyao1@gmail.com",
  notifyCc: "butansolar@gmail.com",
  campaignCode: "2bob2butan",
  zeroCapexRate: "RM0.475/kWh",
  sedaDirectoryUrl: "https://www.seda.gov.my/directory/registered-pv-service-provider-directory/",
  showTestimonials: false
};

const CREDENTIALS = [
  { label: "Building since", value: "1996" },
  { label: "CIDB registration", value: "Grade 7" },
  { label: "SEDA", value: "Registered" },
  { label: "Suruhanjaya Tenaga", value: "Class A" }
];

/* The three numbers every buyer actually wants. Butan's rules of thumb. */
const RULES = [
  {
    value: "18×",
    title: "your monthly bill",
    text: "What a right-sized solar system should cost a low-voltage client. RM10,000 a month? Expect around RM180,000. If a quote is far above that, ask why."
  },
  {
    value: "RM1",
    title: "per panel, per day",
    text: "One panel offsets roughly RM1 of electricity a day in Malaysian sun. 100 panels, about RM3,000 a month — before tariff hikes."
  },
  {
    value: "RM1.1k",
    title: "per panel, installed",
    text: "Tier-1 panel, structure, cabling, inverter share and commissioning. Payback lands around 3 to 4 years, faster with tax allowances."
  }
];

/* The angle nobody else leads with. */
const SAFETY = {
  eyebrow: "What nobody tells you",
  headline: "Everyone sells the savings. Nobody talks about the fire.",
  intro: "Solar is DC power, and DC is more dangerous than the AC in your walls. AC crosses zero 100 times a second, so an arc snuffs itself out. DC never does — an arc keeps burning until something melts.",
  points: [
    {
      title: "The fire starts at the connector",
      text: "MC4 connectors and DC cables carry the whole array's current. Substandard parts — the kind sold cheaply on e-commerce sites — have too little conductor contact area. Contact resistance becomes heat, heat becomes an arc, an arc becomes a roof fire. We use genuine Stäubli MC4 and German JJ-Lapp or Helukabel cable, and nothing else."
    },
    {
      title: "Bomba won't spray a live array",
      text: "Panels keep generating the moment daylight hits them. Firefighters cannot safely put water on a live DC system, so a rooftop solar fire often has to burn. This is the risk a cheap quote hides."
    },
    {
      title: "Rapid shutdown makes it safe",
      sun: true,
      text: "A rapid shutdown device drops every panel to about 1 volt the instant power is cut — so the roof is safe to touch and safe to fight. Recommended by BOMBA. We specify Fonrich RSD on every design and tell you plainly what it costs."
    },
    {
      title: "Arc-fault protection, as standard",
      text: "Every inverter we install has AFCI built in: it detects a DC arc in milliseconds and shuts the string down before it becomes a flame. Surge and earth-fault protection are in every switchboard."
    }
  ]
};

const FINANCING_MODELS = [
  {
    tag: "Outright",
    title: "Own it. Keep every ringgit saved.",
    text: "Payback in about 3–4 years. GITA and Capital Allowance can return up to ~38% of the cost through tax. Milestone payments 40 / 40 / 20.",
    accent: false
  },
  {
    tag: "Zero CapEx",
    title: "RM0 upfront. Buy cheaper power.",
    text: "We fund, own and maintain the system. You buy green energy, below TNB tariff, from month one.",
    accent: true
  },
  {
    tag: "Bank loan",
    title: "Let the savings pay the instalment.",
    text: "Green financing from Malaysian banks. You still own the asset and claim the tax allowances. We prepare the engineering pack the bank asks for.",
    accent: false
  }
];

/* Fallback gallery data; Notion "Website Content" rows (Drone shot column) override this when live. */
const PROJECTS = [
  { name: "Eng Beng Manufacturing", caption: "Factory", model: "Outright", photo: "./assets/projects/eng-beng.jpg" },
  { name: "IKON Connaught", caption: "Mall + office, Kuala Lumpur", model: "Outright", photo: "./assets/projects/ikon-connaught.jpg" },
  { name: "Bodibasixs", caption: "Factory", model: "Outright", photo: "./assets/projects/bodibasixs.jpg" },
  { name: "Petron", caption: "Petrol station canopy", model: "", photo: "./assets/projects/petron.jpg" },
  { name: "JYC Battery", caption: "Factory", model: "", photo: "./assets/projects/jyc-battery.jpg" }
];

/* Fallback for the trusted-by marquee; Notion "Website Content" rows override this when live.
   To use a local logo file instead, drop it in assets/logos/ and set logo: "./assets/logos/<file>". */
const CLIENTS = [
  "IKON Connaught", "BONIA", "Carlo Rino", "Dasher", "DSS BHD", "Micro CTRL",
  "Eng Beng Manufacturing", "ePARK Residence", "Integrated Formway",
  "Integrated Plastic Kogyo", "JYC Battery", "VES Industrial", "Biotek Abadi", "Wheelcorp Premium"
].map((name) => ({ name, logo: name === "Dasher" ? "./assets/logos/dasher.png" : "" })).filter((c) => c.logo);

const PROCESS = [
  { title: "Load study", text: "We read 12 months of TNB bills and size to your real daytime load — not to your roof." },
  { title: "Design freeze", text: "Single line diagram, connector and cable spec, RSD, savings model. You see it all before signing." },
  { title: "Build", text: "Our own CIDB Grade 7 crews. Tier-1 LONGi panels, Huawei or Solis inverters. 8–12 weeks." },
  { title: "Commission & keep", text: "TNB sign-off, then 1–2 years free maintenance and a 2-year defect liability period." }
];

/* Answer-first. These are what people ask Google and ChatGPT. */
const FAQ = [
  {
    q: "How much does a commercial solar system cost in Malaysia?",
    a: "Roughly 18 times your monthly electricity bill for a right-sized low-voltage system, or about RM1,100 per panel installed. A business paying RM10,000 a month should expect an investment around RM180,000, with payback in 3 to 4 years."
  },
  {
    q: "Is rooftop solar a fire risk?",
    a: "It can be, if the DC side is built with substandard connectors or cables. DC arcs don't self-extinguish and firefighters cannot spray a live array. The fix is genuine MC4 connectors, certified DC cable, arc-fault detection in the inverter, and a rapid shutdown device."
  },
  {
    q: "What is a rapid shutdown device?",
    a: "A device that reduces every solar panel's output to about 1 volt when power is cut, so the roof is safe for firefighters and maintenance staff. It is recommended by BOMBA for rooftop solar in Malaysia."
  },
  {
    q: "What is Solar ATAP?",
    a: "Malaysia's current rooftop solar programme, which replaced NEM 3.0 in January 2026. There is no quota, contracts run 10 years, and every TNB customer is eligible. Homes are limited to 5 kWac single-phase or 15 kWac three-phase; businesses to their 12-month average maximum demand."
  },
  {
    q: "How does Zero CapEx solar work?",
    a: "Butan Solar funds, owns and maintains the system on your roof under a power purchase agreement. You buy the solar electricity from RM0.475/kWh, below the grid tariff, with no upfront payment. It works even if you rent the building."
  },
  {
    q: "Is Butan Solar a legitimate company?",
    a: "Yes. Butan Construction Sdn Bhd has operated since 1996, is CIDB Grade 7 certified, an ST Class A electrical contractor, and a SEDA Registered PV Service Provider and Registered Photovoltaic Investor. You can verify us in the public SEDA directory."
  }
];

/* Estimator: derived from the three rules above so the site never contradicts itself. */
const BILL_BANDS = {
  "Home (below RM1,000)": { midpoint: 500, residential: true },
  "Below RM10,000": { midpoint: 6000 },
  "RM10,000 - RM25,000": { midpoint: 17500 },
  "RM25,000 - RM50,000": { midpoint: 37500 },
  "RM50,000 - RM100,000": { midpoint: 75000 },
  "Above RM100,000": { midpoint: 150000 }
};

const TESTIMONIALS = [];
