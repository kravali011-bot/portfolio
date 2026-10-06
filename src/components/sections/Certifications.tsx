import type { CSSProperties } from "react";
import { CERTIFICATIONS } from "@/lib/data";

const COUNT = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export default function Certifications() {
  return (
    <section id="certifications" className="ce" aria-labelledby="cert-title">
      <style>{css}</style>
      <div className="wrap ce-grid section">
        <header className="ce-head">
          <p className="tag rv">
            <b>04</b> — Certifications
          </p>
          <h2 id="cert-title" className="h-display ce-title">
            <span className="rv-mask">
              <span>Always</span>
            </span>
            <span className="rv-mask" style={{ "--i": 1 } as CSSProperties}>
              <span>
                <em>learning.</em>
              </span>
            </span>
          </h2>
          <p className="ce-count mono rv" style={{ "--i": 2 } as CSSProperties}>
            {String(CERTIFICATIONS.length).padStart(2, "0")} — {COUNT[CERTIFICATIONS.length] ?? CERTIFICATIONS.length}{" "}
            certifications on record
          </p>
        </header>

        <ol className="ce-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="ce-row rv" style={{ "--i": i } as CSSProperties} tabIndex={0}>
              <span className="ce-n mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="ce-t">{c.title}</span>
              <span className="ce-i mono">{c.issuer ?? ""}</span>
              <span className="ce-arrow" aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const css = `
.ce{background:var(--card);border-block:1px solid var(--line)}
.ce-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,5vw,96px);align-items:start}
.ce-head{position:sticky;top:110px}
.ce-title{margin-top:24px}
.ce-count{margin:24px 0 0;font-size:12px;color:var(--mute);letter-spacing:.04em;text-transform:uppercase}
.ce-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.ce-row{position:relative;display:grid;grid-template-columns:56px minmax(0,1fr) auto 28px;align-items:center;gap:16px;padding:30px 18px;
  border-bottom:1px solid var(--line);isolation:isolate;outline:none;border-radius:0}
.ce-row::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;z-index:-1;
  transition:transform .7s var(--ease)}
.ce-row:hover::before,.ce-row:focus-visible::before{transform:scaleX(1)}
.ce-row>span{transition:color .5s var(--ease)}
.ce-row:hover>span,.ce-row:focus-visible>span{color:#fff}
.ce-n{font-size:12px;color:var(--faint)}
.ce-t{font-size:clamp(19px,1.9vw,28px);font-weight:600;letter-spacing:-.03em;line-height:1.15}
.ce-i{font-size:11.5px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em;text-align:right}
.ce-arrow{font-size:20px;opacity:0;transform:translate(-10px,6px);transition:opacity .5s var(--ease),transform .6s var(--ease)!important}
.ce-row:hover .ce-arrow,.ce-row:focus-visible .ce-arrow{opacity:1;transform:none}
@media (max-width:860px){
  .ce-grid{grid-template-columns:minmax(0,1fr)}
  .ce-head{position:relative;top:0}
  .ce-row{grid-template-columns:40px minmax(0,1fr) 20px;padding:24px 8px}
  .ce-i{grid-column:2;grid-row:2;text-align:left;margin-top:-8px}
}
`;
