import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/menu", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://msuranie.cz/jidelni-listek/", {
      waitUntil: "networkidle0",
      timeout: 60000
    });

    const text = await page.evaluate(() => {
      const el = document.querySelector("div.entry-content");
      return el ? el.innerText.trim() : "";
    });

    await browser.close();
    res.json({ menu: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));