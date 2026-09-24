/* Rendering + lead flow. All content comes from data.js — edit there, not here. */

const ul = (id) => document.getElementById(id);

function renderCredentials() {
  const row = ul("credential-row");
  if (row) row.innerHTML = CREDENTIALS.map((c) => `<li>${c}</li>`).join("");
}

function renderRules() {
  const grid = ul("rules-grid");
  if (!grid) return;
  grid.innerHTML = RULES.map((r) => `
    <div class="rule">
      <p class="rule-value">${r.value}</p>
      <p class="rule-title">${r.title}</p>
      <p class="rule-text">${r.text}</p>
    </div>
  `).join("");
}

function renderSafety() {
  ul("safety-eyebrow").textContent = SAFETY.eyebrow;
  ul("safety-h").textContent = SAFETY.headline;
  ul("safety-intro").textContent = SAFETY.intro;
  ul("safety-grid").innerHTML = SAFETY.points.map((p) => `
    <article class="safety-card">
      <h3>${p.title}</h3>
      <p>${p.text}</p>
    </article>
  `).join("");
}

function renderFinancing() {
  ul("model-grid").innerHTML = FINANCING_MODELS.map((m) => `
    <article class="model-card${m.accent ? " accent" : ""}">
      <p class="model-tag">${m.tag}</p>
      <h3>${m.title}</h3>
      <p>${m.text}</p>
    </article>
  `).join("");
}

function renderWork() {
  ul("process").innerHTML = PROCESS.map((s) => `
    <li><div><h3>${s.title}</h3><p>${s.text}</p></div></li>
  `).join("");
  ul("project-list").innerHTML = PROJECTS.map((p) => `
    <li>
      <span class="project-name">${p.name}</span>
      <span class="project-size">${p.size}</span>
      <span class="project-type">${p.type}</span>
      <span class="project-model">${p.model}</span>
    </li>
  `).join("");
  ul("more-clients").textContent = "Also: " + MORE_CLIENTS.join(" · ") + ".";
}

function renderFaq() {
  ul("faq-list").innerHTML = FAQ.map((item) => `
    <details class="faq-item">
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>
  `).join("");
}

function renderFooter() {
  ul("footer-legal-1").textContent = CONFIG.legalLine1;
  ul("footer-legal-2").textContent = CONFIG.legalLine2;
  ul("seda-link").href = CONFIG.sedaDirectoryUrl;
}

/* ---------- Estimator (derived from the three rules of thumb) ---------- */

const RM = (n) => "RM" + Math.round(n).toLocaleString("en-MY");

function estimateFor(billRange) {
  const band = BILL_BANDS[billRange];
  if (!band) return null;
  const investment = band.midpoint * 18;          // 18× monthly bill
  const panels = Math.round(investment / 1100);   // ~RM1.1k per panel
  const savingsMonth = panels * 30;               // ~RM1 per panel per day
  return { investment, panels, savingsMonth, residential: !!band.residential };
}

function fillBillRangeOptions() {
  const select = ul("bill-range");
  Object.keys(BILL_BANDS).forEach((range) => {
    const o = document.createElement("option");
    o.value = range; o.textContent = range;
    select.appendChild(o);
  });
}

function updateEstimate(billRange) {
  const e = estimateFor(billRange);
  const box = ul("estimate-display");
  if (!e) return;
  box.innerHTML = e.residential
    ? `<p class="estimate-label">Home solar under ATAP</p>
       <p class="estimate-big">${e.panels} panels · ${RM(e.investment)}</p>
       <p>About ${RM(e.savingsMonth)} a month off your bill.</p>
       <p class="note">First estimate from our rules of thumb. Homes are capped at 5 kWac single-phase / 15 kWac three-phase.</p>`
    : `<p class="estimate-label">First estimate for ${billRange}</p>
       <p class="estimate-big">${RM(e.investment)} · ~${e.panels} panels</p>
       <p>About ${RM(e.savingsMonth)} a month off your bill. Payback 3–4 years.</p>
       <p class="note">18× your bill, ~RM1.1k a panel, ~RM1 a panel a day. Engineered figure after a free load study.</p>`;
}

function bindEstimator() {
  const sel = ul("bill-range");
  sel.addEventListener("change", () => updateEstimate(sel.value));
}

/* ---------- Lead flow ---------- */

function formatWhatsappMessage(p, e) {
  return [
    "Hello Butan Solar,",
    "",
    `I'd like a ${p.clientType === "Residential" ? "home solar (ATAP)" : "commercial solar"} proposal.`,
    `Name/Company: ${p.companyName}`,
    `Monthly bill: ${p.billRange}`,
    e ? `Site estimate: ~${e.panels} panels, ${RM(e.investment)}` : "",
    p.financing ? `Preferred financing: ${p.financing}` : "Financing: please advise",
    p.phone ? `Phone: ${p.phone}` : "",
    `Campaign code: ${CONFIG.campaignCode}`,
    "",
    "Please contact me for a load study."
  ].filter(Boolean).join("\n");
}

async function sendLead(payload) {
  try {
    const r = await fetch(CONFIG.leadEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return r.ok;
  } catch { return false; }
}

async function sendNotifyEmail(p) {
  try {
    const r = await fetch(CONFIG.notifyEmailEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `🌞 New website lead — ${p.companyName}`,
        _template: "table",
        _cc: CONFIG.notifyCc,
        "Name / Company": p.companyName,
        "Client Type": p.clientType || "—",
        "Monthly Bill Range": p.billRange || "—",
        "Financing Preference": p.financing || "Not sure",
        Phone: p.phone || "—",
        Source: "butanwebsite lead form"
      })
    });
    const body = await r.json().catch(() => ({}));
    return r.ok && String(body.success) !== "false";
  } catch { return false; }
}

function bindLeadForm() {
  const form = ul("solar-lead-form");
  const status = ul("form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      companyName: form.companyName.value.trim(),
      clientType: form.clientType.value,
      billRange: form.billRange.value,
      financing: form.financing.value,
      phone: form.phone.value.trim(),
      website: form.website.value
    };
    if (!payload.companyName || !payload.billRange) {
      status.textContent = "Please add your name/company and pick a bill range.";
      return;
    }
    const e = estimateFor(payload.billRange);
    const wa = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(formatWhatsappMessage(payload, e))}`;
    status.textContent = "Opening WhatsApp…";
    /* Open before any await so mobile popup blockers allow it. */
    window.open(wa, "_blank", "noopener,noreferrer");
    const [pipelined, emailed] = await Promise.all([sendLead(payload), sendNotifyEmail(payload)]);
    status.textContent = (pipelined || emailed)
      ? "WhatsApp opened — your request is logged with our team."
      : "WhatsApp opened — send the message there and we'll reply fast.";
    form.reset();
  });
}

renderCredentials();
renderRules();
renderSafety();
renderFinancing();
renderWork();
renderFaq();
renderFooter();
fillBillRangeOptions();
bindEstimator();
bindLeadForm();
