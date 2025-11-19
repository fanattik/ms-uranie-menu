import express from "express";
import { chromium } from "playwright";

const app = express();

app.get("/menu", async (req, res) => {
  try {
    const browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://msuranie.cz/jidelni-listek/", {
      waitUntil: "networkidle"
    });

    // počkej chvíli, než JS vygeneruje jídelníček
    await page.waitForTimeout(2000);

    const text = await page.locator("div.entry-content").innerText();
    await browser.close();

    res.json({ menu: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));