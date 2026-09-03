import {
  featuredWorks,
  otherWorks,
  aboutTeam,
  roster,
  stats,
  testimonials,
} from "@/lib/data";
import { RollingText } from "@/components/RollingText";
import { OtherWorksList } from "@/components/OtherWorksList";
import { InsightsTracks } from "@/components/InsightsTracks";
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
    <article className="media-card group relative aspect-square w-full overflow-hidden bg-ink text-snow">
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
          <p className="text-ink/75">{role}</p>
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

      <section className="relative overflow-hidden text-ink">
        <img
          src="https://framerusercontent.com/images/oN2WwOWKiJZSMcdEy2hZSU7w3Q.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="works-wash absolute inset-0" aria-hidden="true" />
        <div className="works-wash-glow absolute inset-0" aria-hidden="true" />
        <div className="works-wash-vignette absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <SectionBanner title="ABOUT" index="02" aside="10" note="Team Members" />
          <div className="grid border-b border-mute lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="border-b border-mute px-8 py-10 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <p className="font-koulen text-[16px] leading-[19.2px] text-ink/75">{stat.id}</p>
                <h3 className="mt-[250px] font-koulen text-[24px] leading-[26.4px]">{stat.label}</h3>
                <p className="mt-6 font-koulen text-[65px] leading-[65px] tracking-[-1.95px]">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid border-b border-mute lg:grid-cols-2">
            <div className="border-b border-mute px-5 py-8 lg:border-b-0 lg:border-r">
              <h3 className="font-koulen text-[24px] leading-[26.4px] text-ink/75">TEAM</h3>
              <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-10">
                {aboutTeam.map((member) => (
                  <article key={member.name}>
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="mt-4 font-koulen text-[24px] leading-[26.4px]">{member.name}</h3>
                    <p className="mt-1 font-koulen text-[24px] leading-[26.4px] text-ink/75">{member.role}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="px-5 py-8">
              <h3 className="font-koulen text-[24px] leading-[26.4px] text-ink/75">ARTISTS</h3>
              <div className="mt-10 divide-y divide-mute">
                {roster.map((artist) => (
                  <div key={artist.name} className="group flex items-center justify-between py-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-koulen text-[45px] leading-[54px]">
                        <RollingText text={artist.name} />
                      </span>
                      <span className="text-[16px] leading-[19.2px] text-ink/75">{artist.year}</span>
                    </div>
                    <span className="text-[16px] leading-[19.2px] text-ink/75">{artist.role}</span>
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
        </div>
      </section>

      <section className="relative z-10 bg-snow">
        <SectionBanner title="INSIGHTS" index="03" aside="7" note="Trending" />
        <InsightsTracks />
      </section>
    </div>
  );
}
