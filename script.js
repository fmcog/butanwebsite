/* Rendering + lead flow. All content comes from data.js — edit there, not here. */

function renderCredentials() {
  const row = document.getElementById("credential-row");
  if (!row) return;
  row.innerHTML = CREDENTIALS.map((c) => `<li>${c}</li>`).join("");
}

function renderStats() {
  const grid = document.getElementById("stats-grid");
  if (!grid) return;
  grid.innerHTML = STATS.map((s) => `
    <div class="stat reveal">
      <h3><span class="stat-accent">${s.value}</span></h3>
      <p class="stat-label">${s.label}</p>
      <p class="stat-note">${s.note}</p>
    </div>
  `).join("");
}

function renderJourney() {
  const list = document.getElementById("journey");
  if (!list) return;
  list.innerHTML = JOURNEY.map((j) => `
    <li class="reveal">
      <div class="journey-inner">
        <p class="journey-step">${j.step}</p>
        <h3>${j.title}</h3>
        <p>${j.text}</p>
      </div>
    </li>
  `).join("");
}

function renderFinancing() {
  const grid = document.getElementById("model-grid");
  if (!grid) return;
  grid.innerHTML = FINANCING_MODELS.map((m) => `
    <article class="model-card${m.accent ? " model-card-accent" : ""} reveal">
      <p class="model-tag">${m.tag}</p>
      <h3>${m.title}</h3>
      <ul class="model-list">${m.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      <p class="model-fit">${m.fit}</p>
    </article>
  `).join("");
}

function renderTax() {
  const headline = document.getElementById("tax-headline");
  const points = document.getElementById("tax-points");
  const example = document.getElementById("tax-example");
  if (!headline || !points || !example) return;

  headline.textContent = TAX.headline;
  points.innerHTML = TAX.points.map((p) => `
    <div class="tax-point">
      <h3>${p.title}</h3>
      <p>${p.text}</p>
    </div>
  `).join("");
  example.innerHTML = `
    <p class="tax-example-label">${TAX.example.label}</p>
    <dl>
      ${TAX.example.rows.map(([k, v]) => `
        <div class="tax-row"><dt>${k}</dt><dd>${v}</dd></div>
      `).join("")}
    </dl>
  `;
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => `
    <article class="project-card reveal">
      <div class="project-visual${p.photo ? " has-photo" : ""}"${p.photo ? ` style="background-image:url('${p.photo}')"` : ""}>
        <span class="project-size">${p.size}</span>
        <span class="project-tags">
          <span class="project-tag">${p.model}</span>
          ${p.verified ? "" : `<span class="project-tag modeled">Modeled estimate</span>`}
        </span>
      </div>
      <div class="project-body">
        <h3>${p.name}</h3>
        <p class="project-meta">${p.type} · ${p.location}</p>
        <div class="metric-grid">
          <div class="metric"><small>Before bill</small><strong>${p.beforeBill}</strong></div>
          <div class="metric"><small>After bill</small><strong>${p.afterBill}</strong></div>
          <div class="metric"><small>Project cost</small><strong>${p.projectCost}</strong></div>
          <div class="metric"><small>Payback</small><strong>${p.payback}</strong></div>
        </div>
      </div>
    </article>
  `).join("");
}

function renderClients() {
  const topTrack = document.getElementById("client-track-top");
  const bottomTrack = document.getElementById("client-track-bottom");
  if (!topTrack || !bottomTrack) return;

  const toChip = (c) => `
    <article class="client-chip">
      ${c.name}
      <span>${c.sector}</span>
    </article>
  `;

  const half = Math.floor(CLIENTS.length / 2);
  const shifted = CLIENTS.slice(half).concat(CLIENTS.slice(0, half));
  /* Tracks are duplicated so the -50% translate loops seamlessly. */
  topTrack.innerHTML = CLIENTS.concat(CLIENTS).map(toChip).join("");
  bottomTrack.innerHTML = shifted.concat(shifted).map(toChip).join("");
}

function renderEquipment() {
  const table = document.getElementById("equipment-table");
  const note = document.getElementById("safety-note");
  if (!table) return;
  table.querySelector("tbody").innerHTML = EQUIPMENT.map((e) => `
    <tr><td>${e.item}</td><td>${e.spec}</td><td>${e.warranty}</td></tr>
  `).join("");
  if (note) note.textContent = SAFETY_NOTE;
}

function renderResidential() {
  const headline = document.getElementById("resi-headline");
  const intro = document.getElementById("resi-intro");
  const points = document.getElementById("resi-points");
  if (!headline || !intro || !points) return;
  headline.textContent = RESIDENTIAL.headline;
  intro.textContent = RESIDENTIAL.intro;
  points.innerHTML = RESIDENTIAL.points.map((p) => `
    <div class="resi-point reveal">
      <h3>${p.title}</h3>
      <p>${p.text}</p>
    </div>
  `).join("");
}

function renderTestimonials() {
  const section = document.getElementById("testimonials");
  const grid = document.getElementById("testimonial-grid");
  if (!section || !grid) return;

  if (!CONFIG.showTestimonials || TESTIMONIALS.length === 0) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  grid.innerHTML = TESTIMONIALS.map((t) => `
    <article class="testimonial-card reveal">
      <p class="testimonial-quote">“${t.quote}”</p>
      <div class="testimonial-meta">
        <p class="testimonial-name">${t.name}</p>
        <p class="testimonial-role">${t.role}</p>
      </div>
    </article>
  `).join("");
}

function renderFaq() {
  const grid = document.getElementById("faq-grid");
  if (!grid) return;
  grid.innerHTML = FAQ.map((item) => `
    <details class="faq-item">
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>
  `).join("");
}

function renderFooter() {
  const l1 = document.getElementById("footer-legal-1");
  const l2 = document.getElementById("footer-legal-2");
  const seda = document.getElementById("seda-link");
  if (l1) l1.textContent = CONFIG.legalLine1;
  if (l2) l2.textContent = CONFIG.legalLine2;
  if (seda) seda.href = CONFIG.sedaDirectoryUrl;
}

/* ---------- Estimator + lead flow ---------- */

function fillBillRangeOptions() {
  const select = document.getElementById("bill-range");
  if (!select) return;
  Object.keys(BILL_BANDS).forEach((range) => {
    const option = document.createElement("option");
    option.value = range;
    option.textContent = range;
    select.appendChild(option);
  });
}

function getEstimate(billRange) {
  return BILL_BANDS[billRange] || null;
}

function updateEstimateDisplay(billRange) {
  const display = document.getElementById("estimate-display");
  const estimate = getEstimate(billRange);
  if (!display || !estimate) return;
  display.innerHTML = `
    <p class="estimate-label">Typical outcome for ${billRange}</p>
    <h4>${estimate.system} system</h4>
    <p>Savings around ${estimate.savings}</p>
    <p class="estimate-note">Modeled estimate (kWp × 4 sun-hours × 82.5% efficiency) — confirmed after a free site survey and load study.</p>
  `;
}

function bindEstimatorPreview() {
  const billRangeEl = document.getElementById("bill-range");
  if (!billRangeEl) return;
  billRangeEl.addEventListener("change", () => updateEstimateDisplay(billRangeEl.value));
}

/* Residential CTA presets the client-type selector. */
function bindClientTypePresets() {
  document.querySelectorAll("[data-preset-client]").forEach((el) => {
    el.addEventListener("click", () => {
      const select = document.getElementById("client-type");
      if (select) select.value = el.getAttribute("data-preset-client");
    });
  });
}

function formatWhatsappMessage(payload, estimate) {
  return [
    "Hello Butan Solar,",
    "",
    `I would like a ${payload.clientType === "Residential" ? "home solar (ATAP)" : "commercial/industrial solar"} proposal.`,
    `Name/Company: ${payload.companyName}`,
    `Monthly bill range: ${payload.billRange}`,
    estimate ? `Estimated system size: ${estimate.system}` : "",
    payload.financing ? `Preferred financing: ${payload.financing}` : "Financing: please advise",
    payload.phone ? `Phone: ${payload.phone}` : "",
    `Campaign code: ${CONFIG.campaignCode}`,
    "",
    "Please contact me for a site survey and detailed savings model."
  ].filter(Boolean).join("\n");
}

async function sendLead(payload) {
  try {
    const response = await fetch(CONFIG.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch {
    return false;
  }
}

function bindLeadForm() {
  const form = document.getElementById("solar-lead-form");
  const statusEl = document.getElementById("form-status");
  if (!form || !statusEl) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      companyName: form.companyName.value.trim(),
      clientType: form.clientType.value,
      billRange: form.billRange.value,
      financing: form.financing.value,
      phone: form.phone.value.trim(),
      website: form.website.value // honeypot — humans leave it empty
    };

    if (!payload.companyName || !payload.billRange) {
      statusEl.textContent = "Please fill in your name/company and select a bill range.";
      return;
    }

    const estimate = getEstimate(payload.billRange);
    const message = formatWhatsappMessage(payload, estimate);
    const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

    statusEl.textContent = "Opening WhatsApp with your request…";

    /* Open WhatsApp immediately (before await) so mobile popup blockers allow it. */
    window.open(waLink, "_blank", "noopener,noreferrer");

    const sent = await sendLead(payload);
    statusEl.textContent = sent
      ? "WhatsApp opened — your request is also logged with our team."
      : "WhatsApp opened — send the message there and we'll reply fast.";

    form.reset();
  });
}

function bindRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!elements.length) return;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((el) => observer.observe(el));
}

renderCredentials();
renderStats();
renderJourney();
renderFinancing();
renderTax();
renderProjects();
renderClients();
renderEquipment();
renderResidential();
renderTestimonials();
renderFaq();
renderFooter();
fillBillRangeOptions();
bindEstimatorPreview();
bindClientTypePresets();
bindLeadForm();
bindRevealAnimations();
