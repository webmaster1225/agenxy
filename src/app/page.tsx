import Link from "next/link";
import {
  featuredWorks,
  featuredInsight,
  insightCards,
  otherWorks,
  roster,
  stats,
  team,
  testimonials,
} from "@/lib/data";
import { RollingText } from "@/components/RollingText";
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
    <article className="media-card group relative h-[656px] overflow-hidden bg-ink text-snow">
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

function TestimonialRow({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex items-center justify-between border-b border-mute px-5 py-6">
      <p className="font-display text-[40px] font-normal leading-none">
        <RollingText text={name} />
      </p>
      <img src={image} alt="" className="h-10 w-10 rounded-full object-cover" />
    </div>
  );
}

export default function HomePage() {
  const testimonialImages = [roster[0].image, roster[1].image, roster[2].image, roster[3].image, roster[0].image, roster[1].image];

  return (
    <>
      <section>
        <SectionBanner title="WORKS" index="01" aside="26'" wash />
        <div className="grid md:grid-cols-2">
          {featuredWorks.map((work) => (
            <MediaCard key={work.title} {...work} />
          ))}
        </div>
        <div className="px-5 py-8">
          <h3 className="font-koulen text-[32px] leading-[35.2px] text-mute">OTHERS</h3>
          <div className="mt-4 divide-y divide-mute border-y border-mute">
            {otherWorks.map((work) => (
              <a
                key={work.title}
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-4"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[40px] font-normal leading-none">
                    <RollingText text={work.title} />
                  </span>
                  <span className="text-[16px] leading-[19.2px] text-mute">{work.year}</span>
                </div>
                <span className="text-[16px] leading-[19.2px] text-mute">{work.artist}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-footer text-snow">
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
              {team.map((member) => (
                <article key={member.name}>
                  <div className="h-[72px] w-[72px] overflow-hidden rounded-full">
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
                <Link key={artist.name} href="/artists/each-artists" className="group flex items-center justify-between py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-koulen text-[45px] leading-[54px]">
                      <RollingText text={artist.name} />
                    </span>
                    <span className="text-[16px] leading-[19.2px] text-mute">{artist.year}</span>
                  </div>
                  <span className="text-[16px] leading-[19.2px] text-mute">{artist.role}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="py-2">
          <h3 className="px-5 py-6 font-koulen text-[24px] leading-[26.4px] text-mute">TESTIMONIALS</h3>
          {testimonials.map((item, i) => (
            <TestimonialRow key={item} name={item} image={testimonialImages[i] ?? roster[0].image} />
          ))}
        </div>
      </section>

      <section>
        <SectionBanner title="INSIGHTS" index="03" aside="7" />
        <article className="relative aspect-[1440/351] w-full overflow-hidden border-b border-mute bg-ink text-snow">
          <img src={featuredInsight.image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="relative flex h-full flex-col justify-between px-5 py-5">
            <div className="flex items-start justify-between">
              <p className="font-sans text-[27.2px] leading-[29.92px]">{featuredInsight.date}</p>
              {featuredInsight.isNew && (
                <span className="font-koulen text-[12px] leading-[12px] tracking-[-0.36px]">New</span>
              )}
            </div>
            <h3 className="max-w-[280px] font-koulen text-[32px] leading-[35.2px]">{featuredInsight.title}</h3>
          </div>
        </article>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {insightCards.map((post, i) => (
            <article
              key={`${post.title}-${i}`}
              className="flex flex-col border-b border-r border-mute px-5 pb-8 pt-5 last:border-r-0 lg:border-b-0"
            >
              <p className="font-sans text-[16px] leading-[19.2px] text-mute">{post.published}</p>
              <div className="mt-4 aspect-square w-full overflow-hidden">
                <img src={post.image} alt="" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 font-koulen text-[19.2px] leading-[21.12px]">{post.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
