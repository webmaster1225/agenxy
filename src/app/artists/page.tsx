"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { artistWorks } from "@/lib/data";

const filters = ["All", "Films/TV", "Commercial", "Stills"] as const;

function spacedLabel(label: string) {
  return label.split("").join(" ");
}

export default function ArtistsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = useMemo(
    () => artistWorks.filter((item) => filter === "All" || item.filter === filter),
    [filter]
  );

  return (
    <div className="bg-snow py-[140px]">
      <div className="px-4 pb-20 pt-20 text-center">
        <h1 className="font-display text-[clamp(56px,10vw,104px)] font-semibold uppercase leading-[1.1] tracking-[-4.16px]">
          Artists
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 pb-8 pt-4">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`font-display text-[14px] font-normal uppercase leading-none ${
              filter === item ? "underline decoration-ember decoration-2 underline-offset-[6px]" : ""
            }`}
          >
            {spacedLabel(item)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3">
        {items.map((item) => (
          <Link key={item.title} href="/artists/each-artists" className="group border-b border-r border-mute">
            <div className="aspect-[459/295] overflow-hidden bg-ink">
              {item.video ? (
                <video
                  src={item.video}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : item.image ? (
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="flex items-baseline justify-between gap-4 px-4 py-4">
              <h2 className="font-display text-[16px] font-medium leading-4">{item.title.toUpperCase()}</h2>
              <p className="font-sans text-[14px] font-medium leading-[19.6px] tracking-[-0.56px]">{item.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
