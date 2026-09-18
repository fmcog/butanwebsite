/* All site content lives here. Edit this file — never index.html — for copy/data changes. */

const CONFIG = {
  companyName: "Butan Solar Sdn Bhd",
  ssm: "202501046131 (1647539-M)",
  phoneDisplay: "+60 11-1668 8339",
  phoneTel: "+601116688339",
  whatsappNumber: "601116688339",
  teamEmail: "butansolar@gmail.com",
  // FormSubmit needs one-time activation: the first submission emails a
  // confirmation link to teamEmail. Until it is clicked, emails silently drop.
  emailEndpoint: "https://formsubmit.co/ajax/butansolar@gmail.com",
  campaignCode: "2bob2butan",
  campaignOffer: "2% discount",
  zeroCapexRate: "RM0.475/kWh",
  // Testimonials stay hidden until TESTIMONIALS holds real, approved quotes.
  showTestimonials: false
};

/* Monthly TNB bill band → modeled outcome. Shown with a "modeled estimate" label. */
const BILL_BANDS = {
  "Below RM10,000": {
    system: "35 – 70 kWp",
    savings: "RM2.5k – RM6k / month",
    annual: "RM30k – RM72k / year"
  },
  "RM10,000 - RM25,000": {
    system: "70 – 160 kWp",
    savings: "RM6k – RM12k / month",
    annual: "RM72k – RM144k / year"
  },
  "RM25,000 - RM50,000": {
    system: "180 – 320 kWp",
    savings: "RM10k – RM22k / month",
    annual: "RM120k – RM264k / year"
  },
  "RM50,000 - RM100,000": {
    system: "320 – 700 kWp",
    savings: "RM22k – RM46k / month",
    annual: "RM264k – RM552k / year"
  },
  "Above RM100,000": {
    system: "700 kWp – 1.5 MWp",
    savings: "RM46k – RM100k+ / month",
    annual: "RM552k – RM1.2m+ / year"
  }
};

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

/*
 * Featured projects. System sizes are real; RM figures are MODELED estimates
 * until confirmed against signed-off bill data — set verified: true per project
 * once Bob confirms, and the "Modeled estimate" tag disappears.
 * photo: "" renders a branded placeholder. Set a real site-photo path when available.
 */
const PROJECTS = [
  {
    name: "IKON Connaught",
    type: "Mall + Office",
    location: "Kuala Lumpur",
    model: "Outright",
    size: "185.73 kWp",
    beforeBill: "RM54,500 / month",
    afterBill: "RM31,900 / month",
    projectCost: "RM770,000",
    payback: "2.8 – 3.4 years",
    verified: false,
    photo: ""
  },
  {
    name: "BONIA Warehouse",
    type: "Industrial Warehouse",
    location: "Selangor",
    model: "Outright",
    size: "75 kWp",
    beforeBill: "RM21,700 / month",
    afterBill: "RM12,900 / month",
    projectCost: "RM300,000",
    payback: "2.9 – 3.5 years",
    verified: false,
    photo: ""
  },
  {
    name: "Carlo Rino Warehouse",
    type: "Warehouse",
    location: "Selangor",
    model: "Outright",
    size: "83.025 kWp",
    beforeBill: "RM24,200 / month",
    afterBill: "RM14,300 / month",
    projectCost: "RM337,000",
    payback: "2.9 – 3.6 years",
    verified: false,
    photo: ""
  },
  {
    name: "Dasher Office",
    type: "Office + Cafe",
    location: "Kuala Lumpur",
    model: "Outright",
    size: "52.5 kWp",
    beforeBill: "RM15,600 / month",
    afterBill: "RM9,100 / month",
    projectCost: "RM214,000",
    payback: "2.8 – 3.5 years",
    verified: false,
    photo: ""
  },
  {
    name: "Eng Beng Manufacturing",
    type: "Factory",
    location: "Malaysia",
    model: "Outright",
    size: "999 kWp",
    beforeBill: "RM286,000 / month",
    afterBill: "RM166,500 / month",
    projectCost: "RM3,980,000",
    payback: "2.8 – 3.4 years",
    verified: false,
    photo: ""
  },
  {
    name: "ePARK Residence",
    type: "2 Residential Blocks",
    location: "Malaysia",
    model: "Zero CapEx",
    size: "237.39 kWp",
    beforeBill: "RM68,900 / month",
    afterBill: "RM50,600 / month",
    projectCost: "RM0 upfront",
    payback: "Immediate OPEX savings",
    verified: false,
    photo: ""
  },
  {
    name: "Integrated Formway",
    type: "Factory",
    location: "Malaysia",
    model: "Zero CapEx",
    size: "172.2 kWp",
    beforeBill: "RM49,300 / month",
    afterBill: "RM36,700 / month",
    projectCost: "RM0 upfront",
    payback: "Immediate OPEX savings",
    verified: false,
    photo: ""
  },
  {
    name: "Integrated Plastic Kogyo",
    type: "Factory",
    location: "Malaysia",
    model: "Zero CapEx",
    size: "92.25 kWp",
    beforeBill: "RM26,600 / month",
    afterBill: "RM19,400 / month",
    projectCost: "RM0 upfront",
    payback: "Immediate OPEX savings",
    verified: false,
    photo: ""
  }
];

/*
 * EMPTY on purpose. The v1 draft shipped invented quotes attributed to real
 * clients — never do that. Add only approved quotes, e.g.:
 * { quote: "…", name: "Person or role", role: "Company", approvedOn: "2026-09-18" }
 * Then set CONFIG.showTestimonials = true.
 */
const TESTIMONIALS = [];

const FAQ = [
  {
    q: "Is my roof suitable for solar?",
    a: "Most C&I metal-deck and flat concrete roofs are. We confirm structural loading, orientation, and shading during a free site assessment before any commitment."
  },
  {
    q: "Will installation disrupt my operations?",
    a: "Roof works are staged around your operating hours, and the grid tie-in is scheduled with you in advance. Downtime is typically limited to a short planned shutdown at commissioning."
  },
  {
    q: "How does Zero CapEx actually work?",
    a: "We fund, build, own, and maintain the system on your roof. You simply buy the solar energy it produces from " + CONFIG.zeroCapexRate + " — below your grid tariff — so savings start from month one with RM0 invested."
  },
  {
    q: "Who maintains the system after handover?",
    a: "Under Zero CapEx, we do — it's our asset. For outright purchases, we hand over with warranties and offer an operations & maintenance package covering monitoring, cleaning, and inverter care."
  }
];
