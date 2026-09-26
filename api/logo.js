/*
 * Vercel serverless function: normalises a client logo for the trusted-by bar.
 *
 * Logos uploaded to Notion arrive with wildly different padding, so "scale to
 * fit the chip" still leaves some looking tiny. This endpoint fetches the file,
 * trims the surrounding background (white or transparent), fits it into a
 * 400×200 canvas, and returns a PNG with a transparent background.
 *
 * Only Notion-hosted files (and this site's own assets) are accepted as sources.
 */

const sharp = require("sharp");

const ALLOWED_HOSTS = [
  /\.amazonaws\.com$/,
  /\.notion\.so$/,
  /\.notion-static\.com$/,
  /^butanwebsite\.vercel\.app$/
];

module.exports = async function handler(req, res) {
  const src = req.query?.src || new URL(req.url, "http://x").searchParams.get("src");
  let url;
  try {
    url = new URL(src);
  } catch {
    return res.status(400).send("bad src");
  }
  if (url.protocol !== "https:" || !ALLOWED_HOSTS.some((re) => re.test(url.hostname))) {
    return res.status(400).send("source not allowed");
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) return res.status(502).send(`upstream ${upstream.status}`);
    const input = Buffer.from(await upstream.arrayBuffer());

    /* Flatten onto white first so JPEGs and white-background PNGs trim the
       same way, then trim, then make white transparent-ish via the chip's
       multiply blend on the client. */
    const trimmed = await sharp(input)
      .flatten({ background: "#ffffff" })
      .trim({ threshold: 24 })
      .toBuffer();

    const out = await sharp(trimmed)
      .resize(400, 200, { fit: "inside", withoutEnlargement: false })
      .png()
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).send(out);
  } catch (err) {
    console.error("logo normalise failed:", err.message);
    return res.status(502).send("logo processing failed");
  }
};
