"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { RollingText } from "./RollingText";
import { useMenu } from "./MenuProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/label", label: "Label" },
  { href: "/artists", label: "Artists" },
  { href: "/management", label: "Management" },
  { href: "/contact-us", label: "Contacts" },
];

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
    <div className="fixed inset-0 z-[80] bg-snow text-ink">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-mute px-5 py-4 md:px-8">
          <Link href="/" className="group font-display text-[40px] font-semibold tracking-tightest">
            <RollingText text="AGENXY" />
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="font-display text-2xl font-semibold tracking-tightest"
          >
            <RollingText text="Close" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center px-5 md:px-10">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="menu-enter group border-b border-mute py-3 font-display text-[14vw] font-bold uppercase leading-[0.9] tracking-tightest md:text-[8vw]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <RollingText text={link.label} />
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-mute px-5 py-5 text-sm text-mute md:px-10">
          <p>Digital Agency</p>
          <a href="mailto:contact@agenxy.com">contact@agenxy.com</a>
          <p>1 (415) 570-2791</p>
        </div>
      </div>
    </div>
  );
}
