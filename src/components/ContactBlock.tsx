"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { RollingText } from "./RollingText";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#444] text-[11px] font-semibold uppercase text-mute transition-colors hover:border-snow hover:text-snow"
    >
      {label}
    </a>
  );
}

export function ContactBlock() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="bg-ink text-snow">
      {/* Hero — CONTACT [04] ··· pill ··· US */}
      <div className="relative border-t border-mute px-[30px] pb-8 pt-10">
        <div className="flex min-h-[200px] items-end justify-between">
          <div className="flex items-start">
            <h2 className="font-display text-[clamp(72px,14vw,200px)] font-bold uppercase leading-none tracking-[-6px]">
              CONTACT
            </h2>
            <span className="ml-3 font-koulen text-[34px] leading-[34px] tracking-[-0.68px] text-ember">04</span>
          </div>
          <p className="font-display text-[clamp(72px,14vw,200px)] font-bold uppercase leading-none tracking-[-6px]">
            US
          </p>
        </div>
      </div>

      {/* Two-column footer */}
      <div className="grid border-t border-mute md:grid-cols-2">
        {/* Left — ways to contact */}
        <div className="flex min-h-[360px] flex-col border-b border-mute px-5 py-10 md:border-b-0 md:border-r md:px-5 md:py-12">
          <h3 className="font-koulen text-[24px] leading-[26.4px] text-mute">WAYS TO CONTACT</h3>

          <div className="mt-auto flex items-end justify-between gap-6 pt-16">
            <div>
              <a
                href="mailto:Hello@agenxy"
                className="group block font-koulen text-[34px] uppercase leading-[40.8px] tracking-[-1.02px]"
              >
                <RollingText text="Hello@agenxy" ember />
              </a>
              <p className="mt-3 flex items-center gap-1 font-koulen text-[19.2px] leading-[21.12px]">
                +1 (786) 685-9835
                <span className="inline-block h-4 w-[2px] animate-pulse bg-ember" aria-hidden="true" />
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 pb-1">
              <SocialIcon label="f" href="https://facebook.com" />
              <SocialIcon label="Bē" href="https://behance.net" />
              <SocialIcon label="X" href="https://x.com" />
            </div>
          </div>
        </div>

        {/* Right — subscribe */}
        <div className="relative flex min-h-[360px] flex-col justify-between p-5">
          <div className="flex flex-col gap-6">
            <h3 className="font-koulen text-[24px] leading-[26.4px] text-mute">SUBSCIBE FOR UPDATES</h3>

            <form onSubmit={onSubmit} className="flex flex-col pt-16">
              <div className="grid items-start md:grid-cols-[auto_1fr] gap-[80px]">
                <label
                  htmlFor="subscribe-email"
                  className="font-koulen text-[19.2px] uppercase leading-[21.12px] tracking-wide"
                >
                  Email
                </label>
                <div className="relative border-b border-mute pb-1">
                  <input
                    id="subscribe-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter Email Address"
                    className="w-full bg-transparent pr-14 text-snow outline-none text-[20px] leading-[28.8px] tracking-[-0.72px] placeholder:text-[#888]"
                  />
                </div>
              </div>
            </form>
          </div>
          <p className="text-center font-sans text-[16px] leading-[20.8px] tracking-[-0.64px] text-[#d5d7de]">
            By submitting, you agree to our Terms &amp; Service.
          </p>
          <button
            type="submit"
            aria-label={sent ? "Subscribed" : "Subscribe"}
            className="absolute bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full bg-snow text-ember text-2xl transition-transform hover:scale-105"
          >
            {<ArrowIcon />}
          </button>
        </div>
      </div>
    </section>
  );
}
