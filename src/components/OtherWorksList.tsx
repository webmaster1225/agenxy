"use client";

import { RollingText } from "./RollingText";
import { useListen } from "./ListenProvider";
import type { ListenTrack } from "@/lib/spotify";

export function OtherWorksList({ works }: { works: ListenTrack[] }) {
  const { open } = useListen();

  return (
    <div className="mt-4 divide-y divide-mute border-y border-mute">
      {works.map((work) => (
        <button
          key={work.title}
          type="button"
          onClick={() => open(work)}
          className="group flex w-full items-center justify-between py-4 text-left"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[40px] font-normal leading-none">
              <RollingText text={work.title} />
            </span>
            {work.year ? (
              <span className="text-[16px] leading-[19.2px] text-mute">{work.year}</span>
            ) : null}
          </div>
          <span className="text-[16px] leading-[19.2px] text-mute text-right lg:text-left">
            {work.artist}
          </span>
        </button>
      ))}
    </div>
  );
}
