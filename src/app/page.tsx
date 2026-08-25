import Link from "next/link";
import {
  featuredWorks,
  featuredTrack,
  trackStats,
  otherWorks,
  aboutTeam,
  roster,
  stats,
  testimonials,
} from "@/lib/data";
import { RollingText } from "@/components/RollingText";
import { OtherWorksList } from "@/components/OtherWorksList";
import { ScrollCenterOpacity } from "@/components/ScrollCenterOpacity";
import { SectionBanner } from "@/components/SectionBanner";

function MediaCard({
  title,
  image,
  video,
  isNew,
}: {
  title: string;
  image: string;
  video?: string;
  isNew?: boolean;
}) {
  return (
    <article className="media-card group relative lg:h-[656px] h-[70vw] overflow-hidden bg-ink text-snow">
      {video ? (
        <video src={video} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
      ) : (
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      )}
      {isNew && (
        <span className="absolute left-5 top-5 font-koulen text-[12px] leading-[12px] tracking-[-0.36px] text-snow">
          New
        </span>
      )}
      <h3 className="absolute bottom-6 left-[102px] font-koulen text-[32px] leading-[35.2px]">{title}</h3>
    </article>
  );
}

function TestimonialRow({
  name,
  person,
  role,
  quote,
  image,
}: {
  name: string;
  person: string;
  role: string;
  quote: string;
  image: string;
}) {
  return (
    <div className="group border-b border-mute">
      {/* collapsed row */}
      <div className="flex items-center justify-between px-5 py-6 group-hover:hidden">
        <p className="font-display text-2xl lg:text-[40px] font-normal leading-none">
          <RollingText text={name} />
        </p>
        <img src={image} alt="" className="h-10 w-10 rounded-full object-cover" />
      </div>
      {/* expanded row on hover */}
      <div className="hidden flex-col lg:grid-cols-[1fr_1fr_auto] items-start lg:items-center gap-6 px-5 py-6 group-hover:flex lg:group-hover:grid">
        <img src={image} alt="" className="block lg:hidden h-10 w-10 rounded-full object-cover" />
        <p className="font-display text-2xl lg:text-[40px] font-normal leading-none">
          <RollingText text={name} />
        </p>
        <div className="font-display text-2xl font-bold uppercase">
          <p>{person}</p>
          <p className="text-mute">{role}</p>
          <p className="mt-4 max-w-sm">{quote}</p>
        </div>
        <div className="hidden lg:flex shrink-0 items-center gap-3">
          <img src={image} alt="" className="h-10 w-10 rounded-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-snow pb-16">
      <section className="bg-snow">
        <SectionBanner title="WORKS" index="01" aside="26'" wash />
        <div className="grid lg:grid-cols-2 grid-cols-1 h-fit">
          {featuredWorks.map((work) => (
            <MediaCard key={work.title} {...work} />
          ))}
        </div>
        <div className="px-5 py-8">
          <h3 className="font-koulen text-[32px] leading-[35.2px] text-mute">OTHERS</h3>
          <OtherWorksList works={otherWorks} />
        </div>
      </section>

      <section className="bg-ink text-snow">
        <SectionBanner title="ABOUT" index="02" aside="10" dark note="Team Membrs" />
        <div className="grid border-b border-mute lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="border-b border-mute px-8 py-10 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <p className="font-koulen text-[16px] leading-[19.2px] text-mute">{stat.id}</p>
              <h3 className="mt-[250px] font-koulen text-[24px] leading-[26.4px]">{stat.label}</h3>
              <p className="mt-6 font-koulen text-[65px] leading-[65px] tracking-[-1.95px]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid border-b border-mute lg:grid-cols-2">
          <div className="border-b border-mute px-5 py-8 lg:border-b-0 lg:border-r">
            <h3 className="font-koulen text-[24px] leading-[26.4px] text-mute">TEAM</h3>
            <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-10">
              {aboutTeam.map((member) => (
                <article key={member.name}>
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-4 font-koulen text-[24px] leading-[26.4px]">{member.name}</h3>
                  <p className="mt-1 font-koulen text-[24px] leading-[26.4px] text-mute">{member.role}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="px-5 py-8">
            <h3 className="font-koulen text-[24px] leading-[26.4px] text-mute">ARTISTS</h3>
            <div className="mt-10 divide-y divide-mute">
              {roster.map((artist) => (
                <div key={artist.name} className="group flex items-center justify-between py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-koulen text-[45px] leading-[54px]">
                      <RollingText text={artist.name} />
                    </span>
                    <span className="text-[16px] leading-[19.2px] text-mute">{artist.year}</span>
                  </div>
                  <span className="text-[16px] leading-[19.2px] text-mute">{artist.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-2">
          {testimonials.map((item) => (
            <TestimonialRow
              key={item.name}
              name={item.name}
              person={item.person}
              role={item.role}
              quote={item.quote}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 bg-snow">
        <SectionBanner title="INSIGHTS" index="03" aside="7" note="Trending" />
        <a
          href={featuredTrack.href}
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-[1440/600] w-full h-[100vw] lg:h-auto overflow-hidden border-b border-mute bg-ink text-snow"
        >
          <img
            src={featuredTrack.image}
            alt={featuredTrack.title}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/20" />
          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[16px] leading-[19.2px] text-snow/80">{featuredTrack.artist}</p>
                <p className="mt-1 font-koulen text-[27.2px] leading-[29.92px]">Catalog pulse</p>
              </div>
              <span className="rounded-[4px] bg-blood px-2 py-1 font-koulen text-[12px] leading-[12px] tracking-[-0.36px]">
                {featuredTrack.badge}
              </span>
            </div>
            <div>
              <h3 className="font-koulen text-[40px] leading-[44px] lg:text-[56px] lg:leading-[56px]">
                {featuredTrack.title}
              </h3>
              <div className="mt-5 grid max-w-xl grid-cols-3 gap-4 border-t border-snow/30 pt-4">
                <div>
                  <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Streams</p>
                  <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featuredTrack.streams}</p>
                </div>
                <div>
                  <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Playlists</p>
                  <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featuredTrack.playlists}</p>
                </div>
                <div>
                  <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-snow/60">Chart</p>
                  <p className="mt-1 font-koulen text-[28px] leading-none lg:text-[36px]">{featuredTrack.chart}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
        <div className="grid grid-cols-1 bg-snow sm:grid-cols-2 lg:grid-cols-3">
          {trackStats.map((track) => (
            <a
              key={track.title}
              href={track.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col border-b border-mute px-5 pb-8 pt-5 transition-colors hover:bg-paper sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-sans text-[16px] leading-[19.2px] text-mute">{track.artist}</p>
                <span
                  className={`rounded-[4px] px-2 py-1 font-koulen text-[12px] leading-[12px] tracking-[-0.36px] text-snow ${
                    track.badge === "Trending" ? "bg-ember" : "bg-blood"
                  }`}
                >
                  {track.badge}
                </span>
              </div>
              <div className="mt-4 aspect-square w-full overflow-hidden bg-ink/5">
                <img
                  src={track.image}
                  alt={track.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-5 font-koulen text-[24px] leading-[26.4px]">{track.title}</h3>
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-mute">Streams</p>
                  <p className="mt-1 font-koulen text-[22px] leading-none">{track.streams}</p>
                </div>
                <div>
                  <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-mute">Playlists</p>
                  <p className="mt-1 font-koulen text-[22px] leading-none">{track.playlists}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
