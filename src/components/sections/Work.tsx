"use client";

import { useState, type CSSProperties } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";

export default function Work() {
  const [open, setOpen] = useState(PROJECTS[0].id);

  return (
    <section id="work" className="section wk" aria-labelledby="work-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead index="03" label="Selected work" id="work-title" lines={["Things I've"]} accent="built.">
          <p className="wk-intro rv" style={{ "--i": 2 } as CSSProperties}>
            My résumé lists no standalone projects, so these are the three teams I&rsquo;ve built for, in my own
            words from the résumé.
          </p>
        </SectionHead>

        <div className="wk-row rv" style={{ "--i": 3 } as CSSProperties}>
          {PROJECTS.map((p) => (
            <Panel key={p.id} p={p} open={open === p.id} onOpen={() => setOpen(p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ p, open, onOpen }: { p: Project; open: boolean; onOpen: () => void }) {
  const bodyId = `wk-body-${p.id}`;
  return (
    <article
      className={`wk-panel ${open ? "is-open" : ""}`}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      aria-labelledby={`wk-title-${p.id}`}
    >
      <button className="wk-spine" aria-expanded={open} aria-controls={bodyId} onClick={onOpen}>
        <span className="wk-spine-n mono">{p.index}</span>
        <span className="wk-spine-t">{p.title}</span>
        <span className="wk-plus" aria-hidden="true">
          +
        </span>
      </button>

      <div id={bodyId} className="wk-body" hidden={!open}>
        <div className="wk-text">
          <p className="wk-kicker mono">
            <b>{p.index}</b> — {p.kicker}
          </p>
          <h3 id={`wk-title-${p.id}`} className="wk-title">
            {p.title}
          </h3>
          <p className="wk-desc">{p.description}</p>
          <ul className="wk-feats">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <ul className="wk-tech" aria-label="Technologies">
            {p.tech.map((t) => (
              <li key={t.name} className="chip">
                <TechLogo logo={t.logo} size={14} />
                {t.name}
              </li>
            ))}
          </ul>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm wk-gh">
              View on GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <figure className="wk-ui" aria-label={`Illustrative interface hinting at the ${p.title} work`}>
          <figcaption className="wk-ui-label mono">Illustrative UI</figcaption>
          {p.ui === "portal" && <PortalUI />}
          {p.ui === "messaging" && <MessagingUI />}
          {p.ui === "table" && <TableUI />}
        </figure>
      </div>
    </article>
  );
}

/* ── Illustrative mini-UIs (grayscale, pure CSS) ── */

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-win" aria-hidden="true">
      <div className="ui-bar">
        <i />
        <i />
        <i />
        <span />
      </div>
      {children}
    </div>
  );
}

function PortalUI() {
  return (
    <Chrome>
      <div className="ui-portal">
        <div className="ui-side">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={i === 1 ? "on" : ""} />
          ))}
        </div>
        <div className="ui-main">
          <div className="ui-steps">
            {[1, 2, 3].map((i) => (
              <span key={i} className={i < 3 ? "done" : ""}>
                {i}
              </span>
            ))}
          </div>
          {[70, 45, 85, 55].map((w, i) => (
            <div key={i} className="ui-field">
              <span style={{ width: `${w * 0.4}%` }} />
              <div />
            </div>
          ))}
          <div className="ui-btn" />
        </div>
      </div>
      <div className="ui-pipe">
        {["Dev", "QA", "Staging", "Prod"].map((s, i) => (
          <span key={s} style={{ "--k": i } as CSSProperties}>
            {s}
          </span>
        ))}
      </div>
    </Chrome>
  );
}

function MessagingUI() {
  return (
    <Chrome>
      <div className="ui-msg">
        <div className="ui-svc">
          {["svc", "svc", "svc"].map((s, i) => (
            <div key={i} className="ui-node">
              <b />
              <span />
            </div>
          ))}
        </div>
        <div className="ui-queue">
          <div className="ui-q-label">JMS</div>
          <div className="ui-q-track">
            {[0, 1, 2, 3].map((i) => (
              <i key={i} style={{ "--k": i } as CSSProperties} />
            ))}
          </div>
        </div>
        <div className="ui-svc">
          {[0, 1].map((i) => (
            <div key={i} className="ui-node">
              <b />
              <span />
            </div>
          ))}
        </div>
      </div>
      <div className="ui-log">
        {[88, 64, 76, 52].map((w, i) => (
          <span key={i} style={{ width: `${w}%`, "--k": i } as CSSProperties} />
        ))}
      </div>
    </Chrome>
  );
}

function TableUI() {
  return (
    <Chrome>
      <div className="ui-table">
        <div className="ui-tr ui-th">
          {[30, 22, 18, 16].map((w, i) => (
            <span key={i} style={{ width: `${w}%` }} />
          ))}
        </div>
        {Array.from({ length: 7 }).map((_, r) => (
          <div key={r} className="ui-tr" style={{ "--k": r } as CSSProperties}>
            {[30, 22, 18, 16].map((w, i) => (
              <span key={i} style={{ width: `${w - ((r * 7 + i * 5) % 9)}%` }} />
            ))}
          </div>
        ))}
        <div className="ui-pager">
          <span>‹</span>
          <span className="on">1</span>
          <span>2</span>
          <span>3</span>
          <span>…</span>
          <span>›</span>
        </div>
      </div>
    </Chrome>
  );
}

const css = `
.wk-intro{max-width:56ch;margin:24px 0 0;color:var(--mute)}
.wk-row{display:flex;gap:10px;height:min(78svh,600px);margin-top:48px}
.wk-panel{position:relative;flex:1 1 0;min-width:0;border-radius:26px;background:var(--card);box-shadow:var(--shadow-card);overflow:hidden;
  transition:flex-grow .9s var(--ease),box-shadow .6s var(--ease)}
.wk-panel.is-open{flex-grow:8;box-shadow:var(--shadow-lift)}
.wk-spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;
  transition:opacity .4s var(--ease);border-radius:26px;width:100%}
.wk-panel.is-open .wk-spine{opacity:0;pointer-events:none}
.wk-spine-n{font-size:12px;color:var(--mute)}
.wk-spine-t{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:700;letter-spacing:-.03em;font-size:clamp(20px,2vw,28px);white-space:nowrap}
.wk-plus{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:20px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.18);
  transition:transform .6s var(--ease),background .4s var(--ease),color .4s var(--ease)}
.wk-spine:hover .wk-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.wk-body{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(16px,2.4vw,36px);padding:clamp(22px,2.6vw,36px);
  min-width:min(860px,72vw)}
.wk-body[hidden]{display:none}
.wk-text{display:flex;flex-direction:column;min-width:0;animation:wkIn .9s var(--ease) .15s both}
@keyframes wkIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.wk-kicker{margin:0;font-size:11.5px;color:var(--mute);letter-spacing:.03em}
.wk-kicker b{color:var(--ink);font-weight:500}
.wk-title{margin:12px 0 0;font-size:clamp(28px,2.9vw,44px);font-weight:700;letter-spacing:-.045em;line-height:1}
.wk-desc{margin:14px 0 0;color:var(--ink-2);font-size:14.5px;line-height:1.5}
.wk-feats{list-style:none;margin:16px 0 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px 18px}
.wk-feats li{position:relative;padding-left:14px;font-size:12.5px;line-height:1.35;color:var(--ink-2)}
.wk-feats li::before{content:"";position:absolute;left:0;top:.55em;width:6px;height:1px;background:var(--ink)}
.wk-tech{list-style:none;margin:auto 0 0;padding:14px 0 0;display:flex;flex-wrap:wrap;gap:6px}
.wk-tech .chip{height:26px;font-size:11.5px;padding:0 9px}
.wk-gh{margin-top:16px;align-self:flex-start}
.wk-ui{position:relative;margin:0;border-radius:18px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line);padding:26px 18px 18px;
  display:flex;align-items:center;clip-path:inset(0 100% 0 0 round 18px);animation:wipe 1.1s var(--ease) .25s forwards;min-width:0}
@keyframes wipe{to{clip-path:inset(0 0 0 0 round 18px)}}
.wk-ui-label{position:absolute;top:10px;right:14px;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--faint)}
.ui-win{width:100%;align-self:stretch;display:flex;flex-direction:column;justify-content:space-between;background:#fff;border-radius:12px;box-shadow:inset 0 0 0 1px var(--line),0 24px 40px -28px rgba(13,13,13,.35);overflow:hidden}
.ui-bar{display:flex;align-items:center;gap:5px;height:28px;padding:0 10px;border-bottom:1px solid var(--line)}
.ui-bar i{width:7px;height:7px;border-radius:50%;background:var(--soft)}
.ui-bar span{margin-left:10px;height:10px;flex:1;max-width:46%;border-radius:999px;background:var(--paper)}
.ui-portal{display:grid;grid-template-columns:52px 1fr;flex:1}
.ui-side{border-right:1px solid var(--line);padding:12px 10px;display:grid;gap:8px;align-content:start}
.ui-side span{height:8px;border-radius:4px;background:var(--soft)}
.ui-side span.on{background:var(--ink)}
.ui-main{padding:14px 16px;display:grid;gap:10px;align-content:start}
.ui-steps{display:flex;gap:8px;margin-bottom:4px}
.ui-steps span{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font:500 10px var(--font-mono);box-shadow:inset 0 0 0 1px var(--line);color:var(--mute)}
.ui-steps span.done{background:var(--ink);color:#fff;box-shadow:none}
.ui-field span{display:block;height:6px;border-radius:3px;background:var(--faint);opacity:.5;margin-bottom:5px}
.ui-field div{height:20px;border-radius:6px;box-shadow:inset 0 0 0 1px var(--line)}
.ui-btn{width:84px;height:22px;border-radius:999px;background:var(--ink);justify-self:end}
.ui-pipe{display:flex;gap:6px;padding:10px 12px;border-top:1px solid var(--line)}
.ui-pipe span{flex:1;text-align:center;font:500 10px var(--font-mono);padding:6px 0;border-radius:999px;background:var(--paper);color:var(--mute);
  animation:stage 4s var(--ease) infinite;animation-delay:calc(var(--k) * .6s)}
@keyframes stage{0%,12%{background:var(--paper);color:var(--mute)}18%,40%{background:var(--ink);color:#fff}55%,100%{background:var(--soft);color:var(--ink-2)}}
.ui-msg{display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:12px;align-items:center;padding:20px 14px;flex:1}
.ui-svc{display:grid;gap:8px}
.ui-node{display:flex;align-items:center;gap:7px;padding:8px;border-radius:8px;box-shadow:inset 0 0 0 1px var(--line)}
.ui-node b{width:12px;height:12px;border-radius:3px;background:var(--ink);flex:none}
.ui-node span{height:6px;flex:1;border-radius:3px;background:var(--soft)}
.ui-queue{display:grid;gap:6px}
.ui-q-label{font:500 10px var(--font-mono);color:var(--mute);text-align:center}
.ui-q-track{position:relative;height:30px;border-radius:999px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
.ui-q-track i{position:absolute;top:9px;left:-14px;width:12px;height:12px;border-radius:3px;background:var(--ink-2);
  animation:msg 2.8s linear infinite;animation-delay:calc(var(--k) * .7s)}
@keyframes msg{to{left:100%}}
.ui-log{padding:10px 14px 14px;border-top:1px solid var(--line);display:grid;gap:6px}
.ui-log span{height:6px;border-radius:3px;background:var(--soft);animation:logIn 3.2s var(--ease) infinite;animation-delay:calc(var(--k) * .4s)}
@keyframes logIn{0%{opacity:.3}30%{opacity:1}100%{opacity:.3}}
.ui-table{padding:10px 12px 12px;flex:1;display:flex;flex-direction:column}
.ui-table .ui-pager{margin-top:auto;padding-top:10px}
.ui-tr{display:flex;gap:4%;padding:9px 6px;border-bottom:1px solid var(--line);animation:rowIn .8s var(--ease) both;animation-delay:calc(.35s + var(--k,0) * 70ms)}
@keyframes rowIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
.ui-tr span{height:7px;border-radius:4px;background:var(--soft)}
.ui-th span{background:var(--ink-2);opacity:.75}
.ui-pager{display:flex;justify-content:flex-end;gap:4px;margin-top:10px}
.ui-pager span{min-width:22px;height:22px;display:grid;place-items:center;border-radius:6px;font:500 10px var(--font-mono);color:var(--mute);box-shadow:inset 0 0 0 1px var(--line)}
.ui-pager span.on{background:var(--ink);color:#fff;box-shadow:none}
@media (max-width:1100px){
  .wk-body{grid-template-columns:minmax(0,1fr);overflow:auto;min-width:min(620px,70vw)}
  .wk-ui{display:none}
}
@media (max-width:760px){
  .wk-row{flex-direction:column;height:auto}
  .wk-panel{flex:none}
  .wk-spine{position:relative;inset:auto;flex-direction:row;padding:20px 22px;justify-content:flex-start;gap:16px;text-align:left}
  .wk-panel.is-open .wk-spine{opacity:1;pointer-events:auto}
  .wk-panel.is-open .wk-plus{transform:rotate(45deg);background:var(--ink);color:#fff}
  .wk-spine-t{writing-mode:horizontal-tb;transform:none;font-size:20px;flex:1;white-space:normal}
  .wk-body{position:relative;inset:auto;min-width:0;padding:0 22px 22px;overflow:visible}
  .wk-title{display:none}
  .wk-kicker{margin-top:0}
  .wk-ui{display:flex;margin-top:18px}
  .wk-feats{grid-template-columns:minmax(0,1fr)}
}
`;
