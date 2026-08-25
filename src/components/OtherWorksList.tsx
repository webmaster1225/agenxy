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

export function OtherWorksList({ works }: { works: Work[] }) {
  const [active, setActive] = useState<Work | null>(null);
  const titleId = useId();
  const embedUrl = active ? toSpotifyEmbedUrl(active.href) : null;

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
          className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/55 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-xl overflow-hidden border border-mute bg-snow text-ink shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-mute px-5 py-4">
              <div>
                <p className="font-sans text-[14px] leading-[16.8px] text-mute">{active.artist}</p>
                <h4 id={titleId} className="mt-1 font-koulen text-[28px] leading-[30.8px]">
                  {active.title}
                </h4>
                <p className="mt-1 font-sans text-[14px] leading-[16.8px] text-mute">{active.year}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="shrink-0 px-1 py-1 font-koulen text-[14px] leading-none text-mute transition-colors hover:text-ink"
                aria-label="Close player"
              >
                CLOSE
              </button>
            </div>

            <div className="bg-ink p-3 sm:p-4">
              {embedUrl ? (
                <iframe
                  key={embedUrl}
                  title={`${active.title} on Spotify`}
                  src={embedUrl}
                  className="w-full rounded-md border-0"
                  style={{ height: isAlbumEmbed(embedUrl) ? 352 : 152 }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                <div className="px-2 py-8 text-center text-snow">
                  <p className="font-sans text-[16px] leading-[19.2px] text-snow/70">
                    This release can&apos;t be embedded here.
                  </p>
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block font-koulen text-[18px] leading-none text-ember underline-offset-4 hover:underline"
                  >
                    Open externally
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
