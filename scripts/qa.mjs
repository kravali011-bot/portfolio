// QA: screenshots at 1440×900 and 390×844, overflow check, console errors.
//   npm run build && npx next start -p 3123 & node scripts/qa.mjs
import { chromium } from "playwright";
import fs from "node:fs";

const URL = process.env.URL ?? "http://localhost:3123";
fs.mkdirSync("qa", { recursive: true });
const browser = await chromium.launch();
let failed = false;

for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, hasTouch: name === "mobile" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `qa/${name}-hero.png` });
  // walk the page so reveals fire, then capture each section
  for (const id of ["about", "skills", "work", "certifications", "experience", "contact"]) {
    await page.evaluate((id) => document.getElementById(id).scrollIntoView(), id);
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `qa/${name}-${id}.png` });
  }
  const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
  console.log(name, "scrollWidth", o.sw, "innerWidth", o.iw, o.sw === o.iw ? "OK" : "OVERFLOW");
  if (o.sw !== o.iw) failed = true;
  console.log(name, "console errors:", errors.length ? errors : "none");
  if (errors.length) failed = true;
  await ctx.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
