export function EpkHeroImage({ src, brightness = 100 }: { src: string; brightness?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute bottom-0 flex h-[60%] lg:h-[90%] w-full items-center justify-center overflow-hidden"
        style={{ minWidth: 5, minHeight: 5 }}
      >
        <div role="presentation" className="relative h-full w-full overflow-hidden">
          <div
            role="presentation"
            className="h-full w-full"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundSize: "contain",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              filter: `brightness(${brightness}%) grayscale(0%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
