/*
 * Vercel serverless function: serves the website's CMS content from the
 * Notion "Website Content" database (Butan Solar → 🖼️ Website Content).
 *
 * Bob edits rows in Notion (photo, caption, size, model, order, Published);
 * the site fetches this endpoint and renders. Notion file URLs are signed and
 * expire after ~1 hour, so responses are cached at the edge for 5 minutes only.
 *
 * Requires env var NOTION_TOKEN — the same integration used by /api/lead,
 * which must also be connected to the Website Content database.
 */

const DATABASE_ID = "edcfddf2-7f78-49c2-b007-9432c43d7949";

function text(prop) {
  return (prop?.rich_text || prop?.title || []).map((t) => t.plain_text).join("").trim();
}

function fileUrl(prop) {
  const f = prop?.files?.[0];
  if (!f) return "";
  return f.type === "external" ? f.external.url : f.file?.url || "";
}

async function queryAll() {
  const rows = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filter: { property: "Published", checkbox: { equals: true } },
        sorts: [{ property: "Order", direction: "ascending" }],
        page_size: 100,
        start_cursor: cursor
      })
    });
    if (!res.ok) throw new Error(`Notion ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const data = await res.json();
    rows.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return rows;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (!process.env.NOTION_TOKEN) {
    return res.status(503).json({ ok: false, error: "NOTION_TOKEN not set" });
  }
  try {
    const rows = await queryAll();
    const projects = [];
    const clients = [];
    for (const row of rows) {
      const p = row.properties;
      const item = {
        name: text(p.Name),
        photo: fileUrl(p.Photo),
        caption: text(p.Caption),
        size: text(p.Size),
        model: p.Model?.select?.name || ""
      };
      if (p.Type?.select?.name === "Client logo") clients.push({ name: item.name, logo: item.photo });
      else projects.push(item);
    }
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({ ok: true, projects, clients });
  } catch (err) {
    console.error("Website Content fetch failed:", err.message);
    return res.status(502).json({ ok: false, error: err.message });
  }
};
