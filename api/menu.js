import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://msuranie.cz/jidelni-listek/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);
    const text = $("div.entry-content").text().replace(/\s+/g, " ").trim();

    res.status(200).json({ menu: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Nepodařilo se načíst jídelníček" });
  }
}