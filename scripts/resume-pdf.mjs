// Renders the .docx résumé (converted to HTML with macOS `textutil`) to public/Ravali-Kethiri-Resume.pdf.
//   textutil -convert html source/Ravali-Kethiri-Resume.docx -output /tmp/resume.html
//   node scripts/resume-pdf.mjs /tmp/resume.html
import { chromium } from "playwright";
import path from "node:path";

const src = path.resolve(process.argv[2]);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${src}`);
await page.addStyleTag({ content: "body{font-family:Helvetica,Arial,sans-serif}" });
await page.pdf({
  path: "public/Ravali-Kethiri-Resume.pdf",
  format: "Letter",
  margin: { top: "0.5in", bottom: "0.5in", left: "0.6in", right: "0.6in" },
  printBackground: true,
});
await browser.close();
console.log("wrote public/Ravali-Kethiri-Resume.pdf");
