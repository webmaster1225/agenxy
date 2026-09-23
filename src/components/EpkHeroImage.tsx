"use client";

import { useEffect, useRef } from "react";

/** The image drifts down at 0.18× scroll speed, up to 120px (matches `.epk-hero-parallax` in globals.css). */
const RATE = 0.18;
const MAX_OFFSET = 120;

export function EpkHeroImage({ src, brightness = 100 }: { src: string; brightness?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Where scroll-driven animations are supported the CSS runs the parallax in sync with scrolling;
    // this is the fallback. It writes the style directly, once per frame, instead of re-rendering.
    if (CSS.supports("animation-timeline: scroll()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.transform = `translate3d(0, ${Math.min(window.scrollY * RATE, MAX_OFFSET)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="epk-hero-parallax pointer-events-none absolute inset-0" style={{ willChange: "transform" }}>
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        style={{ minWidth: 5, minHeight: 5, backfaceVisibility: "hidden", perspective: 1000, transform: "translateZ(0)" }}
      >
        <div role="presentation" className="relative h-full w-full overflow-hidden">
          <div
            role="presentation"
            className="h-full w-full"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundSize: "contain",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              filter: `brightness(${brightness}%) grayscale(0%)`,
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
}
