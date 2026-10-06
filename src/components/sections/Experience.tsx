"use client";

import { useRef, type CSSProperties } from "react";
import { TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";

export default function Experience() {
  const spine = useRef<HTMLDivElement>(null);

  // draw the spine with scroll progress; light each stop once the spine tip reaches it
  const track = useScrollProgress<HTMLOListElement>(
    (p, el) => {
      const h = el.offsetHeight;
      const tip = p * h;
      if (spine.current) spine.current.style.transform = `scaleY(${p})`;
      el.querySelectorAll<HTMLElement>(".tl-stop").forEach((stop) => {
        stop.classList.toggle("is-lit", stop.offsetTop + 14 <= tip + 2);
      });
    },
    { start: 0.62, end: 0.62 },
  );

  return (
    <section id="experience" className="section tl" aria-labelledby="exp-title">
      <style>{css}</style>
      <div className="wrap tl-grid">
        <SectionHead index="05" label="Experience" id="exp-title" lines={["Education and work,", "one"]} accent="path." className="tl-head">
          <p className="tl-intro rv" style={{ "--i": 2 } as CSSProperties}>
            From a Computer Science degree in 2016 to nine-plus years shipping enterprise Java for healthcare and
            financial services.
          </p>
        </SectionHead>

        <div className="tl-body">
          <div className="tl-rail" aria-hidden="true">
            <div ref={spine} className="tl-spine" />
          </div>
          <ol ref={track} className="tl-track">
            {TIMELINE.map((s) => (
              <li key={s.id} className="tl-stop">
                <span className="tl-dot" aria-hidden="true" />
                <p className="tl-year mono">
                  {s.year}
                  <span className="tl-kind">{s.kind === "work" ? "Work" : "Education"}</span>
                </p>
                <h3 className="tl-title">{s.title}</h3>
                <p className="tl-place">{s.place}</p>
                <p className="tl-detail">{s.detail}</p>
              </li>
            ))}
            <li className="tl-stop tl-next">
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-next-card">
                <p className="mono">Next</p>
                <p className="tl-next-q">
                  Your <em>team?</em>
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

const css = `
.tl-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,5vw,96px);align-items:start}
.tl-head{position:sticky;top:110px}
.tl-intro{max-width:40ch;margin:24px 0 0;color:var(--mute)}
.tl-body{position:relative}
.tl-track{position:relative;list-style:none;margin:0;padding:0 0 0 44px}
.tl-rail{position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:var(--line);border-radius:2px}
.tl-spine{position:absolute;inset:0;background:var(--ink);transform:scaleY(0);transform-origin:50% 0;border-radius:2px}
.tl-stop{position:relative;padding-bottom:56px}
.tl-dot{position:absolute;left:-44px;top:4px;width:16px;height:16px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);
  transition:box-shadow .5s var(--ease),background .5s var(--ease),transform .6s var(--ease)}
.tl-stop.is-lit .tl-dot{background:var(--ink);box-shadow:inset 0 0 0 2px var(--ink),0 0 0 6px rgba(13,13,13,.08);transform:scale(1.1)}
.tl-stop>*:not(.tl-dot){opacity:.42;transform:translateX(-6px);transition:opacity .7s var(--ease),transform .8s var(--ease)}
.tl-stop.is-lit>*:not(.tl-dot){opacity:1;transform:none}
.tl-year{margin:0;font-size:12px;color:var(--mute);display:flex;gap:12px;align-items:center;letter-spacing:.03em}
.tl-kind{padding:2px 8px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);font-size:10px;text-transform:uppercase;letter-spacing:.06em}
.tl-title{margin:12px 0 0;font-size:clamp(22px,2.2vw,32px);font-weight:700;letter-spacing:-.035em;line-height:1.08}
.tl-place{margin:8px 0 0;font-size:15px;color:var(--ink-2)}
.tl-detail{margin:10px 0 0;max-width:60ch;font-size:14.5px;color:var(--mute);line-height:1.55}
.tl-next{padding-bottom:0}
.tl-next-card{border:1.5px dashed rgba(13,13,13,.25);border-radius:24px;padding:24px 26px}
.tl-next-card .mono{margin:0;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
.tl-next-q{margin:8px 0 0;font-size:clamp(28px,3vw,44px);font-weight:700;letter-spacing:-.045em;line-height:1}
.tl-next-q em{font-family:var(--font-serif);font-weight:400;color:var(--mute)}
@media (max-width:860px){
  .tl-grid{grid-template-columns:minmax(0,1fr)}
  .tl-head{position:relative;top:0}
  .tl-track{padding-left:36px}
  .tl-dot{left:-36px}
}
@media (prefers-reduced-motion:reduce){.tl-stop>*:not(.tl-dot){opacity:1;transform:none}.tl-spine{transform:none}}
`;
