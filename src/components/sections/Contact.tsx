"use client";

import { Fragment, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split(" ").map((word, w, words) => (
        <Fragment key={w}>
          <span className="ct-word">
            {[...word].map((ch, i) => (
              <span key={i} className="ct-l" style={{ "--i": offset + i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  const hop = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (!t.classList.contains("ct-l") || t.classList.contains("hop")) return;
    t.classList.add("hop");
    t.addEventListener("animationend", () => t.classList.remove("hop"), { once: true });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const top = (e: MouseEvent) => {
    e.preventDefault();
    scrollToTarget(0);
    document.getElementById("top")?.focus({ preventScroll: true });
  };

  return (
    <section id="contact" className="section ct" aria-labelledby="contact-title">
      <style>{css}</style>
      <div className="wrap">
        <p className="tag rv">
          <b>06</b> — Contact
        </p>
        <h2 id="contact-title" className="ct-title" onMouseOver={hop} aria-label="Let's build something together.">
          <span className="rv-mask" aria-hidden="true">
            <span>
              <Letters text="Let's build" />
            </span>
          </span>
          <span className="rv-mask" style={{ "--i": 1 } as CSSProperties} aria-hidden="true">
            <span>
              <Letters text="something" offset={11} />{" "}
              <em>
                <Letters text="together." offset={20} />
              </em>
            </span>
          </span>
        </h2>

        <div className="ct-grid">
          <div className="ct-main">
            <div className="ct-email-row rv">
              <a href={`mailto:${PROFILE.email}`} className="ct-email">
                {PROFILE.email}
              </a>
              <button type="button" className="ct-copy" onClick={copy} aria-label={`Copy email address ${PROFILE.email}`}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
            <ul className="ct-links rv" style={{ "--i": 1 } as CSSProperties}>
              {PROFILE.github && (
                <li>
                  <span className="mono">GitHub</span>
                  <a href={PROFILE.github} target="_blank" rel="noreferrer">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </li>
              )}
              <li>
                <span className="mono">LinkedIn</span>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  {PROFILE.linkedinLabel} <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <span className="mono">Based</span>
                <span>{PROFILE.location}</span>
              </li>
            </ul>
          </div>

          <a href={`mailto:${PROFILE.email}`} className="ct-badge rv" style={{ "--i": 2 } as CSSProperties} aria-label="Say hello by email">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="ct-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#ct-circle" textLength="488">
                  SAY HELLO · SAY HELLO · SAY HELLO ·
                </textPath>
              </text>
            </svg>
            <span className="ct-badge-dot" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <footer className="wrap ct-foot">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <a href="#top" onClick={top} className="ct-top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
        <p className="mono">Built with Next.js</p>
      </footer>
    </section>
  );
}

const css = `
.ct{padding-bottom:0}
.ct-title{margin:28px 0 0;font-weight:700;letter-spacing:-.05em;line-height:.95;font-size:clamp(48px,9vw,148px)}
.ct-title em{font-family:var(--font-serif);font-weight:400;letter-spacing:-.025em;color:var(--mute)}
.ct-word{display:inline-block;white-space:nowrap}
.ct-l{display:inline-block;will-change:transform}
.ct-l.hop{animation:hop .6s var(--ease)}
@keyframes hop{0%{transform:none}35%{transform:translateY(-.16em)}65%{transform:translateY(.03em)}100%{transform:none}}
.ct-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;margin-top:clamp(48px,8vh,96px)}
.ct-email-row{display:flex;align-items:center;flex-wrap:wrap;gap:14px 18px}
.ct-email{font-size:clamp(24px,3.6vw,52px);font-weight:600;letter-spacing:-.04em;line-height:1.1;overflow-wrap:anywhere;
  background:linear-gradient(currentColor,currentColor) 0 100%/100% 2px no-repeat;padding-bottom:4px;transition:background-size .6s var(--ease)}
.ct-email:hover{background-size:0 2px;background-position:100% 100%}
.ct-copy{height:34px;padding:0 14px;border-radius:999px;font-size:13px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.18);
  transition:background .4s var(--ease),color .4s var(--ease)}
.ct-copy:hover{background:var(--ink);color:#fff}
.ct-links{list-style:none;margin:40px 0 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 28px;max-width:860px}
.ct-links li{display:flex;flex-direction:column;gap:6px;padding-top:14px;border-top:1px solid var(--line);font-size:15.5px;min-width:0;overflow-wrap:anywhere}
.ct-links .mono{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute)}
.ct-links a{transition:opacity .3s var(--ease)}
.ct-links a:hover{opacity:.6}
.ct-badge{position:relative;width:168px;height:168px;display:grid;place-items:center;border-radius:50%}
.ct-badge svg{position:absolute;inset:0;width:100%;height:100%;animation:spin 18s linear infinite}
.ct-badge text{font:500 13.5px var(--font-mono);letter-spacing:.1em;fill:var(--ink)}
.ct-badge-dot{width:64px;height:64px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:22px;
  transition:transform .6s var(--ease)}
.ct-badge:hover .ct-badge-dot{transform:rotate(45deg) scale(1.08)}
@keyframes spin{to{transform:rotate(360deg)}}
.ct-foot{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:clamp(80px,14vh,140px);
  padding-block:28px;border-top:1px solid var(--line);font-size:13.5px;color:var(--mute)}
.ct-foot p{margin:0}
.ct-foot .mono{font-size:12px}
.ct-top{color:var(--ink);font-weight:500}
.ct-top:hover{opacity:.6}
@media (max-width:860px){
  .ct-grid{grid-template-columns:minmax(0,1fr)}
  .ct-badge{justify-self:end;width:132px;height:132px}
  .ct-badge-dot{width:52px;height:52px}
  .ct-links{grid-template-columns:minmax(0,1fr)}
}
`;
