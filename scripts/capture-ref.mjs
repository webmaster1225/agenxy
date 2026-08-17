import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), ".ref-screenshots");
mkdirSync(OUT, { recursive: true });

const pages = [
  { name: "home", path: "/" },
  { name: "label", path: "/label" },
  { name: "management", path: "/management" },
  { name: "artists", path: "/artists" },
  { name: "artist-detail", path: "/artists/each-artists" },
  { name: "contact", path: "/contact-us" },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

async function dump(name) {
  const data = await page.evaluate(() => {
    const styleOf = (el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        text: (el.innerText || "").slice(0, 60).replace(/\s+/g, " "),
        font: `${s.fontWeight} ${s.fontSize}/${s.lineHeight} ${s.fontFamily}`,
        letter: s.letterSpacing,
        color: s.color,
        bg: s.backgroundColor,
        pad: s.padding,
        margin: s.margin,
        border: s.border,
        w: Math.round(r.width),
        h: Math.round(r.height),
        x: Math.round(r.x),
        y: Math.round(r.y),
      };
    };

    const interesting = [];
    for (const el of document.querySelectorAll("h1,h2,h3,a,p,button,header,nav,section,input,label")) {
      const t = (el.innerText || "").trim();
      if (!t) continue;
      if (interesting.length > 120) break;
      interesting.push({ tag: el.tagName, ...styleOf(el) });
    }

    const body = getComputedStyle(document.body);
    const html = getComputedStyle(document.documentElement);
    return {
      bodyBg: body.backgroundColor,
      bodyColor: body.color,
      bodyFont: body.fontFamily,
      htmlBg: html.backgroundColor,
      scrollH: document.documentElement.scrollHeight,
      interesting,
    };
  });
  writeFileSync(join(OUT, `${name}-tokens.json`), JSON.stringify(data, null, 2));
}

for (const p of pages) {
  const url = `https://new-kiwi-576732.framer.app${p.path}`;
  console.log("goto", url);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: join(OUT, `${p.name}-1440.png`), fullPage: true });
  await page.screenshot({ path: join(OUT, `${p.name}-hero-1440.png`), fullPage: false });
  await dump(p.name);

  if (p.name === "home") {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    let y = 0;
    let i = 0;
    while (y < height && i < 12) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(400);
      await page.screenshot({ path: join(OUT, `home-slice-${String(i).padStart(2, "0")}.png`), fullPage: false });
      y += 850;
      i += 1;
    }
    await page.evaluate(() => window.scrollTo(0, 0));
  }
}

await browser.close();
console.log("done");
