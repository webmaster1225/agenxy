import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EpkHeroImage } from "@/components/EpkHeroImage";
import { ListenTrigger } from "@/components/ListenProvider";
import { epks, getEpk, type ArtistEpk, type EpkSocialIcon, type EpkTrack } from "@/lib/epk";
import { formatCount, getInstagramProfile, type InstagramPost } from "@/lib/instagram";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Re-render hourly so the live Instagram grid picks up new posts.
export const revalidate = 3600;

export function generateStaticParams() {
  return epks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const epk = getEpk((await params).slug);
  return epk ? { title: epk.metaTitle } : {};
}

const heroNav = [
  { n: "001", label: "HOME", href: "#hero" },
  { n: "002", label: "DISCOVERY", href: "#intro" },
  { n: "003", label: "RIDER", href: "#rider" },
];

const numerals = ["I", "II", "III", "IV", "V"];

const igPlaceholderTiles = 6;

const socialIcons: Record<EpkSocialIcon, ReactNode> = {
  spotify: (
    <>
      <circle cx="12" cy="12" r="10.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.4 9.1c3.7-1.1 7.8-.8 10.9 1.1M7.2 12.6c3.1-.9 6.5-.6 9.1 1M8 16c2.5-.7 5.2-.5 7.3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  soundcloud: (
    <>
      <path
        d="M1.6 14.2v4M4.6 12.1v6.1M7.6 10.2v8M10.6 8.6v9.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M13.4 18.2V7.4c3.3-1.3 6.7.8 7.1 4.2 1.6.2 2.8 1.5 2.8 3.2 0 1.9-1.4 3.4-3.3 3.4z" fill="currentColor" />
    </>
  ),
  beatport: (
    <>
      <path d="M7.2 2.2v9.9" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <circle cx="12.6" cy="15.4" r="6.1" fill="none" stroke="currentColor" strokeWidth="2.3" />
    </>
  ),
  "apple-music": (
    <>
      <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 6.4 10.2 8v6.6M16 6.4v7.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8.6" cy="15.4" r="1.9" fill="currentColor" />
      <circle cx="14.4" cy="13.9" r="1.9" fill="currentColor" />
    </>
  ),
  tracklists: (
    <>
      <path d="M3.6 15.2v-2.6a8.4 8.4 0 0 1 16.8 0v2.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="2" y="13.8" width="4.6" height="7.4" rx="2.3" fill="currentColor" />
      <rect x="17.4" y="13.8" width="4.6" height="7.4" rx="2.3" fill="currentColor" />
    </>
  ),
  instagram: (
    <>
      <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.7" cy="6.4" r="1.3" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      d="M14.4 22v-8.5h2.9l.5-3.4h-3.4V7.9c0-1 .3-1.7 1.7-1.7h1.8V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.6H7.8v3.4h3.1V22z"
      fill="currentColor"
    />
  ),
};

const external = { target: "_blank", rel: "noreferrer" };

function PlayMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="currentColor" aria-hidden="true">
      <path d="M3 1.5v9l7.5-4.5z" />
    </svg>
  );
}

function PinMark() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor" aria-label="Pinned">
      <path d="M4 1h4v1l-.6.6V5l1.6 1.5V7.5H6.5V11l-.5.5-.5-.5V7.5H3V6.5L4.6 5V2.6L4 2z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

function TrackCard({ track }: { track: EpkTrack }) {
  const cover = <img src={track.cover} alt={track.alt} className="h-auto w-full object-cover" />;

  return (
    <div className="flex flex-col gap-2">
      {track.listen ? (
        <ListenTrigger {...track.listen} className="group relative block w-full overflow-hidden text-left">
          <span className="block transition-transform duration-500 group-hover:scale-[1.03]">{cover}</span>
          <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-lime text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
            <PlayMark className="ml-0.5 h-3 w-3" />
          </span>
        </ListenTrigger>
      ) : (
        cover
      )}
      <h3 className="mt-1 font-display text-sm font-semibold uppercase tracking-[-0.54px]">{track.title}</h3>
      <p className="font-display text-[11px] uppercase leading-snug tracking-tight text-[#8d8d8d] sm:hidden">{track.caption}</p>
    </div>
  );
}

function InstagramPostTile({ post, handle }: { post: InstagramPost; handle: string }) {
  const alt = post.caption ? post.caption.slice(0, 120) : `Instagram post by @${handle}`;

  return (
    <a href={post.permalink} {...external} className="group relative block aspect-square overflow-hidden bg-ink">
      <Image
        src={post.image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 12vw, (min-width: 640px) 28vw, 30vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {post.pinned && (
        <span className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-snow">
          <PinMark />
        </span>
      )}
      {post.isVideo && (
        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-snow">
          <PlayMark className="ml-px h-2 w-2" />
        </span>
      )}
      {(post.likes != null || post.comments != null) && (
        <span className="absolute inset-x-0 bottom-0 flex gap-2 bg-gradient-to-t from-ink/75 to-transparent px-1.5 pb-1 pt-5 font-display text-[10px] uppercase leading-none text-snow">
          {post.likes != null && <span>♥ {formatCount(post.likes)}</span>}
          {post.comments != null && <span>{formatCount(post.comments)} comments</span>}
        </span>
      )}
    </a>
  );
}

function PhaseLink({
  n,
  label,
  href,
  className = "",
  lineClassName = "h-32",
}: {
  n: string;
  label: string;
  href: string;
  className?: string;
  lineClassName?: string;
}) {
  return (
    <a href={href} className={`py-5 ${className}`}>
      <p className="font-display text-[12px] font-semibold uppercase tracking-tight">{n}</p>
      <div className={`my-1 border-l border-solid border-[#2c2c2c] ${lineClassName}`} />
      <p className="mt-1 font-display text-[12px] uppercase tracking-[-0.48px] text-[#ccc]">
        <span className="text-lime">{label}</span>
      </p>
    </a>
  );
}

function BarcodeMark() {
  return (
    <span className="flex h-[10px] items-stretch gap-[2px]" aria-hidden="true">
      <span className="w-px bg-current" />
      <span className="w-[3px] bg-current" />
      <span className="w-px bg-current" />
    </span>
  );
}

function Meter({ active, count }: { active: number; count: number }) {
  return (
    <div className="mt-4 flex w-[18px] flex-col gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`h-[2px] w-full ${i === active ? "bg-lime" : "bg-[#8d8d8d]"}`} />
      ))}
    </div>
  );
}

function RingMark({ ring }: { ring: ArtistEpk["ring"] }) {
  return (
    <div className="relative mx-auto h-[192px] w-[192px] sm:h-[240px] sm:w-[240px] lg:h-[264px] lg:w-[264px]">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full origin-center animate-[spin_20s_linear_infinite] overflow-visible motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path id="epk-ring-path" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text fill="#b0b0b0" fontSize={ring.fontSize} fontWeight="bold" letterSpacing="1">
          <textPath href="#epk-ring-path">{ring.text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={ring.logo} alt={ring.logoAlt} className={ring.logoClassName} />
      </div>
    </div>
  );
}

export default async function ArtistEpkPage({ params }: Params) {
  const epk = getEpk((await params).slug);
  if (!epk) notFound();

  const { hero, intro, atmosphere, rooms, signature, rider, builtOn, ring, about } = epk;
  const instagram = await getInstagramProfile(signature.instagram);
  const instagramUrl = `https://www.instagram.com/${signature.instagram}/`;
  const [firstWord, secondWord] = hero.words;
  // The 001–004 phase lines start 48px lower from tablet up. Where the headline sits right
  // below them (bottom copy), the lines get 48px shorter instead so their labels stay clear of it.
  const copyAtBottom = hero.copyPosition === "bottom";
  const phaseRowClass = copyAtBottom ? "sm:bottom-[30vh]" : "sm:bottom-[calc(30vh-48px)]";
  const phaseLineClass = copyAtBottom ? "h-32 sm:h-20" : "h-32";
  const heroWordClass = `pointer-events-none absolute top-24 font-display ${
    secondWord ? "text-[14vw]" : "text-[28vw]"
  } font-bold uppercase leading-[0.8] tracking-[-0.08em] text-lime opacity-[.15] sm:top-[180px] sm:text-[16vw] sm:opacity-100`;

  // overflow-x-clip rather than -hidden: a hidden overflow would make this div a scroll
  // container and stop the sticky intro image from sticking to the viewport.
  return (
    <div className="overflow-x-clip bg-night text-snow">
      <section
        id="hero"
        style={{ scrollMarginTop: 88 }}
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-40 pt-24 sm:px-6 sm:pb-32 sm:pt-28 lg:h-screen lg:pb-0 lg:pt-0"
      >
        <p className={`${heroWordClass} left-4 sm:left-6`} aria-hidden="true">
          {firstWord}
        </p>
        {secondWord && (
          <p className={`${heroWordClass} right-4 text-right sm:right-6`} aria-hidden="true">
            {secondWord}
          </p>
        )}
        <EpkHeroImage src={hero.image} brightness={hero.brightness} />
        <div
          className={
            hero.copyPosition === "bottom"
              ? "absolute inset-x-4 bottom-[380px] z-10 text-right sm:inset-x-auto sm:bottom-[5vh] sm:right-[2vw] lg:right-[3vw]"
              : // Tucked into the corner on laptops so it doesn't sit on the artist's face; roomier from 1536px.
                "absolute inset-x-4 top-10 z-10 sm:inset-x-auto sm:right-[6vw] sm:top-[10vh] lg:right-[2vw] lg:top-[6vh] 2xl:right-[10vw] 2xl:top-[10vh]"
          }
        >
          <h1>
            <span className="block font-display text-[clamp(62px,8vw,62px)] font-bold uppercase leading-[0.95] tracking-[-0.06em] text-lime">
              {hero.headline}
            </span>
          </h1>
          <p
            className={`mt-3 max-w-md font-display font-semibold uppercase leading-tight ${
              hero.copyPosition === "bottom" ? "" : "lg:max-w-[21rem] 2xl:max-w-md"
            }`}
            style={{ fontSize: "clamp(14px, 2vw, 20px)" }}
          >
            {hero.blurb}
          </p>
          <div className="mt-3 flex items-start gap-2 sm:mt-4">
            <span className="mt-1 h-8 w-[2px] bg-lime sm:h-[42px]" />
            <div>
              <p className="font-display text-[18px] font-semibold uppercase leading-tight tracking-[-0.08em] text-lime sm:text-[24px]">
                {epk.name}
              </p>
              <p className="mt-1 font-display text-[10px] font-semibold uppercase leading-[13.2px] tracking-tight text-[#ccc] sm:text-[12px]">
                {hero.role}
              </p>
            </div>
          </div>
        </div>
        <div className={`absolute inset-x-4 bottom-36 z-10 flex gap-4 sm:left-0 sm:right-0 sm:px-6 lg:px-10 ${phaseRowClass}`}>
          <div className="grid w-[65vw] grid-cols-3 gap-x-4 lg:w-[90vw]">
            {heroNav.map((item) => (
              <PhaseLink key={item.n} {...item} lineClassName={phaseLineClass} />
            ))}
          </div>
          <PhaseLink
            n="004"
            label="CONTACT US"
            href="#contact"
            className="sm:absolute sm:right-10 sm:top-0 sm:block sm:w-auto"
            lineClassName={phaseLineClass}
          />
        </div>
        <div className="absolute inset-x-4 bottom-2 z-10 flex flex-col gap-4 sm:bottom-[5vh] sm:left-10 sm:right-auto sm:flex-row sm:gap-10">
          <p className="font-display text-[11px] uppercase tracking-tight text-[#ccc] sm:text-[12px]">
            IDX/{epk.tag} <br /> <span className="font-bold text-lime">2026</span>
          </p>
          <div className="border-l-4 border-solid border-[#2c2c2c] pl-2 font-display text-sm uppercase sm:pl-1 sm:text-xl">
            {hero.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="intro" style={{ scrollMarginTop: 88 }} className="bg-night px-4 pb-4 sm:px-6 sm:pb-6 sm:pt-8 lg:px-32">
        <div className="p-4 sm:p-8 lg:flex lg:gap-16 lg:p-16">
          <div className="lg:w-1/2">
            <img src={intro.image} alt={intro.alt} className="h-auto w-full lg:sticky lg:top-24" />
          </div>
          <div className="mt-6 lg:mt-0 lg:flex lg:w-1/2 lg:flex-col">
            <p className="font-display text-[clamp(22px,6vw,60px)] font-bold uppercase leading-[1.05] text-[#D9D9D9]">
              {intro.statement}
            </p>
            <div
              id="tracks"
              style={{ scrollMarginTop: 88 }}
              className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3"
            >
              {intro.tracks.map((track) => (
                <TrackCard key={track.title} track={track} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex min-h-[55vh] w-full items-end sm:min-h-[65vh] lg:min-h-[80vh]">
            <div className="relative z-10 flex flex-col gap-1 px-4 py-10 sm:pl-8 lg:pl-12">
              <div
                className={`flex flex-row gap-2 text-xs uppercase text-[#ccc] sm:text-sm ${
                  atmosphere.genreBacked ? "w-fit bg-ink" : ""
                }`}
              >
                <span>INDX</span>
                <span>//{atmosphere.genre}</span>
              </div>
              <div className="w-fit rounded-sm bg-ink text-base leading-none sm:text-xl">
                <p>{atmosphere.badge}</p>
              </div>
              <p className="text-[clamp(32px,10vw,60px)] font-bold uppercase leading-[0.95] text-snow">
                NOTHING LEAVES
                <br />
                THE ROOM COLD
              </p>
            </div>
            <img
              src={atmosphere.image}
              alt={atmosphere.alt}
              className="absolute inset-0 h-full w-full object-cover"
              style={atmosphere.imagePosition ? { objectPosition: atmosphere.imagePosition } : undefined}
            />
          </div>
          <div className="grid grid-rows-[auto_auto] lg:grid-rows-[auto_1fr]">
            <div className="flex flex-col gap-2 bg-[#d1d1d1] p-4 text-ink sm:gap-1 sm:p-6">
              <p className="font-display text-[clamp(40px,12vw,90px)] font-bold uppercase leading-none text-night">atmosphere</p>
              <p className="font-display text-[clamp(40px,12vw,90px)] font-bold uppercase leading-none text-snow">not volume</p>
              {atmosphere.notes && (
                <div className="mt-4 grid grid-cols-2 gap-6 sm:mt-6 sm:gap-8">
                  {atmosphere.notes.map((copy, i) => (
                    <article key={i} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[-0.22px]">CAT — 1.0{7 + i}</p>
                        <BarcodeMark />
                      </div>
                      <span className="mb-3 mt-2 block h-[3px] w-full bg-ink" />
                      <p className="font-display text-[12px] font-semibold uppercase leading-[1.25] tracking-[-0.26px] sm:text-[13px]">
                        {copy}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex min-h-[50vh] w-full items-center justify-center sm:min-h-[55vh] lg:min-h-0">
              {atmosphere.videos.length > 1 ? (
                <div className="absolute inset-0 grid grid-cols-2">
                  {atmosphere.videos.map((src) => (
                    <div key={src} className="relative overflow-hidden">
                      <video src={src} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
                    </div>
                  ))}
                </div>
              ) : (
                <video
                  src={atmosphere.videos[0]}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,.8) 0%, rgba(0,0,0,0) 60%)" }}
              />
              <span className="bottom-0 left-0 right-0 p-4 text-left font-display text-base font-bold uppercase leading-tight text-snow mix-blend-difference sm:absolute sm:p-6 sm:text-right sm:text-2xl lg:text-4xl">
                Sets become rooms worth staying in, and nights become experiences people anticipate, remember, and come back for.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden bg-night sm:min-h-[85vh] lg:h-[100vh]">
        <div className="relative z-10 flex h-full min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center mix-blend-difference sm:min-h-[85vh] sm:px-6 lg:min-h-0 lg:px-32 lg:py-0">
          <span className="bg-lime font-display text-xs font-semibold uppercase leading-tight text-ink sm:text-sm">
            {rooms.badge}
          </span>
          <p className="mt-4 font-display text-[clamp(28px,9vw,20vh)] font-bold uppercase leading-[0.95] sm:mt-0">
            SOME ROOMS OPEN. SOME RESIST.
          </p>
          <p className="mt-8 w-full max-w-xl font-display text-xl font-bold uppercase leading-none text-[#D9D9D9] sm:mt-12 sm:text-2xl lg:mt-16 lg:w-2/5 lg:text-4xl">
            BOTH TELL YOU EXACTLY WHAT THE NIGHT NEEDS NEXT.
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-tight text-[#cfcfcf] sm:text-[12px]">
            <span className="text-snow">SOURCE </span>
            <span>— {rooms.source}</span>
          </p>
        </div>
        <img
          src={rooms.image}
          alt={rooms.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: rooms.videoPosition }}
        />
        <video
          src={rooms.video}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: rooms.videoPosition }}
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,.55) 0%, rgba(0,0,0,.25) 55%, rgba(0,0,0,0) 85%)",
          }}
        />
      </section>

      <section className="bg-lime text-ink">
        <div className="grid lg:min-h-[80vh] lg:grid-cols-[1fr_auto_1.1fr]">
          <div className="flex h-full flex-col justify-between px-4 py-10 sm:px-6 sm:py-16">
            <div>
              <h2 className="font-display text-[clamp(40px,12vw,88px)] font-bold uppercase leading-[0.9] tracking-[-3.8px]">
                SIGNATURE SOUND
              </h2>
              <p className="mt-3 font-display text-sm font-bold uppercase">
                CATALOG — {signature.catalog} <br /> SELECTED RELEASES
              </p>
              <div className="mt-6 border-l-4 border-ink pl-3 sm:mt-10">
                <p className="max-w-md font-display text-2xl font-bold uppercase leading-[1.05] tracking-[-1.2px] sm:text-4xl">
                  GROOVES BECOME SIGNALS.
                  <br />
                  RECORDS BECOME ROOMS.
                </p>
                <p className="mt-4 max-w-md font-display text-[13px] uppercase leading-[20px] tracking-[-0.28px] sm:mt-5 sm:text-[14px]">
                  {signature.releasedOn}
                </p>
              </div>
            </div>
            {/* Live posts come from src/lib/instagram.ts; the dashed tiles only show until it's configured. */}
            <div className="mt-8 sm:mt-0">
              <div className="ig-grid">
                {instagram?.posts.length
                  ? instagram.posts.map((post) => (
                      <InstagramPostTile key={post.id} post={post} handle={signature.instagram} />
                    ))
                  : Array.from({ length: igPlaceholderTiles }).map((_, i) => (
                      <a key={i} href={instagramUrl} {...external} className="ig-tile" aria-label={`@${signature.instagram} on Instagram`}>
                        <InstagramGlyph />
                        <span className="font-display text-xs uppercase leading-tight">Recent Post</span>
                      </a>
                    ))}
              </div>
              <p className="mt-3 font-display text-xs uppercase leading-tight opacity-60">
                {instagram?.posts.length
                  ? `Live from @${signature.instagram} — ${
                      instagram.posts.some((post) => post.pinned) ? "pinned + latest posts" : "latest posts"
                    }, tap through to Instagram`
                  : `Follow @${signature.instagram} on Instagram`}
              </p>
            </div>
          </div>
          <div className="hidden h-full w-24 bg-[repeating-linear-gradient(to_bottom,black_0_1px,transparent_1px_8px)] lg:block" />
          <div className="relative min-h-[45vh] lg:h-full">
            <img src={signature.image} alt={signature.alt} className="h-full w-full object-cover grayscale" />
            <a href={instagramUrl} {...external} className="ig-badge transition-opacity hover:opacity-90">
              {instagram?.avatar ? (
                <Image src={instagram.avatar} alt="" width={36} height={36} className="ig-badge-avatar object-cover" />
              ) : (
                <span className="ig-badge-avatar" aria-hidden="true" />
              )}
              <div>
                <p className="font-display text-xs uppercase leading-tight text-snow">@{signature.instagram}</p>
                <p className="font-display text-xs uppercase leading-tight text-[#cfcfcf]">
                  {instagram?.followers != null ? `Live · ${formatCount(instagram.followers)} followers` : signature.followers}
                </p>
              </div>
              <span className="ig-follow-pill font-display text-xs font-semibold uppercase text-ink">Follow</span>
            </a>
          </div>
        </div>
      </section>

      <section id="rider" style={{ scrollMarginTop: 88 }} className="bg-night px-4 pb-4 pt-12 sm:px-6 sm:pb-6 sm:pt-20">
        <p className="font-display text-[clamp(72px,28vw,50vh)] font-bold uppercase leading-none tracking-tighter text-lime">
          RIDER
        </p>
        <p className="ml-[14vw] font-display text-[clamp(22px,6vw,10vh)] font-semibold uppercase leading-[1.05] tracking-tighter text-lime">
          REQUIREMENTS
        </p>
      </section>

      <section className="bg-night px-4 pb-12 pt-4 sm:px-6 sm:pb-20 sm:pt-6">
        <div className="mt-4 divide-y divide-[#2c2c2c] border-y border-[#2c2c2c] sm:mt-6">
          {rider.modules.map((mod, i) => (
            <article
              key={mod.title}
              className="grid items-start gap-4 py-8 sm:gap-6 sm:py-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] md:gap-12"
            >
              <div className="flex min-h-0 flex-col sm:min-h-[160px]">
                <p className="font-display text-[12px] uppercase tracking-tight text-[#8d8d8d]">
                  MOD — {numerals[i]}/{epk.tag}
                </p>
                <h3 className="mt-2 text-2xl font-bold uppercase leading-none tracking-[-1.8px] text-lime sm:text-4xl">{mod.title}</h3>
                <Meter active={i} count={rider.modules.length} />
                <p className="mt-6 text-[12px] uppercase tracking-tight text-snow sm:mt-auto sm:pt-8">
                  // {String(i + 1).padStart(3, "0")}
                </p>
              </div>
              <span className="hidden self-start pt-8 font-[monospace] text-[40px] leading-none text-lime md:block" aria-hidden="true">
                →
              </span>
              <div className="border-l border-[#3a3a3a] pl-4 sm:pl-5 md:pl-8">
                <ul className="rider-checklist">
                  {mod.items.map((item) => (
                    <li key={item} className="rider-check">
                      <span className="box" />
                      <span className="label font-display text-xl font-bold uppercase leading-[1.2] tracking-[-0.28px] sm:text-2xl md:text-3xl">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 font-display text-[12px] uppercase tracking-tight text-[#8d8d8d]">
          FULL RIDER ISSUED ON CONFIRMATION. BOOKING —{" "}
          <a href={`mailto:${rider.bookingEmail}`} className="text-snow transition-opacity hover:opacity-70">
            {rider.bookingEmail}
          </a>
        </p>
      </section>

      <section className="bg-[#d9d9d9] text-ink">
        <div className="grid lg:grid-cols-2">
          <div className="relative bg-ink">
            <div className="sticky top-0 z-0 h-[55vh] w-full sm:h-[65vh] lg:h-full">
              <img src={builtOn.image} alt={builtOn.alt} className="h-full w-full object-cover grayscale" />
              <div className="absolute left-4 top-6 flex flex-col font-display text-base leading-none tracking-tight text-snow sm:left-6 sm:top-10 sm:text-xl">
                {builtOn.tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
              <p className="absolute left-4 top-[42%] max-w-[85vw] font-display text-[clamp(24px,7vw,90px)] font-bold uppercase leading-[0.95] tracking-[-1.8px] text-snow sm:left-6 sm:max-w-sm lg:whitespace-nowrap">
                TENSION BUILDS.
                <br />
                THE ROOM MOVES
                <br />
                WITH IT.
              </p>
              <p className="absolute bottom-6 left-4 max-w-[85vw] font-display text-[clamp(14px,4vw,48px)] font-bold uppercase leading-[0.95] tracking-[-1.8px] text-snow sm:bottom-10 sm:left-6 sm:max-w-sm lg:whitespace-nowrap">
                SELECTIONS LAND.
                <br />
                THE FLOOR ANSWERS.
              </p>
            </div>
          </div>
          <div className="flex flex-col px-4 py-8 sm:px-8 sm:py-12">
            <div className="flex min-h-0 flex-col">
              <h2 className="font-display font-bold uppercase tracking-tighter text-[#292929]">
                <span className="text-[clamp(28px,8vw,60px)] leading-none">ARTISTS BUILT ON</span>
                <br />
                <span className="text-[clamp(40px,12vw,12vw)] leading-none underline">AGENXY</span>
              </h2>
            </div>
            <div
              className={`${builtOn.bodyClassName ?? "mt-6"} flex min-h-0 flex-col gap-6 font-display leading-none tracking-tighter sm:gap-8`}
            >
              <p className="max-w-sm text-sm uppercase">{builtOn.blurb}</p>
              <img src={builtOn.photo} alt={builtOn.photoAlt} className="h-auto w-full object-cover grayscale" />
              <h3 className="text-[clamp(28px,8vw,64px)] font-bold uppercase">WHAT MOVES THE FLOOR IS WHAT MATTERS.</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center bg-[#ececec] px-4 py-8 text-ink sm:px-6 sm:py-10 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          <p className="max-w-[360px] font-display text-[13px] uppercase leading-[1.35] tracking-tight sm:text-[14px]">
            I READ A ROOM THE WAY IT CHANGES AS I STEP INTO IT. ENERGY RISES, DROPS, RETURNS SOMEWHERE ELSE. SOME NIGHTS LEAD TO
            EUPHORIA. SOME LEAD TO PATIENCE.
            <span className="mt-2 block font-bold">BOTH KEEP THE FLOOR MOVING.</span>
          </p>
          <div className="justify-self-center">
            <RingMark ring={ring} />
          </div>
          <p className="max-w-[360px] font-display text-[13px] uppercase leading-[1.35] tracking-tight sm:text-[14px] lg:justify-self-end lg:text-right">
            I CHASE RECORDS THAT CHANGE DIRECTION WITHOUT WARNING. A GROOVE BENDS. A VOCAL SPLITS. A LOOP BECOMES SOMETHING IT
            WASN’T BUILT TO BE. I STAY WITH IT UNTIL THE ROOM GIVES ME A REASON TO GO.
            <span className="mt-2 block font-bold">THE FLOOR IS NEVER STILL.</span>
          </p>
        </div>
      </section>

      <section
        id="about"
        style={{ scrollMarginTop: 88 }}
        className={`relative z-0 min-h-0 bg-night px-4 py-12 md:px-6 lg:px-16 lg:py-20 ${
          about.fillViewport === false ? "" : "lg:min-h-screen"
        }`}
      >
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[clamp(24px,7vw,48px)] font-bold uppercase leading-[0.95] tracking-[-1.8px] text-[#9a9a9a]">I’M</p>
              <p
                className={`mt-1 font-bold uppercase leading-[0.85] text-lime ${
                  about.nameClassName ??
                  "text-[clamp(80px,24vw,200px)] tracking-[-6px] sm:tracking-[-10px] lg:text-[min(200px,calc((100vw_-_256px)*0.11))] lg:tracking-[-0.04em]"
                }`}
              >
                {epk.name}
              </p>
              <span className="block h-[4px] w-full max-w-[280px] bg-[#8d8d8d]" />
              <p className="text-[14px] uppercase tracking-tight text-snow sm:text-[16px]">{about.tagline}</p>
              <img
                src={about.logo.src}
                alt={about.logo.alt}
                className={`mt-6 self-start ${about.logo.invert ? "invert" : ""}`}
                style={{ width: "clamp(106px, 31.9vw, 266px)", aspectRatio: about.logo.aspectRatio, height: "auto" }}
              />
              <p className="text-[12px] uppercase tracking-tight text-[#8d8d8d]">{about.subtitle}</p>
            </div>
            <blockquote className="mt-8 max-w-sm text-[22px] font-bold leading-tight tracking-[-0.32px] text-[#8d8d8d] sm:mt-4 sm:text-[28px] sm:leading-none">
              “{about.quote}”
              <footer className="mt-4 text-[12px] text-[#8d8d8d]">— {about.quoteBy}</footer>
            </blockquote>
          </div>

          <div className="flex h-full flex-col justify-between gap-8">
            <img src={about.portrait} alt={about.portraitAlt} className="mx-auto w-full max-w-[480px] object-cover" />
            <div className="flex flex-col gap-2">
              <p className="text-[32px] font-medium uppercase leading-[1.2] tracking-[-0.4px] text-snow">
                {about.plays.map((part, i) => (
                  <span key={i} className={part.bold ? "font-bold" : undefined}>
                    {part.text}
                  </span>
                ))}
              </p>
              <p className="text-[13px] leading-[1.4] tracking-[-0.13px] text-[#8d8d8d]">
                Most sets start with a groove. The room decides the next step.
              </p>
              <div>
                <span className="block h-[4px] w-full bg-[#3a3a3a]" />
                <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-[#8d8d8d]">SOCIALS</p>
                <div className="mt-3 flex items-center gap-4 text-snow">
                  {about.socials.map((social) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      {...external}
                      aria-label={social.label}
                      className="transition-opacity hover:opacity-70"
                    >
                      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
                        {socialIcons[social.icon]}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:gap-20">
            <p className="text-[clamp(24px,5vw,40px)] font-semibold uppercase leading-tight tracking-tight text-[#8d8d8d] lg:pt-8">
              {about.bio}
            </p>
            <div>
              <p className="text-[12px] uppercase tracking-tight text-[#8d8d8d]">WHAT I PLAY</p>
              <ul className="mt-3 space-y-1 border-l-4 border-[#555] pl-4 text-[18px] font-semibold uppercase leading-none tracking-tight text-snow">
                {about.whatIPlay.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href={about.listenHref}
                {...external}
                className="mt-8 inline-flex items-stretch gap-1 bg-lime text-[20px] font-bold uppercase leading-none tracking-tight text-ink"
              >
                <span>HEAR THE WORK</span>
                <span className="flex items-center" aria-hidden="true">
                  &gt;&gt;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
