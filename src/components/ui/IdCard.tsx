"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { EDUCATION, PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";

/** Deterministic barcode widths derived from the name. */
function bars(seed: string) {
  const out: number[] = [];
  for (let i = 0; i < 46; i++) out.push(((seed.charCodeAt(i % seed.length) * (i + 7)) % 4) + 1);
  return out;
}

/**
 * Lanyard ID card. The whole rig (strap + clip + card) hangs from a pivot at the top of the
 * column and swings like a damped pendulum driven by pointer velocity, with a faint idle sway.
 */
export default function IdCard({ zone }: { zone: React.RefObject<HTMLElement | null> }) {
  const rig = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef<string>("mouse");

  useEffect(() => {
    const el = rig.current;
    const area = zone.current;
    if (!el || !area || prefersReducedMotion()) return;

    let angle = 0;
    let vel = 0;
    let lastX: number | null = null;
    let lastT = 0;
    let lastMove = 0;
    let raf = 0;
    let running = false;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const idle = now - lastMove > 1400;
      const target = idle ? Math.sin(now / 1500) * 1.4 : 0;
      // spring toward target with damping
      const acc = -38 * (angle - target) - 3.4 * vel;
      vel += acc * dt;
      angle += vel * dt;
      angle = Math.max(-12, Math.min(12, angle));
      el.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      if (running) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: globalThis.PointerEvent) => {
      const now = performance.now();
      if (lastX !== null && now - lastT < 80) {
        const vx = (e.clientX - lastX) / Math.max(1, now - lastT); // px per ms
        vel += Math.max(-4, Math.min(4, vx)) * 4.5;
      }
      lastX = e.clientX;
      lastT = now;
      lastMove = now;
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(area);
    area.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      area.removeEventListener("pointermove", onMove);
    };
  }, [zone]);

  const onPointerUp = (e: PointerEvent) => {
    lastPointer.current = e.pointerType;
  };
  const onClick = () => {
    // mouse users flip by hovering; touch & pen users flip by tapping
    if (lastPointer.current !== "mouse") setFlipped((f) => !f);
  };

  const strapText = `${PROFILE.name} · ${PROFILE.role} · `.toUpperCase();
  const degree = EDUCATION[0];

  return (
    <div className="lan">
      <div ref={rig} className="lan-rig">
        <div className="lan-strap" aria-hidden="true">
          <div className="lan-strap-text">
            <span>{strapText.repeat(4)}</span>
            <span>{strapText.repeat(4)}</span>
          </div>
        </div>
        <div className="lan-clip" aria-hidden="true">
          <i />
        </div>
        <div className={`idc ${flipped ? "is-flipped" : ""}`} onPointerUp={onPointerUp} onClick={onClick}>
          <div className="idc-inner">
            {/* Front */}
            <div className="idc-face idc-front" aria-hidden={flipped}>
              <div className="idc-band">
                <span>DEVELOPER ID</span>
                <span className="mono">{PROFILE.initials}</span>
              </div>
              <div className="idc-photo">
                <div className="idc-photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/portrait-bust.webp" width={128} height={156} alt={`Portrait of ${PROFILE.name}`} loading="lazy" />
                </div>
              </div>
              <p className="idc-name">{PROFILE.name}</p>
              <p className="idc-role">{PROFILE.role}</p>
              <dl className="idc-rows mono">
                <div>
                  <dt>Exp.</dt>
                  <dd>{PROFILE.years} years</dd>
                </div>
                <div>
                  <dt>Dept.</dt>
                  <dd>Full Stack · Java</dd>
                </div>
                <div>
                  <dt>Based</dt>
                  <dd>{PROFILE.location}</dd>
                </div>
              </dl>
              <div className="idc-foot" aria-hidden="true">
                <div className="idc-barcode">
                  {bars(PROFILE.name).map((w, i) => (
                    <i key={i} style={{ width: w, opacity: i % 3 === 0 ? 0.55 : 1 }} />
                  ))}
                </div>
                <div className="idc-holo" />
              </div>
            </div>

            {/* Back */}
            <div className="idc-face idc-back" aria-hidden={!flipped}>
              <div className="idc-band">
                <span>WHAT I AM</span>
                <span className="mono">↺</span>
              </div>
              <ul className="idc-list">
                <li>
                  {PROFILE.role}, {PROFILE.years} years
                </li>
                <li>
                  B.S. Computer Science &amp; Engineering, JNTU, {degree.year}
                </li>
                <li>Post Graduate Program in AI &amp; ML, UT Austin</li>
                <li>AWS Solutions Architect – Associate · Oracle Java SE 8 Programmer</li>
                <li>Enterprise apps for healthcare &amp; financial services</li>
              </ul>
              <div className="idc-sign">
                <span>{PROFILE.name}</span>
                <small className="mono">Holder&rsquo;s signature</small>
              </div>
              <p className="idc-found mono">
                If found, say hello · <br />
                {PROFILE.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="idc-flipbtn"
            aria-pressed={flipped}
            onClick={(e) => {
              e.stopPropagation();
              setFlipped((f) => !f);
            }}
          >
            {flipped ? "Show front of ID card" : "Flip ID card"}
          </button>
        </div>
      </div>
      <style>{css}</style>
    </div>
  );
}

const css = `
.lan{position:relative;height:100%;min-height:640px;display:flex;justify-content:center}
.lan-rig{position:absolute;top:calc(var(--section-pad) * -1);left:50%;margin-left:-150px;width:300px;display:flex;flex-direction:column;align-items:center;
  transform-origin:50% 0;will-change:transform;bottom:auto}
.lan-strap{width:30px;height:calc(var(--section-pad) + 140px);min-height:56px;background:#1b1b1b;overflow:hidden;position:relative;
  box-shadow:inset 1px 0 0 rgba(255,255,255,.08),inset -1px 0 0 rgba(0,0,0,.4)}
.lan-strap::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.035) 3px 4px)}
.lan-strap-text{position:absolute;left:50%;top:0;writing-mode:vertical-rl;transform:translateX(-50%);display:flex;flex-direction:column;
  font-family:var(--font-mono);font-size:9px;letter-spacing:.24em;color:rgba(255,255,255,.62);white-space:nowrap;animation:strapScroll 26s linear infinite}
.lan-strap-text span{display:block}
@keyframes strapScroll{to{transform:translate(-50%,-50%)}}
.lan-clip{width:42px;height:34px;position:relative;margin-top:-2px;display:flex;justify-content:center}
.lan-clip::before{content:"";position:absolute;top:0;width:36px;height:14px;border-radius:4px 4px 6px 6px;
  background:linear-gradient(180deg,#e8e8e8,#9b9b9b 55%,#cfcfcf);box-shadow:0 1px 2px rgba(0,0,0,.35),inset 0 1px 0 #fff}
.lan-clip i{position:absolute;top:12px;width:16px;height:22px;border:3px solid #a8a8a8;border-top:0;border-radius:0 0 10px 10px;
  box-shadow:0 1px 1px rgba(0,0,0,.2)}
.idc{position:relative;width:300px;height:404px;perspective:1400px;margin-top:-6px;cursor:pointer;border-radius:22px}
.idc-flipbtn{position:absolute;left:50%;bottom:-52px;transform:translateX(-50%);height:36px;padding:0 16px;border-radius:999px;background:var(--ink);color:#fff;
  font-size:13px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .3s var(--ease)}
.idc-flipbtn:focus-visible{opacity:1;pointer-events:auto}
.idc-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 1s var(--ease)}
.idc.is-flipped .idc-inner{transform:rotateY(180deg)}
@media (hover:hover) and (pointer:fine){
  .idc:hover .idc-inner{transform:rotateY(180deg);transition-delay:.35s}
  .idc.is-flipped:hover .idc-inner{transform:rotateY(0deg)}
}
.idc-face{position:absolute;inset:0;border-radius:22px;background:#fff;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden;
  box-shadow:inset 0 0 0 1px var(--line),0 40px 70px -34px rgba(13,13,13,.4),0 14px 26px -18px rgba(13,13,13,.2);display:flex;flex-direction:column;align-items:center}
.idc-back{transform:rotateY(180deg);align-items:stretch}
.idc-band{width:100%;height:46px;flex:none;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 18px;
  font-size:11px;font-weight:600;letter-spacing:.22em}
.idc-band .mono{letter-spacing:0;font-size:11px;opacity:.6}
.idc-photo{margin-top:18px;position:relative;padding:4px;border-radius:20px;background:linear-gradient(150deg,#d9d6d0,#8f8c86 45%,#efede9 70%,#a9a6a0)}
.idc-photo::before{content:"";position:absolute;inset:-16px;border-radius:30px;background:radial-gradient(closest-side,rgba(13,13,13,.10),transparent);z-index:-1}
.idc-photo-frame{width:128px;height:156px;border-radius:16px;overflow:hidden;background:var(--soft)}
.idc-photo img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.05);transition:transform .9s var(--ease)}
.idc:hover .idc-photo img,.idc:focus-within .idc-photo img{transform:scale(1.08)}
.idc-name{margin:10px 0 0;font-weight:700;font-size:19px;line-height:1.2;letter-spacing:-.03em}
.idc-role{margin:1px 0 0;font-size:12px;line-height:1.3;color:var(--mute)}
.idc-rows{margin:8px 0 0;width:calc(100% - 44px);font-size:10.5px;line-height:1.4}
.idc-rows div{display:flex;justify-content:space-between;padding:3px 0;border-top:1px dashed var(--line)}
.idc-rows dt{color:var(--mute)}.idc-rows dd{margin:0}
.idc-foot{margin-top:auto;width:100%;padding:8px 22px 14px;display:flex;align-items:flex-end;justify-content:space-between}
.idc-barcode{display:flex;gap:1.5px;height:24px}
.idc-barcode i{display:block;height:100%;background:var(--ink)}
.idc-holo{width:34px;height:34px;border-radius:50%;background:conic-gradient(from 0deg,#f4f4f4,#a9a9a9,#e9e9e9,#7a7a7a,#f2f2f2,#bdbdbd,#f4f4f4);
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);animation:holo 6s linear infinite;opacity:.9}
@keyframes holo{to{transform:rotate(360deg)}}
.idc-list{list-style:none;margin:0;padding:18px 22px 0;display:grid;gap:9px;counter-reset:w}
.idc-list li{counter-increment:w;display:grid;grid-template-columns:22px 1fr;font-size:12.5px;line-height:1.4;color:var(--ink-2)}
.idc-list li::before{content:counter(w,decimal-leading-zero);font-family:var(--font-mono);font-size:10px;color:var(--faint);padding-top:2px}
.idc-sign{margin:auto 22px 0;padding-top:10px;display:flex;flex-direction:column;border-bottom:1px solid var(--ink)}
.idc-sign span{font-family:var(--font-serif);font-style:italic;font-size:30px;line-height:1.1;letter-spacing:-.01em;transform:rotate(-3deg);transform-origin:0 100%}
.idc-sign small{font-size:9px;color:var(--mute);letter-spacing:.1em;text-transform:uppercase;padding:4px 0}
.idc-found{margin:10px 22px 18px;font-size:10px;color:var(--mute);line-height:1.5}
@media (max-width:1024px){
  .lan{min-height:530px}
  .lan-rig{top:0}
  .lan-strap{height:96px}
}
`;
