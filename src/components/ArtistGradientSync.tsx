"use client";

import { useEffect } from "react";

const SELECTOR = ".text-artist-gradient";

function syncAll() {
  const width = document.documentElement.clientWidth || window.innerWidth;
  document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
    const { left } = el.getBoundingClientRect();
    el.style.backgroundSize = `${width}px 100%`;
    el.style.backgroundPosition = `${-left}px 0`;
  });
}

/** Keeps `.text-artist-gradient` sampling one viewport-wide blue→red wash regardless of text width. */
export function ArtistGradientSync() {
  useEffect(() => {
    syncAll();

    const onResize = () => syncAll();
    const onScroll = () => syncAll();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);

    const mo = new MutationObserver(() => syncAll());
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
      mo.disconnect();
    };
  }, []);

  return null;
}
