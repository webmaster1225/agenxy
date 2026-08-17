"use client";

import Link from "next/link";
import { useState } from "react";
import { labelProjects } from "@/lib/data";
import { PageKicker } from "@/components/SectionBanner";

const filters = ["All", "LABEL", "ARTISTS", "MANAGEMENT", "CONTACTS"] as const;

function LabelProjectMedia({ project }: { project: (typeof labelProjects)[number] }) {
  const mediaClass = "h-full w-full object-cover object-top object-right";

  if (project.video) {
    return <video src={project.video} className={mediaClass} autoPlay muted loop playsInline />;
  }

  if (project.image) {
    return <img src={project.image} alt={project.name} className={mediaClass} />;
  }

  return null;
}

export default function LabelPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [flipped, setFlipped] = useState<boolean[]>(() => labelProjects.map(() => false));

  const toggleMedia = (index: number) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <>
      <PageKicker left="LABEL" right="AGENXY® 2026 All Rights Reserved." />
      <div className="bg-snow flex flex-wrap items-center gap-3 border-y border-mute px-5 pb-[76px] pt-3">
        {filters.map((item) => {
          const href =
            item === "All" || item === "LABEL"
              ? "/label"
              : item === "ARTISTS"
                ? "/artists"
                : item === "MANAGEMENT"
                  ? "/management"
                  : "/contact-us";
          const active = item === filter || (item === "LABEL" && filter === "All");
          const pill = (
            <span
              className={`inline-flex h-9 items-center rounded-full px-5 font-display text-[14px] font-medium uppercase tracking-[0.14px] ${
                active ? "bg-ink text-snow" : "bg-[#ececec] text-mute"
              }`}
            >
              {item}
            </span>
          );

          return item === "All" || item === "LABEL" ? (
            <button key={item} onClick={() => setFilter(item === "LABEL" ? "All" : item)}>
              {pill}
            </button>
          ) : (
            <Link key={item} href={href}>
              {pill}
            </Link>
          );
        })}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {labelProjects.map((project, index) => {
          const defaultLarge = index % 2 === 0;
          const showLarge = flipped[index] ? !defaultLarge : defaultLarge;

          return (
            <article
              key={project.name}
              className="label-card relative h-[524px] overflow-hidden border-b border-r border-mute bg-snow"
              onMouseEnter={() => toggleMedia(index)}
            >
              <div className="relative z-0 flex h-full flex-col justify-between px-[30px] py-4">
                <div className="flex flex-1 items-center">
                  <div>
                    <h2 className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
                      {project.name}
                    </h2>
                    <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px] text-mist">
                      {project.category}
                    </p>
                  </div>
                </div>
                <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
                  {project.year}
                </p>
              </div>

              <div
                className="label-card-media pointer-events-none"
                style={{
                  width: showLarge ? "100%" : "50%",
                  height: showLarge ? 524 : 262,
                }}
              >
                <LabelProjectMedia project={project} />
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
