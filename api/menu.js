import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://msuranie.cz/jidelni-listek/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html",
      },
    });

    const html = await response.text();
    res.status(200).json({ html: html.slice(0, 2000) }); // pošli prvních 2000 znaků
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}