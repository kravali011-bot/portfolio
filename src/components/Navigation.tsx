"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLUListElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  // scrolled state + top progress bar
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // active section
  useEffect(() => {
    const ids = ["top", ...NAV.map((n) => n.id), "certifications"];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          // certifications sits between Work and Experience; keep Work lit there
          setActive(id === "top" ? null : id === "certifications" ? "work" : id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // slide the ink indicator under the active link
  useIsoLayoutEffect(() => {
    const ind = indicator.current;
    const list = pill.current;
    if (!ind || !list) return;
    const place = () => {
      const link = active ? list.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
      if (!link) {
        ind.style.opacity = "0";
        return;
      }
      ind.style.opacity = "1";
      ind.style.width = `${link.offsetWidth}px`;
      ind.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // mobile overlay: Esc to close, lock scroll, manage focus
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const first = overlay.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && overlay.current) {
        const items = overlay.current.querySelectorAll<HTMLElement>("a, button");
        const a = items[0];
        const b = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const btn = menuBtn.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      btn?.focus();
    };
  }, [open]);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the overlay unlock scroll before scrolling
    requestAnimationFrame(() => scrollToTarget(id === "top" ? 0 : id));
  };

  return (
    <>
      <style>{css}</style>
      <div className="nav-progress" aria-hidden="true">
        <div ref={bar} />
      </div>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner wrap">
          <a href="#top" onClick={go("top")} className="nav-brand">
            <span className="nav-mark" aria-hidden="true">
              {PROFILE.initials}
            </span>
            <span className="nav-name">{PROFILE.name}</span>
            <span className="sr-only">, back to top</span>
          </a>

          <nav aria-label="Primary" className="nav-desktop">
            <ul ref={pill} className="nav-pill">
              <span ref={indicator} className="nav-ind" aria-hidden="true" />
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    data-id={n.id}
                    onClick={go(n.id)}
                    className={active === n.id ? "is-active" : ""}
                    aria-current={active === n.id ? "true" : undefined}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={menuBtn}
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <i aria-hidden="true" className={open ? "x" : ""} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={overlay}
        className={`nav-overlay ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="wrap nav-overlay-inner">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.id} style={{ "--i": i } as CSSProperties}>
                <a href={`#${n.id}`} onClick={go(n.id)}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="nav-overlay-foot mono">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <span>{PROFILE.location}</span>
          </p>
        </div>
      </div>
    </>
  );
}

const css = `
.nav-progress{position:fixed;inset:0 0 auto 0;height:2px;z-index:60;pointer-events:none}
.nav-progress>div{height:100%;background:var(--ink);transform:scaleX(0);transform-origin:0 50%}
.nav{position:fixed;inset:0 0 auto 0;z-index:50;padding-top:14px;pointer-events:none}
.nav-inner{display:flex;align-items:center;justify-content:space-between;gap:16px}
.nav-inner>*{pointer-events:auto}
.nav-brand{display:flex;align-items:center;gap:12px;border-radius:999px}
.nav-mark{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;letter-spacing:-.02em;
  box-shadow:inset 0 0 0 1.5px var(--ink);background:rgba(244,242,238,.6);transition:background .5s var(--ease),color .5s var(--ease),transform .9s var(--ease)}
.nav-brand:hover .nav-mark{transform:rotate(360deg)}
.nav.is-scrolled .nav-mark{background:var(--ink);color:#fff}
.nav-name{font-weight:600;letter-spacing:-.02em;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.nav.is-scrolled .nav-name{opacity:0;transform:translateX(-8px);pointer-events:none}
.nav-pill{position:relative;display:flex;gap:2px;padding:5px;border-radius:999px;list-style:none;margin:0;
  transition:background .5s var(--ease),box-shadow .5s var(--ease)}
.nav.is-scrolled .nav-pill{background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
  box-shadow:inset 0 0 0 1px var(--line),0 10px 30px -18px rgba(13,13,13,.35)}
.nav-pill a{position:relative;z-index:1;display:block;padding:9px 16px;border-radius:999px;font-size:14px;font-weight:500;color:var(--ink-2);
  transition:color .45s var(--ease)}
.nav-pill a:hover{color:var(--ink)}
.nav-pill a.is-active{color:#fff}
.nav-ind{position:absolute;left:0;top:5px;bottom:5px;border-radius:999px;background:var(--ink);opacity:0;
  transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s var(--ease)}
.nav-menu-btn{display:none;align-items:center;gap:10px;height:44px;padding:0 18px;border-radius:999px;background:var(--ink);color:#fff;
  font-size:14px;font-weight:500;position:relative;z-index:70}
.nav-menu-btn i{position:relative;width:14px;height:8px}
.nav-menu-btn i::before,.nav-menu-btn i::after{content:"";position:absolute;left:0;right:0;height:1.5px;background:currentColor;transition:transform .5s var(--ease),top .5s var(--ease)}
.nav-menu-btn i::before{top:0}.nav-menu-btn i::after{top:6.5px}
.nav-menu-btn i.x::before{top:3.25px;transform:rotate(45deg)}.nav-menu-btn i.x::after{top:3.25px;transform:rotate(-45deg)}
.nav-overlay{position:fixed;inset:0;z-index:45;background:var(--paper);clip-path:circle(0% at calc(100% - 50px) 36px);
  transition:clip-path .7s var(--ease),visibility 0s linear .7s;display:flex;align-items:flex-end;visibility:hidden}
.nav-overlay.is-open{clip-path:circle(150% at calc(100% - 50px) 36px);visibility:visible;transition:clip-path .8s var(--ease),visibility 0s}
.nav-overlay-inner{padding-bottom:40px;width:100%}
.nav-overlay ul{list-style:none;margin:0;padding:0}
.nav-overlay li{overflow:hidden;border-top:1px solid var(--line)}
.nav-overlay li a{display:flex;align-items:baseline;gap:18px;padding:14px 0;font-size:clamp(40px,12vw,64px);font-weight:700;letter-spacing:-.045em;line-height:1;
  transform:translateY(100%)}
.nav-overlay.is-open li a{animation:navIn .9s var(--ease) forwards;animation-delay:calc(120ms + var(--i) * 60ms)}
.nav-overlay li a span{font-size:12px;font-weight:400;letter-spacing:0;color:var(--mute)}
.nav-overlay-foot{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:28px;font-size:12px;color:var(--mute)}
@keyframes navIn{to{transform:none}}
@media (min-width:861px){.nav-overlay{display:none}}
@media (max-width:860px){
  .nav-desktop{display:none}
  .nav-menu-btn{display:inline-flex}
}
@media (max-width:420px){.nav-name{display:none}}
`;
