"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { SKILL_GROUPS, rolesUsing, type Skill } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHead from "../ui/SectionHead";
import TechLogo, { brandTint, isBrand } from "../ui/TechLogo";

type Element = Skill & { n: number; family: string; short: string };

const ELEMENTS: Element[] = SKILL_GROUPS.flatMap((g) => g.skills.map((s) => ({ ...s, family: g.family, short: g.short }))).map(
  (s, i) => ({ ...s, n: i + 1 }),
);

export default function Skills() {
  const [filter, setFilter] = useState<string | null>(null);
  const [active, setActive] = useState<Element>(ELEMENTS[0]);
  const [gridRef, inView] = useInView<HTMLUListElement>({ threshold: 0.05 });
  const used = useMemo(() => rolesUsing(active), [active]);
  const tint = brandTint(active.logo);

  return (
    <section id="skills" className="section sk" aria-labelledby="skills-title">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead
          index="02"
          label="Skills"
          id="skills-title"
          lines={["The periodic table", "of my"]}
          accent="stack."
        >
          <p className="sk-intro rv" style={{ "--i": 2 } as CSSProperties}>
            Every entry from the Technical Skills section of my résumé: {ELEMENTS.length} elements across{" "}
            {SKILL_GROUPS.length} families. Hover, focus or tap one to inspect it.
          </p>
        </SectionHead>

        <div className="sk-filters rv" role="group" aria-label="Filter skills by family">
          <button className={`sk-chip ${filter === null ? "is-on" : ""}`} aria-pressed={filter === null} onClick={() => setFilter(null)}>
            All
          </button>
          {SKILL_GROUPS.map((g) => (
            <button
              key={g.family}
              className={`sk-chip ${filter === g.family ? "is-on" : ""}`}
              aria-pressed={filter === g.family}
              onClick={() => setFilter((f) => (f === g.family ? null : g.family))}
            >
              {g.family}
              <span className="mono">{g.skills.length}</span>
            </button>
          ))}
        </div>

        <div className="sk-layout">
          <ul ref={gridRef} className={`sk-grid ${inView ? "is-in" : ""}`} aria-label="Skills">
            {ELEMENTS.map((el, i) => {
              const dim = filter !== null && filter !== el.family;
              const style = {
                "--w8": Math.floor(i / 8) + (i % 8),
                "--w4": Math.floor(i / 4) + (i % 4),
              } as CSSProperties;
              return (
                <li key={el.n} style={style} className={`sk-cell ${dim ? "is-dim" : ""}`}>
                  <button
                    className={`sk-tile ${active.n === el.n ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(el)}
                    onFocus={() => setActive(el)}
                    onClick={() => setActive(el)}
                    aria-label={`${el.name}, ${el.family}`}
                    tabIndex={dim ? -1 : 0}
                  >
                    <span className="sk-n mono">{el.n}</span>
                    <span className="sk-sym">{el.symbol}</span>
                    <span className="sk-name">{el.name}</span>
                    <span className="sk-fam mono">{el.short}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside className="sk-insp card" aria-live="polite" aria-label="Skill inspector">
            <div className="sk-insp-top mono">
              <span>No. {String(active.n).padStart(3, "0")}</span>
              <span>{isBrand(active.logo) ? "Brand mark" : "Concept"}</span>
            </div>
            <div className="sk-logo" key={active.n}>
              {tint && <span className="sk-glow" style={{ background: tint }} aria-hidden="true" />}
              <TechLogo logo={active.logo} size={150} />
            </div>
            <p className="sk-insp-sym" aria-hidden="true">
              {active.symbol}
            </p>
            <h3 className="sk-insp-name">{active.name}</h3>
            <p className="sk-insp-fam mono">{active.family}</p>
            <div className="sk-insp-used">
              <p className="mono">Used in</p>
              {used.length ? (
                <ul>
                  {used.map((r) => (
                    <li key={r} className="chip">
                      {r}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="sk-insp-none">Listed under Technical Skills</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const css = `
.sk-intro{max-width:52ch;margin:24px 0 0;color:var(--mute)}
.sk-filters{display:flex;flex-wrap:wrap;gap:8px;margin:40px 0 28px}
.sk-chip{display:inline-flex;align-items:center;gap:8px;height:36px;padding:0 14px;border-radius:999px;font-size:13.5px;
  box-shadow:inset 0 0 0 1px rgba(13,13,13,.14);color:var(--ink-2);transition:background .4s var(--ease),color .4s var(--ease),box-shadow .4s var(--ease)}
.sk-chip .mono{font-size:10.5px;color:var(--faint);transition:color .4s var(--ease)}
.sk-chip:hover{box-shadow:inset 0 0 0 1px var(--ink)}
.sk-chip.is-on{background:var(--ink);color:#fff;box-shadow:inset 0 0 0 1px var(--ink)}
.sk-chip.is-on .mono{color:rgba(255,255,255,.6)}
.sk-layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:clamp(16px,2vw,28px);align-items:start}
.sk-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px}
.sk-cell{opacity:0;transform:translateY(14px) scale(.96);transition:opacity .7s var(--ease),transform .9s var(--ease),filter .5s var(--ease);
  transition-delay:calc(var(--w8) * 40ms)}
.sk-grid.is-in .sk-cell{opacity:1;transform:none}
.sk-grid.is-in .sk-cell.is-dim{opacity:.18;filter:grayscale(1);transition-delay:0ms}
.sk-tile{position:relative;display:flex;flex-direction:column;width:100%;aspect-ratio:1/1.08;padding:8px 9px;border-radius:12px;text-align:left;
  background:var(--card);box-shadow:inset 0 0 0 1px var(--line);transition:background .35s var(--ease),color .35s var(--ease),transform .5s var(--ease),box-shadow .5s var(--ease)}
.sk-tile:hover,.sk-tile.is-active{background:var(--ink);color:#fff;transform:translateY(-3px);box-shadow:0 16px 28px -18px rgba(13,13,13,.6)}
.sk-n{font-size:9.5px;color:var(--faint)}
.sk-sym{font-size:clamp(20px,2.1vw,30px);font-weight:700;letter-spacing:-.04em;line-height:1;margin-top:auto}
.sk-name{font-size:10.5px;line-height:1.2;margin-top:5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.4em}
.sk-fam{font-size:8.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--faint);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sk-tile:hover .sk-n,.sk-tile:hover .sk-fam,.sk-tile.is-active .sk-n,.sk-tile.is-active .sk-fam{color:rgba(255,255,255,.55)}
.sk-insp{position:sticky;top:96px;padding:22px;display:flex;flex-direction:column;min-height:520px;overflow:hidden}
.sk-insp-top{display:flex;justify-content:space-between;font-size:11px;color:var(--mute);letter-spacing:.04em;text-transform:uppercase}
.sk-logo{position:relative;height:190px;display:grid;place-items:center;margin-top:12px;color:var(--ink);animation:pop .7s var(--ease) both}
.sk-glow{position:absolute;width:150px;height:150px;border-radius:50%;filter:blur(40px);opacity:.22}
.sk-logo>img,.sk-logo>svg{position:relative}
@keyframes pop{from{opacity:0;transform:scale(.7) rotate(-6deg)}60%{opacity:1}to{opacity:1;transform:none}}
.sk-insp-sym{position:absolute;right:-10px;top:150px;margin:0;font-size:150px;font-weight:800;letter-spacing:-.06em;color:transparent;
  -webkit-text-stroke:1px rgba(13,13,13,.07);line-height:1;pointer-events:none}
.sk-insp-name{margin:18px 0 0;font-size:26px;font-weight:700;letter-spacing:-.035em;line-height:1.05}
.sk-insp-fam{margin:8px 0 0;font-size:11.5px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em}
.sk-insp-used{margin-top:auto;padding-top:20px;border-top:1px solid var(--line)}
.sk-insp-used>p.mono{margin:0 0 10px;font-size:10.5px;color:var(--mute);text-transform:uppercase;letter-spacing:.06em}
.sk-insp-used ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.sk-insp-none{margin:0;font-size:14px;color:var(--ink-2)}
@media (max-width:1100px){.sk-layout{grid-template-columns:minmax(0,1fr) 280px}.sk-grid{grid-template-columns:repeat(6,minmax(0,1fr))}}
@media (max-width:860px){
  .sk-layout{grid-template-columns:minmax(0,1fr)}
  .sk-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
  .sk-cell{transition-delay:calc(var(--w4) * 40ms)}
  /* compact inspector docked to the bottom of the viewport while browsing the grid */
  .sk-insp{order:2;position:sticky;top:auto;bottom:12px;min-height:0;padding:14px 16px;display:grid;
    grid-template-columns:72px minmax(0,1fr);column-gap:14px;align-items:center;box-shadow:var(--shadow-lift);z-index:5}
  .sk-insp-top,.sk-insp-sym{display:none}
  .sk-logo{grid-row:1 / span 3;height:72px;margin:0}
  .sk-logo>img,.sk-logo>svg{width:56px!important;height:56px!important}
  .sk-glow{width:60px;height:60px;filter:blur(18px)}
  .sk-insp-name{margin:0;font-size:18px}
  .sk-insp-fam{margin:2px 0 0;font-size:10px}
  .sk-insp-used{margin:8px 0 0;padding-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .sk-insp-used>p.mono{margin:0}
  .sk-insp-used .chip{height:24px;font-size:11.5px;padding:0 9px}
  .sk-insp-none{font-size:12px}
}
`;
