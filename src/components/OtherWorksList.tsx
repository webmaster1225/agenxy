"use client";

import { useEffect, useId, useState } from "react";
import { RollingText } from "./RollingText";

type Work = {
  title: string;
  year: string;
  artist: string;
  href: string;
};

function toSpotifyEmbedUrl(href: string) {
  try {
    const url = new URL(href);
    if (!url.hostname.includes("spotify.com")) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const type = parts[0];
    const id = parts[1]?.split("?")[0];
    if (!type || !id) return null;
    if (!["track", "album", "playlist", "episode", "show", "artist"].includes(type)) {
      return null;
    }
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

function isAlbumEmbed(embedUrl: string) {
  return embedUrl.includes("/embed/album/");
}

function CloseMark() {
  return (
    <span className="relative block h-5 w-5" aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rotate-45 bg-current" />
      <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 -rotate-45 bg-current" />
    </span>
  );
}

export function OtherWorksList({ works }: { works: Work[] }) {
  const [active, setActive] = useState<Work | null>(null);
  const titleId = useId();
  const embedUrl = active ? toSpotifyEmbedUrl(active.href) : null;
  const album = embedUrl ? isAlbumEmbed(embedUrl) : false;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="mt-4 divide-y divide-mute border-y border-mute">
        {works.map((work) => (
          <button
            key={work.title}
            type="button"
            onClick={() => setActive(work)}
            className="group flex w-full items-center justify-between py-4 text-left"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[40px] font-normal leading-none">
                <RollingText text={work.title} />
              </span>
              <span className="text-[16px] leading-[19.2px] text-mute">{work.year}</span>
            </div>
            <span className="text-[16px] leading-[19.2px] text-mute text-right lg:text-left">
              {work.artist}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="listen-veil fixed inset-0 z-[90] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setActive(null)}
        >
          <div className="listen-bloom pointer-events-none absolute inset-0" aria-hidden="true" />

          <div
            className={`listen-bubble relative w-full text-ink ${album ? "max-w-[420px]" : "max-w-[380px]"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="listen-bubble-shell relative overflow-hidden rounded-[48px] sm:rounded-[56px]">
              <div className="listen-bubble-shine pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="listen-bubble-rim pointer-events-none absolute inset-[1px] rounded-[47px] sm:rounded-[55px]" aria-hidden="true" />

              <div className="relative px-6 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-mute">
                      Now listening
                    </p>
                    <h4
                      id={titleId}
                      className="mt-3 font-koulen text-[34px] leading-[0.95] tracking-[-0.02em] sm:text-[40px]"
                    >
                      {active.title}
                    </h4>
                    <p className="mt-3 font-display text-[15px] font-medium uppercase tracking-[0.04em]">
                      {active.artist}
                      <span className="mx-2 text-mute">·</span>
                      <span className="text-mute">{active.year}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="listen-close mt-1 flex h-11 w-11 shrink-0 items-center justify-center text-ink/55 transition-colors hover:text-ink"
                    aria-label="Close player"
                  >
                    <CloseMark />
                  </button>
                </div>

                <div className="listen-well mt-6 overflow-hidden rounded-[28px] sm:rounded-[32px]">
                  {embedUrl ? (
                    <iframe
                      key={embedUrl}
                      title={`${active.title} on Spotify`}
                      src={embedUrl}
                      className="block w-full border-0"
                      style={{ height: album ? 352 : 152 }}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  ) : (
                    <div className="px-5 py-10 text-center">
                      <p className="font-sans text-[15px] leading-[1.4] text-mute">
                        This release can&apos;t be played here.
                      </p>
                      <a
                        href={active.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block font-koulen text-[16px] leading-none text-ember"
                      >
                        Open externally
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 px-1">
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
                    Agenxy catalog
                  </span>
                  <span className="listen-pulse h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
