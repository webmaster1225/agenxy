"use client";

import { useEffect, useState } from "react";

export function EpkHeroImage({ src, brightness = 100 }: { src: string; brightness?: number }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY * 0.18, 120));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ willChange: "transform", opacity: 1, transform: `translateY(${offset}px)` }}
    >
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
