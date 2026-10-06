"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

/** Mounts Lenis once for the page. Skipped entirely for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis = instance;
    let raf = requestAnimationFrame(function loop(t) {
      instance.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

/** Smoothly scroll to a section id (or a pixel offset) and move focus there for keyboard users. */
export function scrollToTarget(target: string | number) {
  const smooth = prefersReducedMotion() ? "auto" : "smooth";
  if (typeof target === "number") {
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: smooth });
    return;
  }
  const el = document.getElementById(target);
  if (!el) return;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: smooth });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  history.replaceState(null, "", `#${target}`);
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
