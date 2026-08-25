"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { labelProjects } from "@/lib/data";
import { PageKicker } from "@/components/SectionBanner";

const filters = ["All", "LABEL", "ARTISTS", "MANAGEMENT", "CONTACTS"] as const;

function FilterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M2 4h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 4v0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="4" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 11h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="11" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 18h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="15" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 3h8v8H3V3z" fill="currentColor" opacity="0.95" />
      <path d="M11 3h8v8h-8V3z" fill="currentColor" opacity="0.95" />
      <path d="M3 11h8v8H3v-8z" fill="currentColor" opacity="0.95" />
      <path d="M11 11h8v8h-8v-8z" fill="currentColor" opacity="0.95" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M4 6h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 11h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 16h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

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
      {/* Desktop/tablet filter pills */}
      <div className="hidden bg-snow flex-wrap items-center gap-3 border-t border-mute px-5 pb-[76px] pt-3 lg:flex">
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

      {/* Mobile condensed toolbar (matches screenshot phone mode) */}
      <div className="relative flex items-center justify-between gap-4 bg-snow border-t border-mute px-5 py-3 lg:hidden">
        <div className="flex flex-row gap-2">
          <button
            type="button"
            aria-label="Open filters"
            onClick={() => setMobileFilterOpen((v) => !v)}
            className="text-ink"
          >
            <FilterIcon />
          </button>

          <button
            type="button"
            aria-label="Current filter"
            onClick={() => setMobileFilterOpen((v) => !v)}
            className={`inline-flex h-9 items-center rounded-full px-6 font-display text-[14px] font-medium uppercase tracking-[0.14px] bg-ink text-snow`}
          >
            {filter.toUpperCase()}
          </button>
        </div>

        <div className="flex items-center gap-3 text-ink">
          <button type="button" aria-label="Grid view (visual only)" className="opacity-100">
            <GridIcon />
          </button>
          <button type="button" aria-label="Menu (visual only)" className="opacity-100">
            <BurgerIcon />
          </button>
        </div>

        {mobileFilterOpen && (
          <div className="absolute left-0 top-[48px] w-full border border-mute bg-snow px-5 py-4">
            <div className="flex flex-wrap gap-3">
              {filters.map((item) => {
                const active = item === filter || (item === "LABEL" && filter === "All");
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFilter(item === "LABEL" ? "All" : item);
                      setMobileFilterOpen(false);
                    }}
                    className={`inline-flex h-9 items-center rounded-full px-5 font-display text-[14px] font-medium uppercase tracking-[0.14px] ${
                      active ? "bg-ink text-snow" : "bg-[#ececec] text-mute"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 px-2 lg:px-6 bg-snow">
        {labelProjects.map((project, index) => {
          const defaultLarge = index % 2 === 0;
          const showLarge = isDesktop ? (flipped[index] ? !defaultLarge : defaultLarge) : true;

          const card = (
            <>
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
            </>
          );

          return project.href ? (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="label-card relative block h-[524px] overflow-hidden bg-snow"
              onMouseEnter={isDesktop ? () => toggleMedia(index) : undefined}
            >
              {card}
            </a>
          ) : (
            <article
              key={project.name}
              className="label-card relative h-[524px] overflow-hidden bg-snow"
              onMouseEnter={isDesktop ? () => toggleMedia(index) : undefined}
            >
              {card}
            </article>
          );
        })}
      </div>
    </>
  );
}
