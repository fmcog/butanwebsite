/*
 * Vercel serverless function: receives website leads, creates a page in the
 * Notion Sales Pipeline database, and sends an email notification.
 *
 * Required env var:
 *   NOTION_TOKEN — secret of a Notion internal integration that has been
 *                  given access to the Sales Pipeline database.
 *
 * The Notion data source ID is fixed (Butan Solar → Sales Pipeline).
 */

/*
 * Note: email notification is sent CLIENT-SIDE from script.js via FormSubmit —
 * FormSubmit 403s requests from datacenter IPs, so it cannot be called from
 * this function. This endpoint handles the Notion pipeline write only.
 */

/* Accept the misspelled key Vercel refuses to rename (sensitive vars are immutable). */
const NOTION_TOKEN = process.env.NOTION_TOKEN || process.env.NOTIION_TOKEN;

const NOTION_DATA_SOURCE_ID = "721ba9db-a791-834b-841a-079d2df33929";

const VALID_CLIENT_TYPES = new Set(["Commercial", "Residential"]);
const VALID_FINANCING = new Set(["Outright", "0 capex", "Bank loan"]);

function clean(value, maxLen) {
  return String(value || "").trim().slice(0, maxLen);
}

async function createNotionLead({ companyName, clientType, financing, description }) {
  const properties = {
    Name: { title: [{ text: { content: companyName } }] },
    "Lead Status": { status: { name: "Cold" } },
    "Description/Issue": { rich_text: [{ text: { content: description } }] }
  };
  if (VALID_CLIENT_TYPES.has(clientType)) {
    properties["Client Type"] = { select: { name: clientType } };
  }
  if (VALID_FINANCING.has(financing)) {
    properties["Financing"] = { select: { name: financing } };
  }

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATA_SOURCE_ID },
      properties
    })
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = req.body || {};

  /* Honeypot: the visible form keeps this field hidden; bots fill it. */
  if (clean(body.website, 10)) {
    return res.status(200).json({ ok: true });
  }

  const companyName = clean(body.companyName, 200);
  const clientType = clean(body.clientType, 20);
  const billRange = clean(body.billRange, 60);
  const financing = clean(body.financing, 20);
  const phone = clean(body.phone, 40);

  if (!companyName || !billRange) {
    return res.status(400).json({ ok: false, error: "companyName and billRange are required" });
  }

  const description = [
    "Website lead",
    `Bill range: ${billRange}`,
    phone ? `Phone: ${phone}` : null,
    financing ? null : "Financing: undecided — advise",
    `Submitted: ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`
  ].filter(Boolean).join(" · ");

  const results = { notion: false };

  if (NOTION_TOKEN) {
    try {
      await createNotionLead({ companyName, clientType, financing, description });
      results.notion = true;
    } catch (err) {
      console.error("Notion lead creation failed:", err.message);
    }
  } else {
    console.error("NOTION_TOKEN not set — skipping pipeline write");
  }

  /* The visitor is already in WhatsApp either way; this only affects the
     status message shown under the form. */
  return res.status(results.notion ? 200 : 502).json({ ok: results.notion, ...results });
};
