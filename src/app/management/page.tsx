"use client";

import Link from "next/link";
import { useState } from "react";
import { assets, clients, leadership, leadershipGrid, values } from "@/lib/data";
import { RollingText } from "@/components/RollingText";

function SectionLabel({ left, index }: { left: string; index: string }) {
  return (
    <div className="flex w-full max-w-[470px] justify-between">
      <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">[{left}</p>
      <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">{index}]</p>
    </div>
  );
}

export default function ManagementPage() {
  const [openClient, setOpenClient] = useState(0);

  return (
    <>
      <section className="bg-ink text-snow">
        <div className="relative overflow-hidden min-h-[545px]">
          <video
            src={assets.managementHeroVideo}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="relative z-10 flex flex-col justify-end px-5 pb-5 pt-[200px]">
            <div className="flex items-end justify-between">
              <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">ABOUT</p>
              <p className="text-right font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
                2025 Limunasphere® All Rights Reserved.
              </p>
              <p className="max-w-[460px] font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
                WE ARE AGENXY® — A GROUNDBREAKING ARTIST MANAGEMENT, LABEL, AND BOOKING AGENCY CULTIVATING A NEW WAVE OF
                MUSICIANS AND THE FUTURE OF DANCE MUSIC — WHILE CURATING TIMELESS MOMENTS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 px-5 py-[140px] md:grid-cols-[470px_460px_minmax(0,1fr)] md:gap-x-5 md:gap-y-0">
        <div className="md:row-span-2">
          <SectionLabel left="Values" index="S.2" />
        </div>
        <div className="flex flex-col gap-2 md:col-start-2 md:row-start-1">
          {values.map((value) => (
            <h3
              key={value}
              className="font-display text-[40px] font-medium uppercase leading-[0.9] tracking-[-1.92px] text-[#454545] md:text-[64px] md:leading-[57.6px]"
            >
              {value}
            </h3>
          ))}
        </div>
        <p className="max-w-[460px] font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px] text-[#7a7a7a] md:col-start-3 md:row-start-1">
          These words guide how we think, build, and collaborate. They shape our process, define our standards, and
          show up in every project we deliver.
        </p>
      </section>

      <section className="px-5 pb-[140px] bg-snow">
        <SectionLabel left="Leadership" index="S.3" />
        <div className="mt-10 grid grid-cols-2 gap-[5px] md:grid-cols-4">
          {leadershipGrid.map(({ index, col, row }) => {
            const person = leadership[index];
            const colClass = ["", "md:col-start-1", "md:col-start-2", "md:col-start-3", "md:col-start-4"][col];
            const rowClass = ["", "md:row-start-1", "md:row-start-2", "md:row-start-3"][row];
            return (
              <article
                key={person.name}
                className={`relative h-[280px] overflow-hidden sm:h-[320px] md:h-[372px] ${colClass} ${rowClass}`}
              >
                <img src={person.image} alt={person.name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="relative flex h-full flex-col justify-between p-[17px]">
                  <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px] text-snow">
                    {person.name}
                  </p>
                  <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px] text-snow">
                    {person.role}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-[140px] bg-snow">
        <SectionLabel left="Clients" index="S.4" />
        <div className="mt-10 grid gap-10 md:grid-cols-[400px_1fr] md:items-start">
          <div className="relative aspect-square w-full max-w-[400px] overflow-hidden">
            <img
              src={clients[openClient].image}
              alt={clients[openClient].name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-[500px]">
            {clients.map((client, index) => {
              const isOpen = openClient === index;
              return (
                <div key={client.name} className="border-t border-mute last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpenClient(index)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
                      {client.name}
                    </span>
                    <span className="font-display text-[20px] leading-none text-mute">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="max-w-[372px] pb-4 font-sans text-[16px] leading-[19.2px]">{client.blurb}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 pb-[140px] text-snow">
        <video
          src={assets.managementDisciplinesVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative z-10 flex min-h-[760px] flex-col pt-20 md:min-h-[900px]">
          <div>
            <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
              07 Disciplines
            </p>
            <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
              08 Fields
            </p>
          </div>
          <div className="mt-auto max-w-[350px]">
            <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
              From strategy to design to development — discover how we bring ideas to life.
            </p>
            <Link href="/" className="group mt-6 inline-block font-display text-[14px] font-medium uppercase tracking-[0.14px]">
              <RollingText text="Our service" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
