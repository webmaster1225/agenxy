type LogoMarqueeProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export function LogoMarquee({
  src = "/client-logos-marquee.png",
  alt = "Client logos",
  className = "",
}: LogoMarqueeProps) {
  return (
    <div className={`overflow-hidden bg-ink ${className}`} aria-hidden="true">
      <div className="logo-marquee-track flex w-max">
        <img src={src} alt={alt} className="h-[72px] w-auto shrink-0 object-contain md:h-[88px]" draggable={false} />
        <img src={src} alt="" className="h-[72px] w-auto shrink-0 object-contain md:h-[88px]" draggable={false} />
      </div>
    </div>
  );
}
