// Behavioural checks: hero video pause/resume, sound toggle, ID-card flip, mobile menu, copy chip.
import { chromium } from "playwright";

const URL = process.env.URL ?? "http://localhost:3123";
const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
const page = await ctx.newPage();
const ok = (c, m) => console.log(c ? "PASS" : "FAIL", m);

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const v = () => page.evaluate(() => { const v = document.querySelector(".hero-video"); return { paused: v.paused, muted: v.muted, t: v.currentTime, dur: v.duration, src: v.currentSrc.split("/").pop() }; });
let s = await v();
ok(!s.paused, `video playing on load (${s.src}, ${s.dur.toFixed(2)}s, muted=${s.muted})`);
await page.evaluate(() => scrollTo(0, innerHeight * 1.2));
await page.waitForTimeout(600);
ok((await v()).paused, "video pauses after scrolling past hero");
await page.evaluate(() => scrollTo(0, 0));
await page.waitForTimeout(600);
ok(!(await v()).paused, "video resumes when scrolling back");
const label1 = await page.getAttribute(".sound-btn", "aria-label");
await page.click(".sound-btn");
await page.waitForTimeout(200);
const label2 = await page.getAttribute(".sound-btn", "aria-label");
ok(label1 !== label2, `sound button toggles: "${label1}" → "${label2}"`);
s = await v();
ok(label2.startsWith("Play") ? s.muted : !s.muted, `muted state matches label (muted=${s.muted})`);

// loop wraps
await page.evaluate(() => { const v = document.querySelector(".hero-video"); v.currentTime = v.duration - 0.2; });
await page.waitForTimeout(700);
s = await v();
ok(s.t < 1 && !s.paused, `video loops (t=${s.t.toFixed(2)})`);

// ID card flip with keyboard
await page.evaluate(() => document.getElementById("about").scrollIntoView());
await page.waitForTimeout(800);
await page.focus(".idc-flipbtn");
await page.keyboard.press("Enter");
ok((await page.getAttribute(".idc-flipbtn", "aria-pressed")) === "true", "ID card flips with Enter");
await page.keyboard.press(" ");
ok((await page.getAttribute(".idc-flipbtn", "aria-pressed")) === "false", "ID card flips back with Space");
const swing = await page.evaluate(async () => {
  const rig = document.querySelector(".lan-rig");
  const z = document.getElementById("about");
  for (let i = 0; i < 12; i++) { z.dispatchEvent(new PointerEvent("pointermove", { clientX: 200 + i * 60, clientY: 400, bubbles: true })); await new Promise(r => setTimeout(r, 16)); }
  await new Promise(r => setTimeout(r, 120));
  return rig.style.transform;
});
ok(/rotate\((-?\d+\.?\d*)deg\)/.test(swing) && Math.abs(parseFloat(swing.match(/-?\d+\.?\d*/)[0])) > 1, `card swings on pointer movement (${swing})`);

// skills inspector
await page.evaluate(() => document.getElementById("skills").scrollIntoView());
await page.waitForTimeout(900);
await page.hover(".sk-tile >> nth=20");
ok((await page.textContent(".sk-insp-name")) === "React", "inspector updates on hover (React)");
await page.click(".sk-chip >> text=Databases");
ok((await page.locator(".sk-cell.is-dim").count()) === 89 - 7, "family filter dims non-matching tiles");

// work accordion
await page.evaluate(() => document.getElementById("work").scrollIntoView());
await page.waitForTimeout(600);
await page.hover(".wk-panel >> nth=2");
await page.waitForTimeout(300);
ok(await page.locator(".wk-panel >> nth=2").evaluate((e) => e.classList.contains("is-open")), "work panel opens on hover");

// copy chip
await page.evaluate(() => document.getElementById("contact").scrollIntoView());
await page.click(".ct-copy");
await page.waitForTimeout(200);
ok((await page.textContent(".ct-copy")).includes("Copied"), "copy chip shows Copied ✓");

// mobile menu
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(URL, { waitUntil: "networkidle" });
await m.click(".nav-menu-btn");
await m.waitForTimeout(900);
ok(await m.evaluate(() => document.documentElement.style.overflow === "hidden"), "menu locks page scroll");
await m.keyboard.press("Escape");
await m.waitForTimeout(300);
ok((await m.getAttribute(".nav-menu-btn", "aria-expanded")) === "false", "Esc closes menu");
await m.click(".nav-menu-btn");
await m.waitForTimeout(900);
await m.click(".nav-overlay >> text=Experience");
await m.waitForTimeout(1800);
const top = await m.evaluate(() => Math.round(document.getElementById("experience").getBoundingClientRect().top));
ok(Math.abs(top) < 4, `menu link scrolls to section (top=${top})`);

await browser.close();
