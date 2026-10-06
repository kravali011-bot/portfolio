"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once (or while, if `once` is false) the element intersects the viewport. */
export function useInView<T extends Element>(
  options: IntersectionObserverInit & { once?: boolean } = {},
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { once = true, root, rootMargin, threshold } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, inView];
}

/**
 * Progress (0 → 1) of an element scrolling through the viewport.
 * `start`/`end` are viewport fractions: progress is 0 when the element top reaches
 * `start * innerHeight` and 1 when its bottom reaches `end * innerHeight`.
 * The callback runs inside rAF so it can write styles without re-rendering.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress: (p: number, el: T) => void,
  { start = 1, end = 0 }: { start?: number; end?: number } = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;

    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = r.top - vh * start;
      const total = r.height + vh * (start - end);
      const p = total <= 0 ? 1 : Math.min(1, Math.max(0, -from / total));
      cb.current(p, el);
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(measure);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      measure();
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [start, end]);

  return ref;
}
