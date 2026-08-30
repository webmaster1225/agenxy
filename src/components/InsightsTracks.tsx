"use client";

import { featuredTrack, trackStats } from "@/lib/data";
import { ListenTrigger } from "@/components/ListenProvider";

export function InsightsTracks() {
  return (
    <>
      <ListenTrigger
        title={featuredTrack.title}
        artist={featuredTrack.artist}
        year={featuredTrack.year}
        href={featuredTrack.href}
        className="group relative block aspect-[1440/600] h-[100vw] w-full overflow-hidden border-b border-mute bg-ink text-left text-snow lg:h-auto"
      >
        <img
          src={featuredTrack.image}
          alt={featuredTrack.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/20" />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-sans text-[16px] leading-[19.2px] text-snow/80">{featuredTrack.artist}</p>
              <p className="mt-1 font-koulen text-[27.2px] leading-[29.92px]">Catalog pulse</p>
            </div>
            <span className="rounded-[4px] bg-blood px-2 py-1 font-koulen text-[12px] leading-[12px] tracking-[-0.36px]">
              {featuredTrack.badge}
            </span>
          </div>
          <div>
            <h3 className="font-koulen text-[40px] leading-[44px] lg:text-[56px] lg:leading-[56px]">
              {featuredTrack.title}
            </h3>
            <div className="mt-5 grid max-w-xl grid-cols-3 gap-4 border-t border-snow/30 pt-4">
              <div>
                <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Streams</p>
                <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featuredTrack.streams}</p>
              </div>
              <div>
                <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Playlists</p>
                <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featuredTrack.playlists}</p>
              </div>
              <div>
                <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Chart</p>
                <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featuredTrack.chart}</p>
              </div>
            </div>
          </div>
        </div>
      </ListenTrigger>

      <div className="grid grid-cols-1 bg-snow sm:grid-cols-2 lg:grid-cols-3">
        {trackStats.map((track) => (
          <ListenTrigger
            key={track.title}
            title={track.title}
            artist={track.artist}
            year={track.year}
            href={track.href}
            className="group flex flex-col border-b border-mute px-5 pb-8 pt-5 text-left transition-colors hover:bg-paper sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-sans text-[16px] leading-[19.2px] text-mute">{track.artist}</p>
              <span
                className={`rounded-[4px] px-2 py-1 font-koulen text-[12px] leading-[12px] tracking-[-0.36px] text-snow ${
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
        ))}
      </div>
    </>
  );
}
