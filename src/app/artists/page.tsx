"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { artists } from "@/lib/data";

const filters = ["All", "Artists"] as const;

function spacedLabel(label: string) {
  return label.split("").join(" ");
}

export default function ArtistsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = useMemo(
    () => artists.filter((item) => filter === "All" || filter === "Artists" || item.filter === filter),
    [filter]
  );

  return (
    <div className="bg-snow py-32">
      <div className="px-4 text-center">
        <h1 className="font-display text-[clamp(104px,10vw,104px)] font-semibold uppercase leading-[1.1] tracking-[-4.16px]">
          Artists
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 pb-16 pt-4">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`font-display text-[14px] font-normal uppercase leading-none tracking-[-2px] ${
              filter === item ? "underline decoration-ember decoration-2 underline-offset-[6px]" : ""
            }`}
          >
            {spacedLabel(item)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 px-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group"
          >
            <div className="aspect-[459/295] overflow-hidden bg-ink">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-[16px] font-medium leading-4">{item.title.toUpperCase()}</h2>
              <p className="font-sans text-[14px] font-medium leading-[19.6px] tracking-[-0.56px]">{item.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
