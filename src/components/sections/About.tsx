"use client";

import { useRef, type CSSProperties } from "react";
import { EDUCATION, EXPERIENCE, PROFILE } from "@/lib/data";
import IdCard from "../ui/IdCard";

export default function About() {
  const zone = useRef<HTMLElement>(null);
  const latest = EXPERIENCE[0];

  const facts = [
    { k: "Location", v: PROFILE.location },
    {
      k: "Education",
      v: (
        <>
          B.S. Computer Science &amp; Engineering, JNTU · {EDUCATION[0].year}
          <br />
          PG Program in AI &amp; ML, UT Austin
        </>
      ),
    },
    {
      k: "Latest role",
      v: (
        <>
          {latest.title}, {latest.short}
          <br />
          <span className="mono ab-dim">
            {latest.start} – {latest.end}
          </span>
        </>
      ),
    },
    {
      k: "Email",
      v: (
        <a href={`mailto:${PROFILE.email}`} className="ab-link">
          {PROFILE.email}
        </a>
      ),
    },
  ];

  return (
    <section id="about" ref={zone} className="section ab" aria-labelledby="about-title">
      <style>{css}</style>
      <div className="wrap ab-grid">
        <div className="ab-left">
          <p className="tag rv">
            <b>01</b> — About
          </p>
          <h2 id="about-title" className="h-display ab-title">
            <span className="rv-mask">
              <span>Hi, I&rsquo;m</span>
            </span>
            <span className="rv-mask" style={{ "--i": 1 } as CSSProperties}>
              <span>
                <em>{PROFILE.firstName}.</em>
              </span>
            </span>
          </h2>
          <p className="ab-lead rv" style={{ "--i": 2 } as CSSProperties}>
            {PROFILE.resumeSummary}
          </p>
          <p className="ab-body rv" style={{ "--i": 3 } as CSSProperties}>
            {PROFILE.summaryExtra}
          </p>
          <div className="ab-ctas rv" style={{ "--i": 4 } as CSSProperties}>
            <a href={PROFILE.resume} download className="btn btn-primary btn-sm">
              Résumé <span aria-hidden="true">↓</span>
            </a>
            {PROFILE.github && (
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="ab-center">
          <IdCard zone={zone} />
        </div>

        <div className="ab-right">
          <p className="tag rv">Quick facts</p>
          <dl className="ab-facts">
            {facts.map((f, i) => (
              <div key={f.k} className="rv" style={{ "--i": i + 1 } as CSSProperties}>
                <dt className="mono">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="ab-quote rv" style={{ "--i": 5 } as CSSProperties}>
            <span aria-hidden="true">&ldquo;</span>
            {PROFILE.quote}
          </blockquote>
        </div>
      </div>
    </section>
  );
}

const css = `
.ab{overflow:hidden}
.ab-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,3vw,56px);align-items:stretch}
.ab-left,.ab-right{display:flex;flex-direction:column}
.ab-title{margin-top:24px}
.ab-lead{margin:28px 0 0;font-size:clamp(17px,1.3vw,20px);line-height:1.5;letter-spacing:-.01em;color:var(--ink)}
.ab-body{margin:16px 0 0;color:var(--mute)}
.ab-ctas{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:32px}
.ab-center{position:relative}
.ab-right{padding-top:4px}
.ab-facts{margin:20px 0 0}
.ab-facts div{display:grid;grid-template-columns:96px minmax(0,1fr);gap:16px;padding:16px 0;border-top:1px solid var(--line)}
.ab-facts div:last-child{border-bottom:1px solid var(--line)}
.ab-facts dt{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);padding-top:3px}
.ab-facts dd{margin:0;font-size:15px;line-height:1.45;overflow-wrap:anywhere}
.ab-dim{font-size:12px;color:var(--mute)}
.ab-link{background:linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat;transition:background-size .5s var(--ease)}
.ab-link:hover{background-size:0 1px;background-position:100% 100%}
.ab-quote{margin:auto 0 0;padding-top:32px;font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,1.9vw,28px);line-height:1.2;color:var(--ink-2)}
.ab-quote span{color:var(--faint);margin-right:2px}
@media (max-width:1024px){
  .ab-grid{grid-template-columns:minmax(0,1fr);gap:0}
  .ab-center{margin:48px 0 40px}
  .ab-ctas{margin-top:0}
}
`;
