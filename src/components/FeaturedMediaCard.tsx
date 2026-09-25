"use client";

import { useListen } from "@/components/ListenProvider";

export function FeaturedMediaCard({
  title,
  image,
  video,
  isNew,
  artist,
  year,
  href,
}: {
  title: string;
  image: string;
  video?: string;
  isNew?: boolean;
  artist: string;
  year?: string;
  href: string;
}) {
  const { open } = useListen();

  return (
    <button
      type="button"
      onClick={() => open({ title, artist, year, href })}
      className="group relative aspect-square w-full overflow-hidden bg-ink text-left text-snow"
    >
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
      <h3 className="absolute bottom-6 left-[20px] lg:left-[102px] font-koulen text-[14px] lg:text-[32px] leading-[35.2px]">{title}</h3>
    </button>
  );
}
