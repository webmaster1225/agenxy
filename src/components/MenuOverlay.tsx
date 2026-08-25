"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { RollingText } from "./RollingText";
import { useMenu } from "./MenuProvider";

const kickers = ["Our Works:", "Our Team:", "We Work With:", "Reach Out To Us:"];

const links = [
  { href: "/", label: "HOME" },
  { href: "/label", label: "LABEL" },
  { href: "/management", label: "MANAGEMENT" },
  { href: "/artists", label: "ARTISTS" },
  { href: "/contact-us", label: "CONTACTS" },
  { href: "/contact-us", label: "BOOKINGS" },
];

function CloseMark() {
  return (
    <span className="relative block h-12 w-20" aria-hidden="true">
      <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rotate-[15deg] bg-ink" />
      <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 -rotate-[15deg] bg-ink" />
    </span>
  );
}

export function MenuOverlay() {
  const { open, setOpen } = useMenu();
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-snow text-ink h-fit">
      <div className="flex h-16 shrink-0 items-center justify-end border-b border-mute px-4 lg:hidden">
        <button aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-full items-center justify-center px-2">
          <CloseMark />
        </button>
      </div>

      <div className="header-grid hidden h-[var(--header-compact)] shrink-0 border-b border-mute lg:grid">
        <div className="border-r border-mute" />
        {kickers.map((label) => (
          <div key={label} className="flex items-center border-r border-mute px-4 xl:px-5">
            <p className="truncate text-[14px] leading-tight text-mute md:text-[16px]">{label}</p>
          </div>
        ))}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="flex h-full w-full items-center justify-center"
        >
          <CloseMark />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-12 justify-between px-5 py-8 md:px-8 lg:flex-row lg:px-10 lg:py-10 lg:flex-row-reverse">
        <nav className="flex flex-col items-start justify-start gap-8 text-right lg:items-end">
          {links.map((link, i) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              onClick={() => setOpen(false)}
              className="menu-enter group font-display text-xl font-bold uppercase tracking-tight"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <RollingText text={link.label} />
            </Link>
          ))}
        </nav>
        <div className="flex flex-col justify-between gap-12">
          <Link href="/" onClick={() => setOpen(false)} className="w-fit lg:block hidden">
            <div className="header-mark mb-2 flex h-14 w-14 items-center justify-center rounded-[8px] bg-ink xl:h-[75px] xl:w-[49px]">
              <span className="font-koulen text-[40px] leading-none tracking-[-2.8px] text-snow xl:text-[56px]">X.</span>
            </div>
            <p className="font-display text-2xl font-bold uppercase leading-none tracking-tight">
              AGENXY
            </p>
          </Link>

          <div>
            <a
              href="mailto:hello@agenxy.com"
              className="block font-display text-lg font-bold uppercase leading-none tracking-tight"
            >
              hello@AGENXY.COM
            </a>
            <a
              href="tel:14155702791"
              className="mt-2 block font-display text-lg font-bold uppercase leading-none tracking-tight"
            >
              +1 (786) 685-9835
            </a>
            <address className="mt-5 not-italic font-sans text-sm leading-[1.4] text-ink">
              325 West 38th Street
              <br />
              Suite 705, New York NY
              <br />
              10018
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
