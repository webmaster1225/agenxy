"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { assets } from "@/lib/data";
import { RollingText } from "./RollingText";
import { useMenu } from "./MenuProvider";

const navLinks = [
  { href: "/label", label: "Label" },
  { href: "/management", label: "Management" },
  { href: "/artists", label: "Artists" },
  { href: "/contact-us", label: "Contacts" },
] as const;

function Stack({ images, round = false }: { images: string[]; round?: boolean }) {
  return (
    <div className="flex items-center">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`h-7 w-7 object-cover md:h-8 md:w-8 ${round ? "rounded-full" : "rounded-[4.54px]"} ${
            i ? "-ml-2.5" : ""
          } ring-1 ring-snow`}
        />
      ))}
    </div>
  );
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      className="flex h-full w-full flex-col items-center justify-center gap-[6px]"
    >
      <span className={`h-[3px] w-6 bg-ink transition ${open ? "translate-y-[4.5px] rotate-45" : ""}`} />
      <span className={`h-[3px] w-6 bg-ink transition ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`} />
    </button>
  );
}

export function Header() {
  const { open, toggle } = useMenu();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const height = compact
      ? styles.getPropertyValue("--header-compact").trim()
      : styles.getPropertyValue("--header-expanded").trim();
    root.style.setProperty("--header-current", height);
  }, [compact]);

  useEffect(() => {
    const COMPACT_AT = 48;
    const EXPAND_AT = 16;

    const onScroll = () => {
      const y = window.scrollY;
      setCompact((prev) => {
        if (y >= COMPACT_AT) return true;
        if (y <= EXPAND_AT) return false;
        return prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header border-b border-mute bg-snow ${compact ? "is-compact" : ""}`}>
      <div className="header-grid hidden h-full lg:grid">
        <div className="header-cell header-brand relative flex min-w-0 flex-col justify-between border-r border-mute px-4 py-4 xl:px-5 xl:py-5">
          <p className="header-meta truncate font-sans text-[14px] leading-tight text-ink md:text-[16px]">
            Digital Agency
          </p>
          <div className="header-mark absolute left-4 top-[42%] flex h-14 w-14 -translate-y-1/2 items-center justify-center bg-ink xl:left-5 xl:h-[72px] xl:w-[72px]">
            <span className="font-koulen text-[40px] leading-none tracking-[-2.8px] text-snow xl:text-[56px]">X</span>
          </div>
          <Link
            href="/"
            className="header-logo group relative z-10 min-w-0 font-display text-[clamp(28px,3.2vw,40px)] font-normal leading-none"
          >
            <RollingText text="AGENXY" />
          </Link>
        </div>

        {navLinks.map((link, i) => {
          const meta = [
            {
              kicker: "Our Works:",
              stack: <Stack images={[assets.workA, assets.workB, assets.workC]} />,
              count: "+56",
            },
            {
              kicker: "Our Team:",
              stack: <Stack images={[assets.avatarA, assets.avatarB]} round />,
              count: "+35",
            },
            {
              kicker: "We Work With:",
              stack: <Stack images={[assets.artistA, assets.artistB]} />,
              count: "+5",
            },
            {
              kicker: "Reach Out To Us:",
              stack: null,
              count: null,
              contact: (
                <>
                  <p className="truncate text-[14px] leading-tight md:text-[16px]">contact@agenxy.com</p>
                  <p className="text-[12px] leading-tight md:text-[14px]">1 (415) 570-2791</p>
                </>
              ),
            },
          ][i];

          return (
            <Link
              key={link.href}
              href={link.href}
              className="header-cell group relative flex min-w-0 flex-col justify-between border-r border-mute px-4 py-4 xl:px-5 xl:py-5"
            >
              <div className="header-meta min-w-0">
                <p className="truncate text-[14px] leading-tight text-mute md:text-[16px]">{meta.kicker}</p>
                <div className="header-meta-body mt-auto pt-[min(170px,38%)]">
                  {meta.contact ? (
                    meta.contact
                  ) : (
                    <div className="flex min-w-0 items-center gap-2">
                      {meta.stack}
                      <span className="shrink-0 text-[14px] text-mute md:text-[16px]">{meta.count}</span>
                    </div>
                  )}
                </div>
              </div>
              <span className="header-nav-label min-w-0 truncate font-display text-[clamp(16px,1.8vw,24px)] font-normal leading-none">
                <RollingText text={link.label} />
              </span>
            </Link>
          );
        })}

        <div className="header-menu flex min-w-0 items-stretch justify-center">
          <MenuButton open={open} onClick={toggle} />
        </div>
      </div>

      <div className="flex h-full items-center justify-between px-4 lg:hidden">
        <Link href="/" className="group min-w-0 font-display text-[clamp(24px,8vw,32px)] font-normal leading-none">
          <RollingText text="AGENXY" />
        </Link>
        <MenuButton open={open} onClick={toggle} />
      </div>
    </header>
  );
}
