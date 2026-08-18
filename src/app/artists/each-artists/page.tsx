"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { assets } from "@/lib/data";
import { ScrollCenterOpacity, ScrollCenterOpacityGroup } from "@/components/ScrollCenterOpacity";

const phases = [
  { n: "001", label: "BREAK" },
  { n: "002", label: "BUILD" },
  { n: "003", label: "BEND" },
  // { n: "004", label: "RELEASE" },
];

const cities = [
  { place: "NEW YORK (2025)", caption: "Caption: A pause between departures. Street Art", image: assets.artistCityB },
  { place: "PARIS (2023)", caption: "Caption: Concealment as a form of power. Fashion", image: assets.artistCityC },
  { place: "SINGAPORE (2014)", caption: "Caption: Quiet strength in full bloom. Photography", image: assets.artistCityD },
  { place: "OSAKA (2019)", caption: "Caption: Discipline, held in motion. Japanese Culture", image: assets.artistCityE},
  { place: "BRIGHTON (2018)", caption: "Caption: Caught between who you were and who remains. Light Experiment", image: assets.artistCityF },
  { place: "SYDNEY (2021)", caption: "Caption: Silence shaped into form. Exhibition", image: assets.artistCityG},
];

const catNotes = [
  {
    id: "CAT — 1.07",
    copy: "I WORK BETWEEN ORDER AND INTERRUPTION. WHERE CLEAN LINES ARGUE WITH IMPULSE. WHERE RHYTHM BREAKS BEFORE IT RESOLVES.",
  },
  {
    id: "CAT — 1.08",
    copy: "VERTICAL IS THE STATE I BUILD IN— A PLACE FOR UNFINISHED THOUGHTS, SHARPENED IDEAS, AND THE THINGS THAT REFUSE SILENCE.",
  },
];

const mods = [
  {
    id: "MOD — I/AK",
    title: "VISUAL EXPERIMENTS",
    n: "001",
    active: 0,
    copy: [
      { text: "STUDIES IN IMAGE, " },
      { text: "LIGHT, AND DISTORTION. ", accent: true },
      { text: "TESTS THAT DON’T FOLLOW RULES. " },
      { text: "PIECES BUILT FROM INSTINCT, ", accent: true },
      { text: "ERROR, AND THE URGE TO SEE WHAT HAPPENS NEXT." },
    ],
  },
  {
    id: "MOD — II/AK",
    title: "FORM & FUNCTION",
    n: "002",
    active: 1,
    copy: [
      { text: "OBJECTS, SYSTEMS, AND SHAPES " },
      { text: "SHAPED WITH INTENTION — ", accent: true },
      { text: "THEN PUSHED UNTIL THEY " },
      { text: "REVEAL THEIR LIMITS. ", accent: true },
      { text: "A DIALOGUE BETWEEN WHAT LOOKS RIGHT AND WHAT WORKS." },
    ],
  },
  {
    id: "MOD — III/AK",
    title: "SOUND & MOTION",
    n: "003",
    active: 2,
    copy: [
      { text: "MOVING IMAGES, RHYTHM STUDIES, AND " },
      { text: "AUDIOVISUAL FRAGMENTS. ", accent: true },
      { text: "WORK DRIVEN BY " },
      { text: "PULSE, TENSION, ", accent: true },
      { text: "AND THE QUIET BETWEEN FRAMES." },
    ],
  },
  {
    id: "MOD — IV/AK",
    title: "WRITTEN FRAGMENTS",
    n: "004",
    active: 3,
    copy: [
      { text: "POEMS, LYRICS, AND " },
      { text: "UNFINISHED LINES. ", accent: true },
      { text: "THOUGHTS CAUGHT MID-BREATH. WORDS THAT BEHAVE " },
      { text: "MORE LIKE IMAGES ", accent: true },
      { text: "THAN SENTENCES." },
    ],
  },
  {
    id: "MOD — V/AK",
    title: "THINGS I CAN’T EXPLAIN",
    n: "005",
    active: 4,
    copy: [
      { text: "CREATIVE IDEAS THAT " },
      { text: "ARRIVED UNINVITED ", accent: true },
      { text: "AND REFUSED TO LEAVE. THE WORK THAT SITS CLOSEST TO WHO I AM AND " },
      { text: "WHO I’M STILL BECOMING.", accent: true },
    ],
  },
];

function BarcodeMark() {
  return (
    <span className="flex h-[10px] items-stretch gap-[2px]" aria-hidden="true">
      <span className="w-px bg-current" />
      <span className="w-[3px] bg-current" />
      <span className="w-px bg-current" />
    </span>
  );
}

function ViewfinderMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-lime">
      <path d="M1 5V1h4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 1h4v4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 11v4h4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 15h4v-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function VimeoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.087 3.498-3.128C5.081 2.726 6.266 1.99 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797z" />
    </svg>
  );
}

function RabbitMark() {
  return (
    <div className="relative h-[220px] w-[220px]">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full origin-center animate-[spin_20s_linear_infinite] overflow-visible motion-reduce:animate-none"
      >
        <defs>
          <path id="chasing-rabbit-path" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text
          fill="#b0b0b0"
          fontSize="32"
          fontWeight="bold"
          letterSpacing="1"
        >
          <textPath href="#chasing-rabbit-path">
           CHASING * THE WHITE RABBIT  
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={assets.artistRabbit} alt="" className="h-[118px] w-auto" />
      </div>
    </div>
  );
}

function Meter({ active }: { active: number }) {
  return (
    <div className="mt-4 flex w-[18px] flex-col gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`h-[2px] w-full ${i === active ? "bg-lime" : "bg-[#8d8d8d]"}`} />
      ))}
    </div>
  );
}

function HeroImage() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY * 0.18, 120));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ willChange: "transform", opacity: 1, transform: `translateY(${offset}px)` }}
    >
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-night"
        style={{ minWidth: 5, minHeight: 5, backfaceVisibility: "hidden", perspective: 1000, transform: "translateZ(0)" }}
      >
        <div role="presentation" className="relative h-full w-full overflow-hidden">
          <div
            role="presentation"
            className="h-full w-full"
            style={{
              backgroundImage: `url("${assets.artistHero}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(100%) grayscale(0%)",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ArtistDetailPage() {
  return (
    <div className="bg-night text-snow">
      <section className="relative flex justify-center items-center h-screen overflow-hidden px-6">
        <HeroImage />
        <p className="pointer-events-none absolute left-6 top-[180px] font-display text-[16vw] font-bold uppercase leading-[0.8] tracking-[-0.08em] text-white/5">
          explore
        </p>
        <div className="absolute h-[85vh] w-[60vw]">
          <div className="relative flex flex-col justify-between items-stretch h-full w-full">
            <div className="grid grid-cols-3">
              <p className="pointer-events-none font-display text-[16vw] font-bold leading-[0.8] tracking-[-0.08em] text-lime">
                AG
              </p>
            </div>
            <div className="grid grid-cols-3">
              <div></div>
              <p className="pointer-events-none font-display text-[16vw] font-bold leading-[0.8] tracking-[-0.08em] text-lime">
                EN
              </p>
            </div>
            <div className="grid grid-cols-3">
              <div></div>
              <div></div>
              <p className="pointer-events-none font-display text-[12vw] font-bold leading-[0.8] tracking-[-0.08em] text-lime">
                XY
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-[10vh] right-[10vw] z-10">
          <p className="font-display text-[62px] font-bold uppercase leading-[62px] tracking-[-4.35px] text-lime">I BREAK THINGS</p>
          <p className="font-display text-[72px] font-bold uppercase leading-[72px] tracking-[-5.04px]">TO SEE WHAT</p>
          <p className="font-display text-[50px] font-bold uppercase leading-[50px] tracking-[-3.52px]">THEY ARE MADE OF</p>
          <div className="mt-4 flex items-start gap-2">
            <span className="mt-1 h-[42px] w-[2px] bg-lime" />
            <div>
              <p className="font-display text-[24px] font-semibold uppercase leading-[28.8px] tracking-[-1.44px] text-lime">
                ADAM KNOXVILLE
              </p>
              <p className="mt-1 font-display text-[12px] font-semibold uppercase leading-[13.2px] tracking-tight text-[#ccc]">
                VISUAL ARTIST/CREATOR
              </p>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between bottom-[30vh] left-0 right-0 z-10 px-10">
          <div className="grid grid-cols-3 w-[90vw]">
            {phases.map((phase) => (
              <div key={phase.n} className="py-5 last:border-r-0">
                <p className="font-display text-[12px] font-semibold uppercase tracking-tight">{phase.n}</p>
                <div className="my-1 h-32 border-l border-solid border-[#2c2c2c]" />
                <p className="mt-1 font-display text-[12px] uppercase tracking-[-0.48px] text-[#ccc]">
                  PHASE/<span className="text-lime">{phase.label}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="py-5 w-auto">
            <p className="font-display text-[12px] font-semibold uppercase tracking-tight">004</p>
            <div className="my-1 h-32 border-l border-solid border-[#2c2c2c]" />
            <p className="mt-1 font-display text-[12px] uppercase tracking-[-0.48px] text-[#ccc]">
              PHASE/<span className="text-lime">RELEASE</span>
            </p>
          </div>
          
        </div>
        <div className="absolute flex flex-row gap-10 bottom-[5vh] left-10 z-10">
          <p className="font-display text-[12px] uppercase tracking-tight text-[#ccc]">IDX/AK <br/> <span className="text-lime font-bold">2026</span></p>
          <div className="font-display border-l-4 border-solid border-[#2c2c2c] pl-1 text-xl uppercase">
            <p>VISUAL EXPERIMENTS</p>
            <p>FORM & FUNCTION</p>
            <p>SOUND & MOTION</p>
            <p>WRITTEN FRAGMENTS</p>
            <p>THINGS I CAN’T EXPLAIN</p>
          </div>
        </div>
      </section>

      <section className="bg-night px-6 pb-24 pt-40">
        <div className="p-16">
          <img
            src={assets.artistCityA}
            alt=""
            className="float-left mr-4 mb-2 w-1/2 object-cover"
          />
          <p className="font-display font-bold uppercase text-[#D9D9D9] text-[60px]">
            ART IS A CONTROLLED INTERRUPTION A PRACTICE OF CATCHING THE MOMENT BEFORE IT DISAPPEARS.
            I WORK ACROSS IMAGE, OBJECT, MOTION, AND SOUND TO TRACE THE SHAPE OF WHAT DOESN’T SIT STILL.
          </p>
        </div>
      </section>

      <section className="bg-night px-6 pb-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-3">
          {cities.map((city, i) => (
            <div key={city.place} className="flex flex-col gap-1">
              <img src={city.image} alt={city.place} className={`h-full object-cover grayscale ${i % 2 === 0 ? "float-left w-2/3" : "float-right w-3/4"}`} />
              <h3 className="mt-1 font-display text-sm font-semibold uppercase tracking-[-0.54px]">{city.place}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-[100vh] overflow-hidden bg-night">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="h-full w-full relative flex items-center">
            <div className="font-display z-10 flex flex-col gap-1 pl-12">
              <div className="flex flex-row gap-2 text-sm uppercase text-night">
                <span>INDX</span>
                <div className=""></div>
                <span>//CONCEPTUAL</span>
              </div>
              <div className="bg-ink text-xl leading-none rounded-sm w-fit">
                <p>REVISION — NEUE 7.6</p>
              </div>
              <p className="font-bold uppercase text-snow text-[60px]">
                NOTHING STAYS
                <br />
                UNTOUCHED
              </p>
            </div>
            <img src={assets.artistCityH} alt="" className="absolute w-full h-full object-cover" />
          </div>
          <div className="grid grid-rows-2">
            <div className="flex h-full flex-col gap-1 bg-[#d1d1d1] p-6 text-ink">
              <p className="uppercase font-display text-[90px] font-bold text-night leading-none">perspective</p>
              <p className="font-display text-[90px] font-bold text-snow leading-none uppercase">not the truth</p>
              <div className="mt-6 grid grid-cols-2 gap-8">
                {catNotes.map((note) => (
                  <article key={note.id} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-[11px] font-semibold uppercase tracking-[-0.22px]">{note.id}</p>
                      <BarcodeMark />
                    </div>
                    <span className="mb-3 mt-2 block h-[3px] w-full bg-ink" />
                    <p className="font-display text-[13px] font-semibold uppercase leading-[1.25] tracking-[-0.26px]">
                      {note.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="relative h-full w-full">
              <video src={assets.artistUntouchedVideo} className="absolute w-full h-full object-cover" autoPlay muted loop playsInline />
              <span className="absolute font-display uppercase bottom-0 p-4 text-right text-snow text-4xl font-bold">Pages become places worth lingering in, and issues become experiences people anticipate, keep, and share.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[100vh] overflow-hidden bg-night">
        <video src={assets.artistExploreVideo} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-night/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="bg-lime font-display text-sm font-semibold leading-tight uppercase text-ink">
            EXPLORATION PHASE
          </span>
          <p className="font-display text-[20vh] leading-none font-bold uppercase">
            SOME PIECES SETTLE. SOME DON’T. 
          </p>
          <p className="font-display text-4xl text-[#D9D9D9] leading-none font-bold uppercase w-2/5 mt-16">
            BOTH REVEAL SOMETHING THE FINISHED VERSION CAN’T.
          </p>
          <p className="mt-6 text-[12px] uppercase tracking-tight text-[#cfcfcf]">
            <span className="text-snow">SOURCE </span>
            <span>— FIELD NOTES</span>
          </p>
        </div>
      </section>

      <section className="bg-lime text-ink h-[100vh]">
        <div className="grid items-start lg:grid-cols-[1fr_auto_1.1fr] h-full">
          <div className="px-6 py-16 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-display text-[64px] font-bold uppercase leading-[0.9] tracking-[-3.8px] md:text-[88px]">MODERN RITUALS</h2>
              <p className="mt-3 font-display text-md uppercase font-bold">STUDY — 04.13 <br/> SELECTED WORK</p>
              <div className="mt-10 border-l-4 border-ink pl-3">
                <p className="max-w-md font-display text-4xl font-bold uppercase leading-[1.05] tracking-[-1.2px]">
                  LINES BECOME SIGNALS.
                  <br />
                  SURFACES BECOME STORIES.
                </p>
                <p className="mt-5 max-w-md font-display text-[14px] uppercase leading-[20px] tracking-[-0.28px]">
                  STRUCTURE ARGUES WITH IMPULSE UNTIL BOTH LEARN TO STAND STILL. GRIDS SET THE PACE. MARGINS HOLD THE QUIET.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {[
                { label: "ARTIFACT—I", src: assets.artistArtifactA },
                { label: "ARTIFACT—II", src: assets.artistArtifactB },
                { label: "ARTIFACT—III", src: assets.artistArtifactC },
              ].map((item) => (
                <figure key={item.label}>
                  <img src={item.src} alt="" className="h-[122px] w-[87px] object-cover grayscale" />
                  <figcaption className="mt-2 font-display text-[11px] uppercase tracking-[-0.22px]">{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="hidden h-full w-24 bg-[repeating-linear-gradient(to_bottom,black_0_1px,transparent_1px_8px)] lg:block" />
          <div className="relative h-full">
            <img src={assets.confessTop} alt="" className="h-1/2 w-full object-cover grayscale" />
            <img src={assets.confessBottom} alt="" className="h-1/2 w-full object-cover grayscale" />
          </div>
        </div>
      </section>

      <section className="bg-night px-6 py-20 h-[100vh]">
        <p className="font-display text-center text-[50vh] font-bold uppercase leading-none tracking-tighter text-lime">VERTICAL</p>
        <p className="font-display text-[10vh] font-semibold uppercase leading-[1.05] tracking-tighter text-[#8d8d8d]">
          THE ARCHIVE OF EVERYTHING <br/> I CAN’T KEEP IN ONE PLACE.
        </p>
        <p className="mt-4 font-display text-[12px] uppercase tracking-tight text-[#8d8d8d]">VERTICAL STORAGE — 2015-2026 · ANALOG ARCHIVES</p>
      </section>
      <section className="bg-night px-6 py-20">
        <ScrollCenterOpacityGroup className="mt-16 divide-y divide-[#2c2c2c] border-y border-[#2c2c2c]">
          {mods.map((mod) => (
            <article
              key={mod.id}
              className="grid items-start gap-6 py-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] md:gap-12"
            >
              <div className="flex min-h-[160px] flex-col">
                <p className="font-display text-[12px] uppercase tracking-tight text-[#8d8d8d]">{mod.id}</p>
                  <h3 className="mt-2 text-4xl font-bold uppercase leading-none tracking-[-1.8px] text-[#d1d1d1]">
                    {mod.title}
                  </h3>
                <Meter active={mod.active} />
                <p className="mt-auto pt-8 text-[12px] uppercase tracking-tight text-snow">
                  // {mod.n}
                </p>
              </div>
              <span
                className="hidden self-start pt-8 font-[monospace] text-[40px] leading-none text-[#8d8d8d] md:block"
                aria-hidden="true"
              >
                →
              </span>
              <div className="border-l border-[#3a3a3a] pl-5 md:pl-8">
                <p className="max-w-[540px] font-display text-3xl font-bold uppercase leading-[1.2] tracking-[-0.28px] text-[#cfcfcf]">
                  {mod.copy.map((part, i) => (
                    <span key={i} className={part.accent ? "text-lime" : undefined}>
                      {part.text}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </ScrollCenterOpacityGroup>
        <p className="mt-10 font-display text-[12px] uppercase tracking-tight text-[#8d8d8d]">
          PATTERNS EMERGE. FRICTION CREATES MEANING.
        </p>
      </section>

      <section className="bg-[#d9d9d9] text-ink">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[700px] overflow-hidden bg-ink">
            <img src={assets.artistPatterns} alt="" className="h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0_1px,transparent_1px_7px)] mix-blend-overlay" />
            <p className="absolute bottom-10 left-6 max-w-sm font-display text-[36px] font-bold uppercase leading-[0.95] tracking-[-1.8px] text-snow">
              PATTERNS EMERGE.
              <br />
              FRICTION CREATES
              <br />
              MEANING.
            </p>
          </div>
          <div className="flex min-h-[700px] flex-col justify-between px-8 py-12">
            <div>
              <p className="font-display text-[14px] uppercase tracking-[-0.28px] text-[#666]">ILLUSION · LATENCY · PERSPECTIVE · CONTROL</p>
              <ScrollCenterOpacity minOpacity={0.25}>
                <h2 className="mt-8 font-display text-[64px] font-bold uppercase leading-[0.9] tracking-[-3.8px] md:text-[92px]">
                  EMBRACING THE
                  <br />
                  UNKNOWN
                </h2>
              </ScrollCenterOpacity>
            </div>
            <p className="max-w-md font-display text-[16px] uppercase leading-[22px] tracking-[-0.32px]">
              I FOLLOW IDEAS INTO PLACES THAT DON’T HAVE NAMES YET. SOME REVEAL STRUCTURE. SOME COLLAPSE INTO NOISE. WORK SHAPED BY
              MOVEMENT, MEMORY, AND INTERRUPTION.
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden">
            <img src={assets.artistSignals} alt="" className="h-full w-full object-cover grayscale" />
            <p className="absolute bottom-8 left-6 font-display text-[24px] font-bold uppercase leading-[1.05] tracking-[-0.96px] text-snow">
              SIGNALS FORM.
              <br />
              SURFACES RESPOND.
            </p>
          </div>
          <div className="px-8 py-12">
            <ScrollCenterOpacity minOpacity={0.22}>
              <h3 className="font-display text-[48px] font-bold uppercase leading-[0.95] tracking-[-2.4px] md:text-[64px]">
                WHAT HOLDS UP IS WHAT MATTERS.
              </h3>
            </ScrollCenterOpacity>
            <p className="mt-6 font-display text-[16px] uppercase leading-[22px] tracking-[-0.32px]">
              Observation over explanation.
              <br />
              Process over certainty.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-between bg-[#ececec] px-6 py-16 text-ink md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <p className="max-w-[360px] font-display text-[14px] uppercase leading-[1.35] tracking-tight">
            I FOLLOW IDEAS INTO PLACES THAT SHIFT AS I STEP INTO THEM. PATHS APPEAR, VANISH, REAPPEAR SOMEWHERE ELSE. SOME LEAD TO CLARITY. SOME LEAD TO NOISE.
            <span className="mt-2 block font-bold">BOTH KEEP THE RABBIT MOVING.</span>
          </p>
          <div className="justify-self-center">
            <RabbitMark />
          </div>
          <p className="max-w-[360px] justify-self-end text-right font-display text-[14px] uppercase leading-[1.35] tracking-tight">
            I CHASE THE THINGS THAT CHANGE DIRECTION WITHOUT WARNING. A LINE BENDS. A THOUGHT SPLITS. A SHAPE BECOMES SOMETHING IT WASN’T MEANT TO BE. I STAY WITH IT UNTIL IT REVEALS A REASON TO FOLLOW.
            <span className="mt-2 block font-bold">THE RABBIT IS NEVER STILL.</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="mt-10 text-center font-display text-[170px] font-bold uppercase leading-none tracking-tighter">
            VERTICAL
          </p>
          <div className="flex items-center gap-4">
            <span className="font-display text-[28px] font-bold tracking-[-0.84px]">AK</span>
            <div className="h-[4px] w-[35vw] bg-ink"></div>
            <span className="font-display text-[11px] uppercase tracking-[-0.22px]">ADAM KNOXVILLE</span>
          </div>
        </div>
      </section>

      <section className="bg-night px-6 py-16 md:px-12">
        <ScrollCenterOpacityGroup className="grid gap-12 md:grid-cols-3 md:gap-16">
          {[
            {
              title: "VISUAL",
              copy: "Images pulled from movement, memory, and interruption. Studies in light, depth, and distortion. Work built from the urge to see what happens next.",
            },
            {
              title: "FORM",
              copy: "Objects, systems, and structures under tension. Where function bends into expression. Tests built to reveal how materials behave when pushed.",
            },
            {
              title: "MOTION",
              copy: "Frames driven by rhythm and atmosphere. Loops, pulses, and shifting perspectives. Pieces meant to be felt before they’re understood.",
            },
          ].map((item) => (
            <div>             
              <div className="flex items-center gap-2.5">
                <ViewfinderMark />
                <p className="font-display text-[24px] font-bold uppercase leading-none tracking-[-0.96px] text-snow">
                  {item.title}
                </p>
              </div>
              <span className="mt-3 block h-px w-full bg-[#3a3a3a]" />
              <p className="mt-6 font-mono text-[12px] uppercase leading-[18px] tracking-[0.04em] text-snow">
                {item.copy}
              </p>
            </div>          
          ))}
        </ScrollCenterOpacityGroup>
      </section>

      <section className="bg-lime px-[10vw] py-10 text-ink gap-10 grid grid-cols-1 lg:grid-cols-2">
        <div className="grid items-center pl-16">
          <p className="text-[32px] font-bold uppercase leading-none tracking-tighter md:text-[40px]">
            “WHETHER ON PAPER OR PIXELS, THE GOAL IS CONSTANT — DESIGN THAT DISAPPEARS AS THE STORY APPEARS, LETTING THE WORK SPEAK
            WITHOUT SHOUTING FOR ATTENTION” — AK
          </p>
        </div>
        <div className="h-auto w-full">
          <img src={assets.artistStudio} alt="" className="h-[40vw] w-full object-cover grayscale" />
          <div className="mt-2 flex flex-col gap-1">
            <h3 className="text-sm font-bold uppercase tracking-tight border-b-[3px] border-black pb-1">STUDIO CHAT WITH DANIEL MOORE</h3>
            <p className="text-[10px] uppercase leading-none tracking-tighter font-bold">
              Adam talks about breaking form, chasing <br/> rhythm, and shaping thought into images.
            </p>
            <p className="text-[10px] uppercase leading-none">
              Recorded AT CAM66 Studios London in 24 November 2025
            </p>
            <p className="text-[9px] font-bold uppercase tracking-tighter">
              15 minutes, 13 seconds · Digital Media
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-0 min-h-screen overflow-hidden bg-snow text-ink">
        <div className="grid min-h-screen lg:grid-cols-2">
          <div className="relative min-h-[50vh] overflow-hidden lg:min-h-screen">
            <img src={assets.artistRipple} alt="" className="absolute inset-0 h-full w-full object-cover grayscale" />
          </div>
          <div className="flex flex-col justify-between bg-[#F2F2F2] px-8 py-12">
            <div>
              <h2 className="text-[50px] tracking-tighter leading-none font-bold uppercase border-b-[4px] border-black pb-1">
                MODUS VIVENDI
              </h2>
              <p className="max-w-[35vw] text-[16px] font-semibold uppercase tracking-tighter leading-none">
                A DELICATE BALANCE OF STILLNESS AND MOVEMENT, PRESENCE AND ABSENCE. IT CAPTURES BODIES IN TRANSFORMATION, SUSPENDED IN
                QUIET RESISTANCE.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-tighter text-night">Showing until 10 March 2026</p>
              <p className="text-[14px] font-bold uppercase  tracking-tighter">TATE MODERN EXHIBITION</p>
              <p className="text-[10px] uppercase tracking-tighter">BANKSIDE, LONDON SE1 9TG</p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 bg-lime text-md font-bold uppercase leading-none tracking-tighter"
              >
                SHOWROOM
                <span aria-hidden="true">&gt;&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 bg-snow py-16 text-ink">
        <div className="grid grid-rows-2 gap-16 px-8 leading-none tracking-tighter">
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-10 font-bold leading-none">
            <div></div>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] uppercase">
                CONCEPT <span className="text-lime">/</span> MOTION ART
              </p>
              <h3 className="whitespace-nowrap text-[56px] font-bold uppercase tracking-tighter">
                CONTEMPORARY <span className="text-lime">/</span><br/><span className="text-[#7a7a7a]">MOTION</span> CONCEPT
              </h3>
              <p className="max-w-[30vw] text-[16px] font-bold uppercase text-[#555] indent-5">
                A study in rhythm, distortion, and controlled imbalance. Surfaces react to movement. Movement reshapes the frame. The
                piece shifts between clarity and noise, revealing patterns you only see when they break.
              </p>
              <p className="text-[30px] leading-[2] font-bold uppercase">2024 ———— 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1fr_2fr] gap-10 font-bold leading-none">
            <div></div>
            <video src={assets.artistModusVideo} className="h-auto w-full object-cover grayscale" autoPlay muted loop playsInline />
            <div className="flex flex-col gap-1">
              <p className="text-[14px] uppercase">RIPPLE TRACE</p>
              <h3 className="text-[clamp(72px,14vw,210px)] uppercase leading-none">AK1.0</h3>
              <p className="text-[12px] uppercase">
                VISUAL IDENTITY
                <br />
                MOTION MAPPING
                <br />
                ART DIRECTION
                <br />
                CONCEPT DEVELOPMENT
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-0 min-h-screen bg-night px-4 py-16 md:px-6 lg:px-16 lg:py-20">
        <div className="grid items-start gap-16 grid-cols-1 lg:grid-cols-3">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-1">
              <p className="text-[200px] font-bold uppercase leading-[0.85] tracking-[-10px] text-[#9a9a9a] indent-[-10px]">
                I’AM
              </p>
              <p className="mt-1 text-[36px] font-bold uppercase leading-[0.95] tracking-[-1.8px] text-lime md:text-[48px] whitespace-nowrap">
                ADAM KNOXVILLE
              </p>
              <span className="block h-[4px] w-full max-w-[280px] bg-[#8d8d8d]" />
              <p className="text-[16px] uppercase tracking-tight text-snow">
                DEVELOPING WORK ACROSS DIGITAL AND PHYSICAL FORMATS.
              </p>
              <img src={assets.artistSignature} alt="Adam Knoxville" className="mt-6 h-9 w-auto invert" />
              <p className="text-[12px] uppercase tracking-tight text-[#8d8d8d]">Independent Visual Artist</p>
            </div>
            <blockquote className="mt-4 max-w-sm text-[28px] font-bold leading-none tracking-[-0.32px] text-[#8d8d8d]">
              “Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.”
              <footer className="mt-4 text-[12px] text-[#8d8d8d]">— Antoine de Saint-Exupéry</footer>
            </blockquote>
          </div>

          <div className="flex flex-col justify-between h-full">
            <img
              src={assets.artistPortrait}
              alt="Adam Knoxville"
              className="aspect-[4/5] w-full max-w-[360px] object-cover object-top"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[32px] font-medium uppercase leading-[1.2] tracking-[-0.4px] text-snow">
                I MAKE WORK ACROSS <span className="font-bold">IMAGE, FORM, MOTION,</span> AND <span className="font-bold">TEXT.</span>
              </p>
              <p className="text-[13px] leading-[1.4] tracking-[-0.13px] text-[#8d8d8d]">
                Most projects start with a rule. Experience triggers the next step.
              </p>
              <div>
                <span className="block h-[4px] w-full bg-[#3a3a3a]" />
                <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-[#8d8d8d]">SOCIALS</p>
                <div className="mt-3 flex items-center gap-3 text-snow">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <a key={i} href="https://vimeo.com" aria-label="Vimeo" className="transition-opacity hover:opacity-70">
                      <VimeoMark />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-20">
            <p className="text-[40px] font-semibold uppercase leading-none tracking-tight lg:pt-8 text-[#8d8d8d]">
              I’M A UK-BASED VISUAL ARTIST.
              <br />
              MY PRACTICE IS DRIVEN BY
              <br />
              EXPERIMENTS, SYSTEMS, AND
              <br />
              ITERATION. SOME WORK
              <br />
              RESOLVES QUICKLY, OTHERS
              <br />
              EVOLVE OVER TIME.
            </p>
            <div>
              <p className="text-[12px] uppercase tracking-tight text-[#8d8d8d]">THINGS I DO</p>
              <ul className="mt-3 space-y-1 border-l-4 border-[#555] pl-4 text-[18px] font-semibold uppercase leading-none tracking-tight text-snow">
                <li>VISUAL EXPERIMENTS</li>
                <li>FORM & FUNCTION</li>
                <li>SOUND DESIGN</li>
                <li>MOTION GRAPHICS</li>
                <li>WRITTEN FRAGMENTS</li>
                <li>INSTALLATION STUDIES</li>
                <li>STORYBOARDS</li>
                <li>VISUAL SCRIPTS</li>
              </ul>
              <Link href="/artists" className="bg-lime mt-8 inline-flex gap-1 items-stretch text-[20px] font-bold uppercase tracking-tight leading-none text-ink">
                <span className="">VIEW THE WORK</span>
                <span className="flex items-center " aria-hidden="true">
                  &gt;&gt;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
