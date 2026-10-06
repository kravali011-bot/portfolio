"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const soundBtn = useRef<HTMLButtonElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  // once the visitor explicitly mutes, never auto-unmute again
  const userMuted = useRef(false);
  const visible = useRef(true);

  const playWithSound = useCallback(async () => {
    const v = video.current;
    if (!v) return false;
    v.muted = false;
    try {
      await v.play();
      setSoundOn(true);
      setBlocked(false);
      return true;
    } catch {
      v.muted = true;
      setSoundOn(false);
      v.play().catch(() => {});
      return false;
    }
  }, []);

  // autoplay: try with sound, fall back to muted, unlock on first interaction
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    let cancelled = false;
    playWithSound().then((ok) => {
      if (!cancelled && !ok) setBlocked(true);
    });

    const unlock = (e: Event) => {
      if (soundBtn.current?.contains(e.target as Node)) return;
      if (userMuted.current || !visible.current) return;
      if (!v.muted) return;
      playWithSound();
    };
    const opts = { capture: true, passive: true } as const;
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("touchend", unlock, opts);
    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", unlock, opts);
      window.removeEventListener("keydown", unlock, opts);
      window.removeEventListener("touchend", unlock, opts);
    };
  }, [playWithSound]);

  // pause (and silence) the intro once less than 35 % of the hero is visible
  useEffect(() => {
    const el = section.current;
    const v = video.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio >= 0.35;
        if (visible.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    if (soundOn) {
      v.muted = true;
      userMuted.current = true;
      setSoundOn(false);
    } else {
      userMuted.current = false;
      playWithSound();
    }
  };

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToTarget(id);
  };

  const words = ["Senior", "Full", "Stack", "Java"];

  return (
    <section id="top" ref={section} className="hero" aria-labelledby="hero-title">
      <style>{css}</style>
      <p className="hero-ghost" aria-hidden="true">
        {PROFILE.firstName.toUpperCase()}
      </p>

      <div className="hero-grid wrap">
        <div className="hero-copy">
          <p className="tag hero-in" style={{ "--d": 0 } as CSSProperties}>
            <b>{PROFILE.name}</b> — {PROFILE.location}
          </p>
          <h1 id="hero-title" className="hero-title">
            {words.map((w, i) => (
              <span key={w} className="hero-line">
                <span style={{ "--d": i + 1 } as CSSProperties}>{w}</span>
              </span>
            ))}
            <span className="hero-line">
              <span style={{ "--d": 5 } as CSSProperties}>
                <em>Developer.</em>
              </span>
            </span>
          </h1>
          <p className="hero-sub hero-in" style={{ "--d": 6 } as CSSProperties}>
            {PROFILE.years} years designing, building, deploying and supporting enterprise web applications for
            healthcare and financial services.
          </p>
        </div>

        <figure className="hero-media">
          <video
            ref={video}
            className="hero-video"
            muted
            loop
            playsInline
            preload="auto"
            aria-label={`${PROFILE.name}, spoken introduction`}
            disablePictureInPicture
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
          <figcaption className="sr-only">
            Looping video of {PROFILE.name}, {PROFILE.role}, giving a short spoken introduction.
          </figcaption>
        </figure>

        <div className="hero-side">
          <div className="hero-ctas hero-in" style={{ "--d": 6 } as CSSProperties}>
            <a href="#work" onClick={go("work")} className="btn btn-primary">
              Explore work
            </a>
            <a href="#contact" onClick={go("contact")} className="btn btn-ghost">
              Let&rsquo;s talk
            </a>
            <a href={PROFILE.resume} download className="btn btn-ghost">
              Résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-sound hero-in" style={{ "--d": 7 } as CSSProperties}>
            <button
              ref={soundBtn}
              type="button"
              onClick={toggleSound}
              className={`sound-btn ${blocked && !soundOn ? "is-blocked" : ""}`}
              aria-label={soundOn ? "Mute introduction" : "Play introduction with sound"}
              aria-pressed={soundOn}
            >
              {soundOn ? (
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <rect x="3" y="2.5" width="3.4" height="11" rx="1" fill="currentColor" />
                  <rect x="9.6" y="2.5" width="3.4" height="11" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path d="M4.5 2.6v10.8c0 .5.5.8.9.5l8-5.4a.6.6 0 0 0 0-1L5.4 2.1c-.4-.3-.9 0-.9.5Z" fill="currentColor" />
                </svg>
              )}
            </button>
            <span className="mono hero-scroll" aria-hidden="true">
              Scroll ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.hero{position:relative;min-height:100svh;background:var(--paper);padding-top:84px;overflow:hidden;isolation:isolate}
.hero-ghost{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);margin:0;z-index:-1;white-space:nowrap;
  font-weight:800;letter-spacing:-.06em;line-height:.8;font-size:clamp(120px,27vw,440px);color:transparent;
  -webkit-text-stroke:1.2px rgba(13,13,13,.13);user-select:none;animation:ghostIn 1.8s var(--ease) both}
.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:end;gap:clamp(16px,2vw,32px);min-height:calc(100svh - 84px)}
.hero-copy{padding-bottom:clamp(32px,8vh,96px);position:relative;z-index:2}
.hero-title{margin:22px 0 0;font-weight:700;letter-spacing:-.045em;line-height:.95;font-size:clamp(44px,5.4vw,88px)}
.hero-title em{font-family:var(--font-serif);font-style:italic;font-weight:400;letter-spacing:-.02em;color:var(--mute)}
.hero-line{display:block;overflow:hidden;padding-bottom:.06em;margin-bottom:-.06em}
.hero-line>span{display:block;transform:translateY(105%);animation:lineUp 1.2s var(--ease) forwards;animation-delay:calc(var(--d) * 80ms + 150ms)}
.hero-sub{max-width:34ch;margin:26px 0 0;color:var(--ink-2);font-size:clamp(15px,1.15vw,17px)}
.hero-in{opacity:0;animation:fadeUp 1s var(--ease) forwards;animation-delay:calc(var(--d) * 80ms + 200ms)}
.hero-media{margin:0;height:min(96svh,1040px);aspect-ratio:768/960;max-width:min(52vw,100%);align-self:end;position:relative}
.hero-video{width:100%;height:100%;object-fit:cover;object-position:50% 100%;mix-blend-mode:multiply;
  opacity:0;animation:fadeIn 1.4s var(--ease) .1s forwards;
  -webkit-mask-image:linear-gradient(to bottom,transparent,#000 6%,#000 90%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 6%,#000 90%,transparent)}
.hero-side{display:flex;flex-direction:column;align-items:flex-end;gap:28px;padding-bottom:clamp(32px,8vh,96px);position:relative;z-index:2}
.hero-ctas{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px;max-width:360px}
.hero-sound{display:flex;align-items:center;gap:16px}
.hero-scroll{font-size:12px;color:var(--mute);letter-spacing:.06em;text-transform:uppercase}
.sound-btn{position:relative;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;
  transition:transform .5s var(--ease)}
.sound-btn:hover{transform:scale(1.07)}
.sound-btn.is-blocked::before,.sound-btn.is-blocked::after{content:"";position:absolute;inset:0;border-radius:50%;
  box-shadow:0 0 0 1px rgba(13,13,13,.5);animation:ping 2.2s var(--ease) infinite}
.sound-btn.is-blocked::after{animation-delay:1.1s}
@keyframes ping{from{transform:scale(1);opacity:.9}to{transform:scale(1.9);opacity:0}}
@keyframes lineUp{to{transform:none}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes fadeIn{to{opacity:1}}
@keyframes ghostIn{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}
@media (max-width:1100px){
  .hero-grid{grid-template-columns:minmax(0,1fr) auto}
  .hero-side{grid-column:1;align-items:flex-start;padding-bottom:clamp(32px,8vh,96px);margin-top:-12px}
  .hero-copy{padding-bottom:0;align-self:end}
  .hero-media{grid-column:2;grid-row:1 / span 2;height:min(88svh,900px);max-width:50vw}
  .hero-ctas{justify-content:flex-start}
}
@media (max-width:760px){
  .hero{padding-top:76px}
  .hero-grid{grid-template-columns:minmax(0,1fr);min-height:0;gap:0}
  .hero-media{grid-column:1;grid-row:2;height:62svh;max-width:100%;justify-self:center}
  .hero-copy{grid-row:1;padding-top:12px}
  .hero-side{grid-row:3;padding-top:20px;padding-bottom:48px;margin-top:0}
  .hero-ghost{top:52%;font-size:34vw}
  .hero-title{font-size:clamp(40px,11vw,60px)}
  .hero-sub{margin-top:16px}
}
`;
