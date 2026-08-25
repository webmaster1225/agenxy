"use client";

import Link from "next/link";
import { useState } from "react";
import { assets, clients, leadershipGrid, team, values } from "@/lib/data";
import { RollingText } from "@/components/RollingText";
import { ScrollCenterOpacity, ScrollCenterOpacityGroup } from "@/components/ScrollCenterOpacity";

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
          <div className="relative z-10 flex flex-col justify-end px-2 lg:px-6 pb-5 pt-[200px] gap-5">
            <div className="flex items-end justify-between border-b border-mute pb-5">
              <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">ABOUT</p>
              <p className="text-right font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
                2025 Limunasphere® All Rights Reserved.
              </p>
            </div>
            <p className="max-w-[460px] font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
              WE ARE AGENXY® — A GROUNDBREAKING ARTIST MANAGEMENT, LABEL, AND BOOKING AGENCY CULTIVATING A NEW WAVE OF
              MUSICIANS AND THE FUTURE OF DANCE MUSIC — WHILE CURATING TIMELESS MOMENTS.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-snow grid gap-10 px-2 lg:px-6 py-[140px] md:grid-cols-3 md:gap-x-5 md:gap-y-0">
        <div className="md:row-span-2">
          <SectionLabel left="Values" index="S.2" />
        </div>
        <ScrollCenterOpacityGroup className="flex flex-col gap-2 md:col-start-2 md:row-start-1">
          {values.map((value) => (
            <ScrollCenterOpacity key={value} minOpacity={0.3}>
              <h3 className="font-display text-[40px] font-medium uppercase leading-[0.9] tracking-[-1.92px] text-[#454545] md:text-[64px] md:leading-[57.6px] py-3">
                {value}
              </h3>
            </ScrollCenterOpacity>
          ))}
        </ScrollCenterOpacityGroup>
        <p className="max-w-[460px] font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px] text-[#7a7a7a] md:col-start-3 md:row-start-1">
          These words guide how we think, build, and collaborate. They shape our process, define our standards, and
          show up in every project we deliver.
        </p>
      </section>

      <section className="px-2 lg:px-6 pb-[140px] bg-snow">
        <SectionLabel left="Leadership" index="S.3" />
        <div className="mt-10 grid grid-cols-2 gap-[5px] md:grid-cols-3">
          {team.map((person, i) => {
            const { col, row } = leadershipGrid[i];
            const colClass = ["", "md:col-start-1", "md:col-start-2", "md:col-start-3", "md:col-start-3"][col];
            const rowClass = ["", "md:row-start-1", "md:row-start-2", "md:row-start-3"][row];
            return (
              <article
                key={person.name}
                className={`relative h-[320px] overflow-hidden sm:h-[320px] md:h-[372px] ${colClass} ${rowClass}`}
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

      <section className="px-2 lg:px-6 pb-[140px] bg-snow">
        <SectionLabel left="Clients" index="S.4" />
        <div className="mt-10 grid lg:gap-10 gap-2 grid-cols-2 md:grid-cols-3 md:items-start">
          <div className="relative aspect-square w-full max-w-[400px] overflow-hidden">
            <img
              src={clients[openClient].image}
              alt={clients[openClient].name}
              className="object-cover h-auto w-full pr-10"
            />
          </div>
          <div className="max-w-[400px]">
            {clients.map((client, index) => {
              const isOpen = openClient === index;
              return (
                <div
                  key={client.name}
                  className="border-t border-mute last:border-b"
                  style={{ height: isOpen ? "300px" : "auto" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenClient(index)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
                      {client.name}
                    </span>
                    <span className="font-display text-[25px] leading-none" style={{ fontFamily: "none" }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="max-w-[372px] pb-4 font-sans text-[16px] leading-[19.2px]">{client.blurb}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-2 lg:px-6 py-16 text-snow h-screen">
        <video
          src={assets.managementDisciplinesVideo}
          className="absolute inset-0 lg:h-auto h-full lg:w-full w-auto object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
              07 Disciplines
            </p>
            <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
              08 Fields
            </p>
          </div>
          <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
            From strategy to design to development <br />
            — discover how we bring ideas to life.
          </p>
          <div className="lg:relative lg:bottom-0 lg:translate-y-0 absolute bottom-[50%] translate-y-[50%] left-[50%] translate-x-[-50%] lg:border-none border lg:p-0 px-16 py-2">
            <Link href="/" className="group inline-block font-display lg:text-[14px] text-2xl font-medium uppercase tracking-[0.14px]">
              <RollingText text="Our service" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
