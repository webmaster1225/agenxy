const labels = [
  "Sony",
  "Universal",
  "Empire",
  "John Summit",
  "Alesso",
  "Vintage Culture",
  "Yalla Habebe",
  "Mady Minton",
  "Berin",
];

type LogoMarqueeProps = {
  className?: string;
};

function LabelRow() {
  return (
    <div className="flex shrink-0 items-center gap-10 px-5 md:gap-14 md:px-8">
      {labels.map((label) => (
        <span
          key={label}
          className="shrink-0 whitespace-nowrap font-display text-[28px] font-semibold uppercase leading-none tracking-[-1.2px] text-snow md:text-[40px] md:tracking-[-1.6px]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function LogoMarquee({ className = "" }: LogoMarqueeProps) {
  return (
    <div className={`overflow-hidden bg-ink py-8 md:py-10 ${className}`} aria-hidden="true">
      <div className="logo-marquee-track flex w-max">
        <LabelRow />
        <LabelRow />
      </div>
    </div>
  );
}
