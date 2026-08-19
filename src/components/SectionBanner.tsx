import { RollingText } from "./RollingText";

export function SectionBanner({
  title,
  index,
  aside,
  wash = false,
  dark = false,
  note,
}: {
  title: string;
  index: string;
  aside: string;
  wash?: boolean;
  dark?: boolean;
  note?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-b border-mute ${
        wash ? "h-[370px]" : "h-[250px]"
      } ${dark ? "bg-footer text-snow" : ""}`}
    >
      {wash && (
        <>
          <img
            src="https://framerusercontent.com/images/oN2WwOWKiJZSMcdEy2hZSU7w3Q.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="works-wash absolute inset-0" />
        </>
      )}
      <div className="relative flex-col lg:flex-row flex h-full items-start lg:items-end justify-end lg:justify-between px-[30px] pb-6">
        <div className="flex items-start">
          <h2 className="font-display lg:text-[200px] text-8xl font-bold uppercase leading-[1] tracking-display md:text-[200px]">
            {title}
          </h2>
          <span className="ml-4 mt-1 font-koulen text-[34px] leading-[34px] tracking-[-0.68px] text-ember">
            {index}
          </span>
        </div>
        <div className="flex items-start gap-6">
          {note && (
            <p className="hidden pt-2 text-[24px] leading-[33.6px] tracking-[-0.72px] md:block">{note}</p>
          )}
          <p className="font-display lg:text-[200px] text-8xl font-bold uppercase leading-[1] tracking-display md:text-[200px]">
            {aside}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PageKicker({
  left,
  right,
  dark = false,
}: {
  left: string;
  right?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-end items-start justify-between px-5 pb-5 lg:pt-[200px] pt-8 lg:gap-0 gap-16 ${
        dark ? "bg-ink text-snow" : "bg-snow"
      }`}
    >
      <p className="font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">{left}</p>
      {right && (
        <p className="text-right font-display text-[14px] font-medium uppercase leading-[19.6px] tracking-[0.14px]">
          {right}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  note,
}: {
  kicker?: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="bg-snow px-4 pb-5 pt-8 md:px-5">
      {kicker && (
        <p className="mb-3 font-display text-[14px] font-medium uppercase tracking-[0.14px] text-mute">{kicker}</p>
      )}
      <h1 className="font-display lg:text-[200px] text-8xl font-semibold uppercase leading-[1.1] tracking-tightest md:text-[104px] md:leading-[114.4px] md:tracking-[-4.16px]">
        <RollingText text={title} />
      </h1>
      {note && <p className="mt-2 hidden text-sm text-mute md:block">{note}</p>}
    </div>
  );
}
