import Link from "next/link";
import { assets } from "@/lib/data";
import { RollingText } from "@/components/RollingText";

const cities = [
  { place: "New York (2025)", caption: "A pause between departures. Street Art", image: assets.wide },
  { place: "Paris (2023)", caption: "Concealment as a form of power. Fashion", image: assets.workA },
  { place: "Singapore (2014)", caption: "Quiet strength in full bloom. Photography", image: assets.workB },
  { place: "Osaka (2019)", caption: "Discipline, held in motion. Japanese Culture", image: assets.tipsy },
  { place: "Brighton (2018)", caption: "Caught between who you were and who remains. Light Experiment", image: assets.workC },
  { place: "Sydney (2021)", caption: "Silence shaped into form. Exhibition", image: assets.workD },
];

const mods = [
  {
    id: "MOD — I/AK",
    title: "VISUAL EXPERIMENTS",
    n: "001",
    copy: "Studies in image, light, and distortion. Tests that don’t follow rules. Pieces built from instinct, error, and the urge to see what happens next.",
  },
  {
    id: "MOD — II/AK",
    title: "FORM & FUNCTION",
    n: "002",
    copy: "Objects, systems, and shapes shaped with intention — then pushed until they reveal their limits. A dialogue between what looks right and what works.",
  },
  {
    id: "MOD — III/AK",
    title: "SOUND & MOTION",
    n: "003",
    copy: "Moving images, rhythm studies, and audiovisual fragments. Work driven by pulse, tension, and the quiet between frames.",
  },
  {
    id: "MOD — IV/AK",
    title: "WRITTEN FRAGMENTS",
    n: "004",
    copy: "Poems, lyrics, and unfinished lines. Thoughts caught mid-breath. Words that behave more like images than sentences.",
  },
  {
    id: "MOD — V/AK",
    title: "THINGS I CAN’T EXPLAIN",
    n: "005",
    copy: "CREATIVE Ideas that arrived uninvited and refused to leave. The work that sits closest to who I am and who I’m still becoming.",
  },
];

export default function ArtistDetailPage() {
  return (
    <>
      <section className="relative min-h-[900px] overflow-hidden border-b border-mute bg-night pt-[100px] text-snow">
        <p className="pointer-events-none absolute left-1/2 top-[122px] -translate-x-1/2 font-display text-[clamp(180px,28vw,808px)] font-bold leading-[0.8] tracking-[-0.08em] text-lime">
          AG
        </p>
        <img
          src={assets.artistA}
          alt="Adam Knoxville"
          className="pointer-events-none absolute left-1/2 top-[100px] h-[620px] w-auto -translate-x-1/2 object-cover mix-blend-lighten"
        />
        <div className="relative ml-auto max-w-[360px] px-6 pt-24 md:mr-[43px] md:px-0">
          <h1 className="font-display text-[62px] font-bold leading-[62px] tracking-[-4.35px] text-lime">I BREAK THINGS</h1>
          <h1 className="font-display text-[72px] font-bold leading-[72px] tracking-[-5.04px]">TO SEE WHAT</h1>
          <h1 className="font-display text-[50px] font-bold leading-[50px] tracking-[-3.52px]">THEY ARE MADE OF</h1>
          <p className="mt-4 font-display text-[24px] font-semibold leading-[28.8px] tracking-[-1.44px] text-lime">
            ADAM KNOXVILLE
          </p>
          <p className="mt-1 font-display text-[12px] font-semibold leading-[13.2px] tracking-[-0.36px]">
            VISUAL ARTIST/CREATOR
          </p>
        </div>
      </section>

      <section className="grid border-b border-mute md:grid-cols-4">
        {[
          ["001", "PHASE/BREAK"],
          ["002", "PHASE/BUILD"],
          ["003", "PHASE/BEND"],
          ["004", "PHASE/RELEASE"],
        ].map(([n, label]) => (
          <div key={n} className="border-b border-r border-mute px-6 py-6 last:border-b-0 md:border-b-0">
            <p className="font-display text-[14px] font-medium uppercase tracking-[0.14px] text-mute">{n}</p>
            <p className="mt-3 font-display text-[14px] font-medium uppercase tracking-[0.14px]">{label}</p>
          </div>
        ))}
      </section>

      <section className="border-b border-mute px-4 py-16 md:px-8">
        <p className="max-w-5xl font-display text-3xl font-semibold uppercase leading-[1.05] tracking-tightest md:text-5xl">
          ART IS A CONTROLLED INTERRUPTION A PRACTICE OF CATCHING THE MOMENT BEFORE IT DISAPPEARS.
        </p>
        <p className="mt-8 max-w-3xl text-lg text-mute">
          I WORK ACROSS IMAGE, OBJECT, MOTION, AND SOUND TO TRACE THE SHAPE OF WHAT DOESN’T SIT STILL. It isn’t a portfolio. It’s the place where the work stays honest. An ongoing record of what I make when thought moves faster than structure.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <article key={city.place} className="border-b border-r border-mute">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={city.image} alt={city.place} className="h-full w-full object-cover" />
            </div>
            <div className="px-4 py-4">
              <p className="text-xs text-mute">{city.caption}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tightest">{city.place}</h3>
            </div>
          </article>
        ))}
      </section>

      <section className="border-y border-mute px-4 py-16 md:px-8">
        <p className="font-mono text-xs uppercase text-mute">INDX // CONCEPTUAL · REVISION — NEUE 7.6</p>
        <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tightest md:text-7xl">
          NOTHING STAYS UNTOUCHED
        </h2>
        <p className="mt-6 max-w-xl text-mute">
          Pages become places worth lingering in, and issues become experiences people anticipate, keep, and share.
        </p>
      </section>

      <section className="divide-y divide-mute border-b border-mute">
        {mods.map((mod) => (
          <article key={mod.id} className="grid gap-4 px-4 py-8 md:grid-cols-[180px_1fr_80px] md:px-8">
            <p className="font-mono text-xs uppercase text-mute">{mod.id}</p>
            <div>
              <h3 className="font-koulen text-3xl">{mod.title}</h3>
              <p className="mt-3 max-w-2xl text-mute">{mod.copy}</p>
            </div>
            <p className="font-display text-3xl font-semibold tracking-tightest text-mute">{mod.n}</p>
          </article>
        ))}
      </section>

      <section className="grid border-b border-mute lg:grid-cols-2">
        <div className="px-4 py-12 md:px-8">
          <h2 className="font-display text-5xl font-bold uppercase tracking-tightest">EMBRACING THE UNKNOWN</h2>
          <p className="mt-6 max-w-md text-mute">
            I follow ideas into places that don’t have names yet. Some reveal structure. Some collapse into noise. Work shaped by movement, memory, and interruption.
          </p>
        </div>
        <div className="min-h-[360px] overflow-hidden bg-ink">
          <img src={assets.artistA} alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="grid border-b border-mute md:grid-cols-2">
        <article className="border-b border-mute px-4 py-10 md:border-b-0 md:border-r md:px-8">
          <p className="font-mono text-xs uppercase text-mute">Caption: Studio CAM66, London. Daniel & Adam</p>
          <h3 className="mt-4 font-koulen text-3xl">STUDIO CHAT WITH DANIEL MOORE</h3>
          <p className="mt-4 text-mute">
            Adam talks about breaking form, chasing rhythm, and shaping thought into images.
          </p>
          <p className="mt-6 text-sm text-mute">Recorded AT CAM66 Studios London in 24 November 2025</p>
          <p className="text-sm text-mute">15 minutes, 13 seconds · Digital Media</p>
        </article>
        <article className="px-4 py-10 md:px-8">
          <p className="font-mono text-xs uppercase text-mute">Caption: Modus Vivendi. by Adam Knoxville</p>
          <h3 className="mt-4 font-koulen text-3xl">Modus vivendi</h3>
          <p className="mt-4 text-mute">
            A delicate balance of stillness and movement, presence and absence. It captures bodies in transformation, suspended in quiet resistance.
          </p>
          <p className="mt-6 font-semibold">Showing until 10 March 2026</p>
          <p className="text-sm text-mute">Tate Modern Exhibition · Bankside, London SE1 9TG</p>
        </article>
      </section>

      <section className="grid border-b border-mute lg:grid-cols-[1.1fr_0.9fr]">
        <div className="px-4 py-12 md:px-8">
          <p className="font-mono text-xs uppercase text-mute">NDX — A7</p>
          <h2 className="mt-4 font-display text-6xl font-bold tracking-tightest">I’am</h2>
          <p className="mt-6 max-w-md">Developing work across digital and physical formats.</p>
          <p className="mt-2 font-mono text-xs uppercase text-mute">Independent Visual Artist</p>
          <blockquote className="mt-10 max-w-md text-lg">
            “Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.”
            <footer className="mt-3 text-sm text-mute">— Antoine de Saint-Exupery</footer>
          </blockquote>
          <p className="mt-8 max-w-md text-mute">
            I’m a UK-based visual artist. My practice is driven by experiments, systems, and iteration. Some work resolves quickly, Others evolve over time.
          </p>
        </div>
        <div className="border-t border-mute px-4 py-12 lg:border-l lg:border-t-0 md:px-8">
          <p className="font-koulen text-2xl">THINGS I DO</p>
          <ul className="mt-6 space-y-2 font-display text-2xl font-semibold uppercase tracking-tightest">
            <li>SOUND Design</li>
            <li>Motion Graphics</li>
            <li>Installation Studies</li>
            <li>STORYBOARDS</li>
            <li>Visual Scripts</li>
          </ul>
          <Link href="/artists" className="group mt-10 inline-block font-display text-2xl font-semibold tracking-tightest">
            <RollingText text="VIEW THE WORK" />
          </Link>
        </div>
      </section>
    </>
  );
}
