"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  isAlbumEmbed,
  isSpotifyRelease,
  toSpotifyEmbedUrl,
  type ListenTrack,
} from "@/lib/spotify";

type ListenContextValue = {
  open: (track: ListenTrack) => void;
  close: () => void;
};

const ListenContext = createContext<ListenContextValue | null>(null);

function CloseMark() {
  return (
    <span className="relative block h-5 w-5" aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rotate-45 bg-current" />
      <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 -rotate-45 bg-current" />
    </span>
  );
}

function ListenBubble({ track, onClose }: { track: ListenTrack; onClose: () => void }) {
  const titleId = useId();
  const embedUrl = toSpotifyEmbedUrl(track.href);
  const album = embedUrl ? isAlbumEmbed(embedUrl) : false;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="listen-veil fixed inset-0 z-[90] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className="listen-bloom pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        className={`listen-bubble relative w-full text-ink ${album ? "max-w-[420px]" : "max-w-[380px]"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="listen-bubble-shell relative overflow-hidden rounded-[48px] sm:rounded-[56px]">
          <div className="listen-bubble-shine pointer-events-none absolute inset-0" aria-hidden="true" />
          <div
            className="listen-bubble-rim pointer-events-none absolute inset-[1px] rounded-[47px] sm:rounded-[55px]"
            aria-hidden="true"
          />

          <div className="relative px-6 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-mute">Now listening</p>
                <h4
                  id={titleId}
                  className="mt-3 font-koulen text-[34px] leading-[0.95] tracking-[-0.02em] sm:text-[40px]"
                >
                  {track.title}
                </h4>
                <p className="mt-3 font-display text-[15px] font-medium uppercase tracking-[0.04em]">
                  {track.artist}
                  {track.year ? (
                    <>
                      <span className="mx-2 text-mute">·</span>
                      <span className="text-mute">{track.year}</span>
                    </>
                  ) : null}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
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
                  title={`${track.title} on Spotify`}
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
                    href={track.href}
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
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">Agenxy catalog</span>
              <span className="listen-pulse h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListenProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ListenTrack | null>(null);
  const close = useCallback(() => setActive(null), []);
  const open = useCallback((track: ListenTrack) => setActive(track), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ListenContext.Provider value={value}>
      {children}
      {active ? <ListenBubble track={active} onClose={close} /> : null}
    </ListenContext.Provider>
  );
}

export function useListen() {
  const ctx = useContext(ListenContext);
  if (!ctx) throw new Error("useListen must be used within ListenProvider");
  return ctx;
}

export function ListenTrigger({
  title,
  artist,
  year,
  href,
  className,
  children,
}: ListenTrack & {
  className?: string;
  children: ReactNode;
}) {
  const { open } = useListen();

  if (!isSpotifyRelease(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => open({ title, artist, year, href })}
    >
      {children}
    </button>
  );
}
