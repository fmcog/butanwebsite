/* Rendering + lead flow. All content comes from data.js — edit there, not here. */

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

function getEstimate(billRange) {
  return BILL_BANDS[billRange] || null;
}

function bindEstimatorPreview() {
  const billRangeEl = document.getElementById("bill-range");
  const display = document.getElementById("estimate-display");
  if (!billRangeEl || !display) return;

  billRangeEl.addEventListener("change", () => {
    const estimate = getEstimate(billRangeEl.value);
    if (!estimate) return;
    display.innerHTML = `
      <p class="estimate-label">Typical outcome for ${billRangeEl.value}</p>
      <h4>${estimate.system} system</h4>
      <p>Savings around ${estimate.savings} (${estimate.annual})</p>
      <p class="estimate-note">Modeled estimate — confirmed after free site assessment.</p>
    `;
  });
}

function formatWhatsappMessage(companyName, billRange, estimate) {
  return [
    "Hello Butan Solar,",
    "",
    "I would like a Commercial/Industrial solar proposal.",
    `Company: ${companyName}`,
    `Monthly bill range: ${billRange}`,
    `Estimated system size: ${estimate.system}`,
    `Estimated savings: ${estimate.savings}`,
    "Interested models: Outright / Zero CapEx",
    `Campaign code: ${CONFIG.campaignCode}`,
    "",
    "Please contact me for a site assessment and detailed ROI."
  ].join("\n");
}

async function sendLeadEmail(payload) {
  try {
    const response = await fetch(CONFIG.emailEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `New Solar Lead - ${payload.companyName}`,
        _template: "table",
        Company: payload.companyName,
        "Monthly Bill Range": payload.billRange,
        "Estimated System": payload.system,
        "Estimated Savings": payload.savings,
        "Campaign Code": CONFIG.campaignCode,
        Source: "Butan Solar Landing Page"
      })
    });
    return response.ok;
  } catch {
    return false;
  }
}

function bindLeadForm() {
  const form = document.getElementById("solar-lead-form");
  const companyEl = document.getElementById("company-name");
  const billRangeEl = document.getElementById("bill-range");
  const statusEl = document.getElementById("form-status");
  if (!form || !companyEl || !billRangeEl || !statusEl) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const companyName = companyEl.value.trim();
    const billRange = billRangeEl.value;
    const estimate = getEstimate(billRange);

    if (!companyName || !estimate) {
      statusEl.textContent = "Please fill in your company name and select a bill range.";
      return;
    }

    const message = formatWhatsappMessage(companyName, billRange, estimate);
    const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

    statusEl.textContent = "Opening WhatsApp with your request…";

    /* Open WhatsApp immediately (before await) so mobile popup blockers allow it. */
    window.open(waLink, "_blank", "noopener,noreferrer");

    const emailSent = await sendLeadEmail({
      companyName,
      billRange,
      system: estimate.system,
      savings: estimate.savings
    });

    statusEl.textContent = emailSent
      ? "WhatsApp opened — our team has also been notified by email."
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
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));
}

fillBillRangeOptions();
renderProjects();
renderClients();
renderTestimonials();
renderFaq();
bindEstimatorPreview();
bindLeadForm();
bindRevealAnimations();
