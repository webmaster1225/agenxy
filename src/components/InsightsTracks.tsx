"use client";

import { ListenTrigger } from "@/components/ListenProvider";

export type InsightTrackCard = {
  title: string;
  artist: string;
  year: string;
  badge: string;
  streams: string;
  playlists: string;
  chart?: string;
  image: string;
  href: string;
};

function TrackCard({
  track,
  className = "",
}: {
  track: InsightTrackCard;
  className?: string;
}) {
  return (
    <ListenTrigger
      title={track.title}
      artist={track.artist}
      year={track.year}
      href={track.href}
      className={`group flex flex-col border-b border-mute px-5 pb-8 pt-5 text-left transition-colors hover:bg-paper ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-h-[38.4px] min-w-0 flex-1 font-sans text-[16px] leading-[19.2px] text-mute">
          {track.artist}
        </p>
        <span
          className={`shrink-0 rounded-[4px] px-2 py-1 font-koulen text-[12px] leading-[12px] tracking-[-0.36px] text-snow ${
            track.badge === "Trending" ? "bg-ember" : "bg-blood"
          }`}
        >
          {track.badge}
        </span>
      </div>
      <div className="mt-4 aspect-square w-full overflow-hidden bg-ink/5">
        <img
          src={track.image}
          alt={track.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-5 font-koulen text-[24px] leading-[26.4px]">{track.title}</h3>
      <div className="mt-4 flex gap-6">
        <div>
          <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-mute">Streams</p>
          <p className="mt-1 font-koulen text-[22px] leading-none">{track.streams}</p>
        </div>
        <div>
          <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-mute">Playlists</p>
          <p className="mt-1 font-koulen text-[22px] leading-none">{track.playlists}</p>
        </div>
      </div>
    </ListenTrigger>
  );
}

export function InsightsTracks({
  featured,
  tracks,
  updatedAt,
  source,
}: {
  featured: InsightTrackCard;
  tracks: InsightTrackCard[];
  updatedAt?: string;
  source?: string;
}) {
  const updatedLabel = (() => {
    if (!updatedAt) return null;
    const date = new Date(updatedAt);
    if (Number.isNaN(date.getTime()) || date.getTime() === 0) return null;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  })();

  const mobileCards = [featured, ...tracks];

  return (
    <>
      {updatedLabel ? (
        <div className="flex items-center justify-between gap-4 border-b border-mute bg-snow px-5 py-3">
          <p className="font-sans text-[12px] uppercase tracking-[0.12em] text-mute">
            Live catalog stats
            {source && source !== "seed" ? ` · ${source}` : ""}
          </p>
          <p className="font-sans text-[12px] uppercase tracking-[0.12em] text-mute">
            Updated {updatedLabel}
          </p>
        </div>
      ) : null}

      {/* Mobile — featured uses same card UI in a 2×2 grid */}
      <div className="grid grid-cols-2 bg-snow lg:hidden">
        {mobileCards.map((track, index) => (
          <TrackCard
            key={track.title}
            track={track}
            className={index % 2 === 0 ? "border-r border-mute" : ""}
          />
        ))}
      </div>

      {/* Desktop — featured hero + 3-col track cards */}
      <ListenTrigger
        title={featured.title}
        artist={featured.artist}
        year={featured.year}
        href={featured.href}
        className="group relative hidden aspect-[1440/600] w-full overflow-hidden border-b border-mute bg-ink text-left text-snow lg:block lg:h-auto"
      >
        <img
          src={featured.image}
          alt={featured.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/20" />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-[16px] leading-[19.2px] text-snow/80">{featured.artist}</p>
              <p className="mt-1 font-koulen text-[27.2px] leading-[29.92px]">Catalog pulse</p>
            </div>
            <span className="rounded-[4px] bg-blood px-2 py-1 font-koulen text-[12px] leading-[12px] tracking-[-0.36px]">
              {featured.badge}
            </span>
          </div>
          <div>
            <h3 className="font-koulen text-[40px] leading-[44px] lg:text-[56px] lg:leading-[56px]">
              {featured.title}
            </h3>
            <div className="mt-5 grid max-w-xl grid-cols-3 gap-4 border-t border-snow/30 pt-4">
              <div>
                <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Streams</p>
                <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featured.streams}</p>
              </div>
              <div>
                <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Playlists</p>
                <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featured.playlists}</p>
              </div>
              <div>
                <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Chart</p>
                <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featured.chart}</p>
              </div>
            </div>
          </div>
        </div>
      </ListenTrigger>

      <div className="hidden bg-snow lg:grid lg:grid-cols-3">
        {tracks.map((track, index) => (
          <TrackCard
            key={track.title}
            track={track}
            className={index % 3 === 2 ? "" : "border-r border-mute"}
          />
        ))}
      </div>
    </>
  );
}
