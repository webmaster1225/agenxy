import {
  featuredWorks,
  otherWorks,
  aboutTeam,
  roster,
  testimonials,
} from "@/lib/data";
import { getLiveInsights, getLiveSiteStats } from "@/lib/live-stats";
import { RollingText } from "@/components/RollingText";
import { OtherWorksList } from "@/components/OtherWorksList";
import { FeaturedMediaCard } from "@/components/FeaturedMediaCard";
import { InsightsTracks } from "@/components/InsightsTracks";
import { SectionBanner } from "@/components/SectionBanner";

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
      <div className="hidden flex-col lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)_auto] items-start lg:items-center gap-8 px-5 py-8 group-hover:flex lg:group-hover:grid">
        <img src={image} alt="" className="block lg:hidden h-24 w-24 rounded-full object-cover" />
        <p className="font-display text-2xl lg:text-[40px] font-normal leading-none">
          <RollingText text={name} />
        </p>
        <div className="w-full min-w-0 max-w-none">
          <p className="font-koulen text-[14px] uppercase tracking-[0.18em] text-ink/55">Testimonial</p>
          <p className="mt-3 font-display text-3xl font-bold uppercase leading-none lg:text-[44px]">
            {person}
          </p>
          <p className="mt-1 font-display text-3xl font-bold uppercase leading-none text-ink/75 lg:text-[44px]">
            {role}
          </p>
          <p className="mt-6 w-full max-w-4xl font-display text-xl font-normal leading-[1.35] text-ink/90 lg:text-[28px] lg:leading-[1.3]">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
        <div className="hidden lg:flex shrink-0 items-center gap-3">
          <img src={image} alt="" className="h-24 w-24 rounded-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const siteStats = getLiveSiteStats();
  const insights = getLiveInsights();

  return (
    <div className="bg-snow pb-16">
      <section className="bg-snow">
        <SectionBanner title="WORKS" index="01" aside="26'" wash />
        <div className="grid lg:grid-cols-2 grid-cols-1 h-fit">
          {featuredWorks.map((work) => (
            <FeaturedMediaCard key={work.title} {...work} />
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
            {siteStats.map((stat) => (
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
                  <article key={member.name} className="flex flex-col items-center justify-center">
                    <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
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

          <div className="border-t border-mute px-5 pb-2 pt-8">
            <h3 className="font-koulen text-[24px] leading-[26.4px] text-ink/75">TESTIMONIALS</h3>
            <p className="mt-3 max-w-2xl font-display text-[16px] leading-[22px] text-ink/75">
              What artists, labels, and partners say about working with Agenxy — from Yalla Habebe and
              Berin to Trip and Bass and beyond.
            </p>
            <div className="mt-8">
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
        </div>
      </section>

      <section className="relative z-10 bg-snow">
        <SectionBanner title="INSIGHTS" index="03" aside="7" note="Trending" />
        <InsightsTracks
          featured={insights.featured}
          tracks={insights.tracks}
          updatedAt={insights.updatedAt}
          source={insights.source}
        />
      </section>
    </div>
  );
}
