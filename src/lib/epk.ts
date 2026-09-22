/**
 * Artist EPK content, ported from the static handoff packages
 * (`<slug>-epk-handoff/`). Copy and imagery are per artist; the layout lives in
 * `src/app/artists/[slug]/page.tsx`. Assets are served from `/public/artists/<slug>/`.
 * Spotify track IDs and social URLs were checked against each platform on 2026-09-22.
 */

import type { ListenTrack } from "@/lib/spotify";

export type EpkRichText = { text: string; bold?: boolean }[];

export type EpkSocialIcon =
  | "spotify"
  | "soundcloud"
  | "beatport"
  | "apple-music"
  | "tracklists"
  | "instagram"
  | "facebook";

export type EpkSocial = { icon: EpkSocialIcon; label: string; href: string };

export type EpkTrack = {
  title: string;
  caption: string;
  cover: string;
  alt: string;
  /** Opens the site's Spotify player; omit for unreleased tracks. */
  listen?: ListenTrack;
};

export type EpkRiderModule = { title: string; items: string[] };

export type ArtistEpk = {
  slug: string;
  name: string;
  /** Short identifier used in `IDX/…` and `MOD — …/…` tags. */
  tag: string;
  metaTitle: string;
  hero: {
    /** One word spans the left edge; two words split left / right. */
    words: string[];
    image: string;
    brightness?: number;
    /** Where the headline block sits: top-right (default) or bottom-right. */
    copyPosition?: "top" | "bottom";
    headline: string;
    blurb: string;
    role: string;
    tags: string[];
  };
  intro: { image: string; alt: string; statement: string; tracks: EpkTrack[] };
  atmosphere: {
    genre: string;
    /** Puts the INDX label on a dark chip so it reads over a light photo. */
    genreBacked?: boolean;
    badge: string;
    image: string;
    alt: string;
    imagePosition?: string;
    notes?: [string, string];
    /** One video fills the panel; two sit side by side. */
    videos: string[];
  };
  rooms: {
    badge: string;
    source: string;
    image: string;
    alt: string;
    video: string;
    /** Focal point for the full-bleed video, which crops hard on narrow screens. */
    videoPosition?: string;
  };
  signature: {
    catalog: string;
    releasedOn: string;
    instagram: string;
    /** Shown until live Instagram data is configured (see `src/lib/instagram.ts`). */
    followers: string;
    image: string;
    alt: string;
  };
  rider: { modules: EpkRiderModule[]; bookingEmail: string };
  builtOn: {
    image: string;
    alt: string;
    tags: string[];
    blurb: string;
    photo: string;
    photoAlt: string;
    /** Replaces the default `mt-6` gap above the blurb / photo stack. */
    bodyClassName?: string;
  };
  ring: {
    text: string;
    /**
     * Text past the end of the circular path (~515 units) is silently clipped, so size this to leave a small gap;
     * check it in the browser after changing `text`.
     */
    fontSize: number;
    logo: string;
    logoAlt: string;
    logoClassName: string;
  };
  about: {
    /** Replaces the default size and tracking of the big name. */
    nameClassName?: string;
    /** Stretch the section to the viewport height on desktop. Defaults to true. */
    fillViewport?: boolean;
    tagline: string;
    logo: { src: string; alt: string; aspectRatio: string; invert?: boolean };
    subtitle: string;
    quote: string;
    quoteBy: string;
    portrait: string;
    portraitAlt: string;
    plays: EpkRichText;
    socials: EpkSocial[];
    bio: string;
    whatIPlay: string[];
    listenHref: string;
  };
};

/** The booking rider every artist on the template currently ships with. */
function standardRider(name: string, pronoun: "he" | "she"): EpkRiderModule[] {
  return [
    {
      title: "BOOTH & EQUIPMENT",
      items: [
        "4X PIONEER CDJ-3000",
        "1X PIONEER DJM-V10 (OR DJM-900NXS2)",
        "SPARE RCA CABLES ON HAND",
        "SPARE XLR CABLES ON HAND",
        "SPARE USB CONNECTORS ON HAND",
      ],
    },
    {
      title: "SOUND & STAGE",
      items: [
        "HIGH-QUALITY PA, CLEAR AND POWERFUL",
        "2X STAGE MONITORS ON INDEPENDENT VOLUME",
        "BOOTH AT A COMFORTABLE, SECURE, STABLE HEIGHT WITH ROOM TO MOVE",
        `NOBODY TOUCHES THE DJ WHILE ${pronoun.toUpperCase()} PLAYS`,
      ],
    },
    {
      title: "ACCOMMODATION",
      items: [
        "4+ STAR HOTEL",
        "ROOM FOR TWO",
        "BREAKFAST INCLUDED",
        "GYM ACCESS",
        "LATE CHECK-OUT OPTION",
        "3L BOTTLED WATER IN ROOM",
        "FRESH FRUIT PLATTER IN ROOM",
      ],
    },
    {
      title: "CLUB HOSPITALITY",
      items: [
        "6X SMALL SPARKLING WATER",
        "6X SMALL STILL WATER",
        "3X SMALL BEERS",
        "1X BOTTLE WHITE WINE (SAUVIGNON BLANC OR PINOT GRIGIO)",
        "NAPKINS OR A TOWEL AT THE BOOTH",
        "FOOD PROVIDED IF A MEAL IS MISSED",
      ],
    },
    {
      title: "TRAVEL & DEPARTURE",
      items: [`DRIVER OR PROMOTER HAS ${name}’S ROOM NUMBER`, "WAKE-UP CALL ARRANGED FOR THE DEPARTURE FLIGHT"],
    },
  ];
}

const socialLabels: Record<EpkSocialIcon, string> = {
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  beatport: "Beatport",
  "apple-music": "Apple Music",
  tracklists: "1001Tracklists",
  instagram: "Instagram",
  facebook: "Facebook",
};

/** Keeps the icon row in a fixed order; platforms without a confirmed profile are left out. */
function socialLinks(links: Partial<Record<EpkSocialIcon, string>>): EpkSocial[] {
  return (Object.keys(socialLabels) as EpkSocialIcon[]).flatMap((icon) =>
    links[icon] ? [{ icon, label: socialLabels[icon], href: links[icon] }] : [],
  );
}

const spotifyTrack = (id: string) => `https://open.spotify.com/track/${id}`;

const berin: ArtistEpk = {
  slug: "berin",
  name: "BERIN",
  tag: "BRN",
  metaTitle: "BERIN — DJ & Producer · Melodic House / Afro House / Indie Dance | AGENXY",
  hero: {
    words: ["BERIN"],
    image: "/artists/berin/berin-hero-cutout.png",
    headline: "INTERNATIONAL.",
    blurb:
      "SHARING STAGES WITH ESTABLISHED GLOBAL NAMES AND DELIVERING FORWARD-THINKING SETS ACROSS IBIZA, MIAMI, NEW YORK, AND DUBAI.",
    role: "DJ-PRODUCER/AFRO HOUSE",
    tags: ["MELODIC HOUSE", "AFRO HOUSE", "INDIE DANCE", "16M+ STREAMS"],
  },
  intro: {
    image: "/artists/berin/berin-section2-cutout.png",
    alt: "BERIN, cut out against the page background, looking over his shoulder",
    statement:
      "A SET IS AN ARC, NOT A PLAYLIST — A ROOM MOVED FROM DEEP HYPNOTIC GROOVE THROUGH TO PEAK-TIME AFRO ENERGY.",
    tracks: [
      {
        title: "TIPSY (MAKE THE GIRLS DANCE)",
        caption: "Supported by Black Coffee, Hugel and Diplo. Afro House",
        cover: "/artists/berin/cover-tipsy.png",
        alt: "“Tipsy” on Make The Girls Dance — cover art",
        listen: { title: "Tipsy", artist: "Berin", year: "2026", href: spotifyTrack("1bEGTX9PSTuDMCUZbiq3Lt") },
      },
      {
        title: "AMARE (NO.1 INDIA)",
        caption: "No.1 India, No.1 Hong Kong, No.1 South Africa. Afro House",
        cover: "/artists/berin/cover-amare.jpg",
        alt: "“Amare” — cover art",
        listen: { title: "Amaré", artist: "Berin", year: "2023", href: spotifyTrack("08FKcAXOTGZUpddiYadWBn") },
      },
      {
        title: "LANDING ZONE (BTFLY FX)",
        caption: "With Joezi and Rbor on Btfly FX. Afro House",
        cover: "/artists/berin/cover-landing-zone.jpg",
        alt: "“Landing Zone” with Joezi and Rbor — cover art",
        listen: { title: "Landing Zone", artist: "Joezi, RBØR, Berin", year: "2026", href: spotifyTrack("319zNz1u9KHf5IOiA7VYXl") },
      },
      {
        title: "BLACKWATER (KLUB RECORD)",
        caption: "With Stein on Klub Record. Indie Dance",
        cover: "/artists/berin/cover-blackwater.png",
        alt: "“Blackwater EP” with Stein — cover art",
        listen: { title: "Blackwater", artist: "Berin, STEIN (US)", year: "2026", href: spotifyTrack("5BWjtNm6laJJFTWeZkWdCk") },
      },
      {
        title: "EXOTICA (40+ COUNTRIES)",
        caption: "Charted in 100+ charts across 40+ countries. Afro House",
        cover: "/artists/berin/cover-exotica.jpg",
        alt: "“Exotica” — cover art",
        listen: { title: "Exotica", artist: "Berin", year: "2024", href: spotifyTrack("7snSowWS3YfB9VInYby3V0") },
      },
      {
        title: "DON’T TOUCH (KLUB RECORD)",
        caption: "Released on Klub Record. Afro House",
        cover: "/artists/berin/cover-dont-touch.jpg",
        alt: "“Don’t Touch” on Klub Record — cover art",
        listen: { title: "Don’t Touch", artist: "Berin", year: "2026", href: spotifyTrack("43PS0efVTm5xAhjYBE6Kty") },
      },
    ],
  },
  atmosphere: {
    genre: "AFRO HOUSE",
    badge: "ACTIVE SINCE 2011",
    image: "/artists/berin/berin-portrait-studio.jpg",
    alt: "BERIN in sunglasses and an open printed shirt over a white tank, studio portrait",
    imagePosition: "50% 25%",
    notes: [
      "I WORK BETWEEN TENSION AND RELEASE. WHERE A HYPNOTIC GROOVE HOLDS THE ROOM. WHERE THE LIFT ARRIVES ONLY ONCE IT IS EARNED.",
      "PEAK TIME IS THE STATE I BUILD TOWARD— FRESH SELECTIONS, UNRELEASED MATERIAL, AND AN ENERGY THAT KEEPS EVOLVING.",
    ],
    videos: ["/artists/berin/video/berin-live-multicam.mp4"],
  },
  rooms: {
    badge: "PEAK-TIME AFRO",
    source: "TOUR NOTES",
    image: "/artists/berin/berin-portrait-shades.jpg",
    alt: "High-contrast red portrait of BERIN in sunglasses",
    video: "/artists/berin/video/berin-spazio.mp4",
  },
  signature: {
    catalog: "2011/2026",
    releasedOn:
      "RELEASED ON MAKE THE GIRLS DANCE, ARMADA MUSIC, KONTOR RECORDS, GLASGOW UNDERGROUND, KLUB RECORD AND NERVOUS RECORDS.",
    instagram: "iamdjberin",
    followers: "49.3K followers",
    image: "/artists/berin/berin-portrait-walk.jpg",
    alt: "BERIN walking, full-length candid studio portrait",
  },
  rider: { modules: standardRider("BERIN", "he"), bookingEmail: "berin@agenxy.com" },
  builtOn: {
    image: "/artists/berin/berin-portrait-dark-shirt.jpg",
    alt: "BERIN in a black shirt over a white tank, studio portrait",
    tags: ["MELODIC", "AFRO", "INDIE DANCE", "PEAK TIME"],
    blurb:
      "Sets shaped by touring, instinct and the read of a room. Deep hypnotic groove through to peak-time Afro energy. Each night begins as a question.",
    photo: "/artists/berin/berin-graffiti-wide.jpg",
    photoAlt: "Berin in front of a colorful graffiti mural wall",
  },
  ring: {
    text: "MELODIC * AFRO * INDIE DANCE",
    fontSize: 29,
    logo: "/artists/berin/berin-logo-brush.png",
    logoAlt: "BERIN brush wordmark",
    logoClassName: "h-[106px] w-auto sm:h-[142px]",
  },
  about: {
    tagline: "TOURING BETWEEN MIAMI, NEW YORK, IBIZA AND DUBAI.",
    logo: { src: "/artists/berin/berin-logo-brush.png", alt: "BERIN brush wordmark", aspectRatio: "1400/1091", invert: true },
    subtitle: "DJ & Producer · Miami / New York",
    quote:
      "Fresh selections, unreleased material, and an evolving energy that keeps the room engaged from the first record to the last.",
    quoteBy: "BERIN, Press-Kit 2026",
    portrait: "/artists/berin/berin-logo-backdrop.jpg",
    portraitAlt: "Full-length portrait of BERIN standing in front of his brush-lettered wordmark",
    plays: [
      { text: "I PLAY ACROSS " },
      { text: "MELODIC HOUSE, AFRO HOUSE,", bold: true },
      { text: " AND " },
      { text: "INDIE DANCE.", bold: true },
    ],
    socials: socialLinks({
      spotify: "https://open.spotify.com/artist/55vo1zTUTU1TabwCCMMbfv",
      soundcloud: "https://soundcloud.com/iamdjberin",
      beatport: "https://www.beatport.com/artist/berin/127104",
      "apple-music": "https://music.apple.com/us/artist/berin/348854537",
      tracklists: "https://www.1001tracklists.com/artist/v5pmcn4/berin/index.html",
      instagram: "https://www.instagram.com/iamdjberin/",
      facebook: "https://www.facebook.com/iamdjberin/",
    }),
    bio: "I’M A US-BASED ARTIST BETWEEN MIAMI AND NEW YORK, ACTIVE SINCE 2011. SOME RECORDS LAND STRAIGHT AWAY, OTHERS TAKE A SEASON TO FIND THEIR ROOM.",
    whatIPlay: [
      "MELODIC HOUSE",
      "AFRO HOUSE",
      "INDIE DANCE",
      "CLUB SETS",
      "FESTIVAL SETS",
      "ORIGINAL PRODUCTIONS",
      "COLLABORATIONS",
      "LABEL RELEASES",
    ],
    listenHref: "https://open.spotify.com/artist/55vo1zTUTU1TabwCCMMbfv",
  },
};

const yallaHabebe: ArtistEpk = {
  slug: "yalla-habebe",
  name: "YALLA HABEBE",
  tag: "YA/HB",
  metaTitle: "YALLA HABEBE — DJ & Producer · Melodic House / Afro House / Indie Dance / Tech House | AGENXY",
  hero: {
    words: ["YALLA", "HABEBE"],
    image: "/artists/yalla-habebe/yalla-hero-mask.png",
    brightness: 110,
    copyPosition: "bottom",
    headline: "INTERNATIONAL.",
    blurb:
      "SHARING STAGES WITH ESTABLISHED GLOBAL NAMES AND DELIVERING FORWARD-THINKING SETS ACROSS MIAMI, NEW YORK, IBIZA, DUBAI, TORONTO, MONTREAL, TULUM, AND LOS ANGELES.",
    role: "DJ-PRODUCER/AFRO HOUSE",
    tags: ["MELODIC HOUSE", "AFRO HOUSE", "INDIE DANCE", "TECH HOUSE", "16M+ STREAMS"],
  },
  intro: {
    image: "/artists/yalla-habebe/yalla-section2-cutout.png",
    alt: "YALLA HABEBE, cut out against the page background, in a checkered scarf mask and white outfit",
    statement:
      "A SET IS AN ARC, NOT A PLAYLIST — A ROOM MOVED FROM DEEP HYPNOTIC GROOVE THROUGH TO PEAK-TIME AFRO ENERGY.",
    tracks: [
      {
        title: "MOVE YA BODY",
        caption: "Out now.",
        cover: "/artists/yalla-habebe/cover-move-ya-body.png",
        alt: "“Move Ya Body” — cover art",
        listen: { title: "Move Ya Body", artist: "Yalla Habebe", year: "2025", href: spotifyTrack("58pWWWIePapqY8IjRdGauf") },
      },
      {
        title: "AH YE BABA",
        caption: "Out now.",
        cover: "/artists/yalla-habebe/cover-ah-ye-baba.png",
        alt: "“Ah Ye Baba” — cover art",
        listen: { title: "Ah Ye Baba", artist: "Yalla Habebe, Noir Glacé", year: "2025", href: spotifyTrack("4hpo3Csm8F7ksJs71JCgIw") },
      },
      {
        title: "LET ME GO",
        caption: "Out now.",
        cover: "/artists/yalla-habebe/cover-let-me-go.png",
        alt: "“Let Me Go” — cover art",
        listen: { title: "Let Me Go", artist: "Yalla Habebe, Noir Glacé", year: "2025", href: spotifyTrack("1y87F4DljiY10jLqdUDq2R") },
      },
      {
        title: "QAWEYA",
        caption: "Out now.",
        cover: "/artists/yalla-habebe/cover-qaweya.png",
        alt: "“QAWEYA” — cover art",
        listen: { title: "Qaweya", artist: "Yalla Habebe", year: "2026", href: spotifyTrack("0FWyPIISxznSSwYy9SsKy5") },
      },
      {
        title: "THE WAY I ARE",
        caption: "Out now.",
        cover: "/artists/yalla-habebe/cover-the-way-i-are.png",
        alt: "“The Way I Are” — cover art",
        listen: { title: "The Way I Are", artist: "Yalla Habebe", year: "2025", href: spotifyTrack("32OCYo7vNetSrFhn7BX5bo") },
      },
      {
        title: "GUESS WHO’S BACK (SUNSET GATHERING)",
        caption: "With Berin, KIDY and DJ Purple. Out now.",
        cover: "/artists/yalla-habebe/cover-sunset-gathering.png",
        alt: "“Guess Who’s Back” by Berin, Yalla Habebe, KIDY and DJ Purple on Sunset Gathering — cover art",
        listen: { title: "Guess Who’s Back", artist: "Berin, Yalla Habebe, KIDY, DJ Purple", year: "2026", href: spotifyTrack("2qluikQ4RXfXqxtBHPfo8b") },
      },
    ],
  },
  atmosphere: {
    genre: "AFRO HOUSE",
    genreBacked: true,
    badge: "ACTIVE SINCE 2025",
    image: "/artists/yalla-habebe/yalla-portrait-studio.jpg",
    alt: "YALLA HABEBE in sunglasses and a black balaclava, seated studio portrait, full length",
    videos: ["/artists/yalla-habebe/video/yalla-section3.mp4", "/artists/yalla-habebe/video/yalla-section3b.mp4"],
  },
  rooms: {
    badge: "PEAK-TIME AFRO",
    source: "TOUR NOTES",
    image: "/artists/yalla-habebe/berin-portrait-shades.jpg",
    alt: "High-contrast red portrait, DJ in sunglasses",
    video: "/artists/yalla-habebe/video/yalla-section4.mp4",
    videoPosition: "70% 50%",
  },
  signature: {
    catalog: "2025/2026",
    releasedOn:
      "RELEASED ON MAKE THE GIRLS DANCE, ARMADA MUSIC, KONTOR RECORDS, GLASGOW UNDERGROUND, KLUB RECORD AND NERVOUS RECORDS.",
    instagram: "yallahabebe",
    followers: "4.2K followers",
    image: "/artists/yalla-habebe/yalla-portrait-walk.jpg",
    alt: "YALLA HABEBE, full-length candid studio portrait",
  },
  rider: { modules: standardRider("YALLA HABEBE", "he"), bookingEmail: "yallahabebe@agenxy.com" },
  builtOn: {
    image: "/artists/yalla-habebe/yalla-portrait-dark-shirt.jpg",
    alt: "YALLA HABEBE against a blue backdrop, hand raised to his chin",
    tags: ["MELODIC", "AFRO", "INDIE DANCE", "TECH", "PEAK TIME"],
    blurb:
      "Sets shaped by touring, instinct and the read of a room. Deep hypnotic groove through to peak-time Afro energy. Each night begins as a question.",
    photo: "/artists/yalla-habebe/yalla-portrait-profile.jpg",
    photoAlt: "YALLA HABEBE in profile, black scarf mask, moody studio portrait",
    bodyClassName: "mt-10",
  },
  ring: {
    text: "MELODIC * AFRO * INDIE DANCE * TECH",
    fontSize: 23,
    logo: "/artists/yalla-habebe/yalla-logo-text.png",
    logoAlt: "YALLA HABEBE wordmark",
    logoClassName: "w-[117px] h-auto sm:w-[149px] lg:w-[164px]",
  },
  about: {
    nameClassName:
      "text-[clamp(80px,24vw,200px)] lg:text-[56px] tracking-[-6px] sm:tracking-[-10px] lg:tracking-[-2px]",
    fillViewport: false,
    tagline: "TOURING BETWEEN MIAMI, NEW YORK, IBIZA, DUBAI, TORONTO, MONTREAL, TULUM, AND LOS ANGELES.",
    logo: { src: "/artists/yalla-habebe/yalla-logo-white.png", alt: "YALLA HABEBE logo mark", aspectRatio: "1536/1024" },
    subtitle: "DJ & Producer · Miami / New York",
    quote:
      "Fresh selections, unreleased material, and an evolving energy that keeps the room engaged from the first record to the last.",
    quoteBy: "YALLA HABEBE, Press-Kit 2026",
    portrait: "/artists/yalla-habebe/yalla-logo-backdrop.png",
    portraitAlt: "YALLA HABEBE in a hooded mask and sunglasses, close portrait",
    plays: [
      { text: "I PLAY ACROSS " },
      { text: "MELODIC HOUSE, AFRO HOUSE, INDIE DANCE,", bold: true },
      { text: " AND " },
      { text: "TECH HOUSE.", bold: true },
    ],
    // No Facebook or 1001Tracklists profile found for Yalla Habebe yet.
    socials: socialLinks({
      spotify: "https://open.spotify.com/artist/3XO5mDGAQYNmCOit3zZJ1i",
      soundcloud: "https://soundcloud.com/yallahabebe",
      beatport: "https://www.beatport.com/artist/yalla-habebe/1348195",
      "apple-music": "https://music.apple.com/us/artist/yalla-habebe/1818894382",
      instagram: "https://www.instagram.com/yallahabebe/",
    }),
    bio: "I’M A US-BASED ARTIST BETWEEN MIAMI AND NEW YORK, ACTIVE SINCE 2025. SOME RECORDS LAND STRAIGHT AWAY, OTHERS TAKE A SEASON TO FIND THEIR ROOM.",
    whatIPlay: [
      "MELODIC HOUSE",
      "AFRO HOUSE",
      "INDIE DANCE",
      "TECH HOUSE",
      "CLUB SETS",
      "FESTIVAL SETS",
      "ORIGINAL PRODUCTIONS",
      "COLLABORATIONS",
      "LABEL RELEASES",
    ],
    listenHref: "https://open.spotify.com/artist/3XO5mDGAQYNmCOit3zZJ1i",
  },
};

const madyMinton: ArtistEpk = {
  slug: "mady-minton",
  name: "MADY MINTON",
  tag: "MM",
  metaTitle: "MADY MINTON — DJ & Producer · Melodic House / Afro House / Indie Dance / Tech House | AGENXY",
  hero: {
    words: ["MADY", "MINTON"],
    image: "/artists/mady-minton/mady-minton-hero-mask.png",
    brightness: 110,
    copyPosition: "bottom",
    headline: "TRIP. BASS. REPEAT.",
    blurb:
      "NEW MUSIC FROM MADY MINTON, OUT NOW ON TRIP AND BASS RECORDS. TOURING MIAMI, NEW YORK, IBIZA, DUBAI, TORONTO, MONTREAL, TULUM, AND LOS ANGELES.",
    role: "DJ-PRODUCER/AFRO HOUSE",
    tags: ["MELODIC HOUSE", "AFRO HOUSE", "INDIE DANCE", "TECH HOUSE"],
  },
  intro: {
    image: "/artists/mady-minton/mady-minton-section2-cutout.png",
    alt: "Mady Minton, cut out against the page background",
    statement: "EVERY RELEASE IS A SIGNAL — LOW END AND NEON HOOKS, BUILT FOR THE ROOM TO ANSWER BACK.",
    tracks: [
      {
        title: "OH MY",
        caption: "Trip And Bass Records",
        cover: "/artists/mady-minton/cover-oh-my.png",
        alt: "“Oh My” cover art",
        listen: { title: "Oh My", artist: "Mady Minton", year: "2026", href: spotifyTrack("7j0CRunmfU6BhC04DoRF9R") },
      },
      {
        title: "REASON",
        caption: "Trip And Bass Records",
        cover: "/artists/mady-minton/cover-reason.png",
        alt: "“Reason” cover art",
        listen: { title: "Reason", artist: "Mady Minton", year: "2026", href: spotifyTrack("5rkdaN5qIgRMjpPdcb0s2s") },
      },
      {
        title: "THAT FEELING",
        caption: "Trip And Bass Records",
        cover: "/artists/mady-minton/cover-that-feeling.png",
        alt: "“That Feeling” cover art",
        listen: { title: "That Feeling", artist: "Mady Minton", year: "2026", href: spotifyTrack("5mvVvaO7GK8EKxlAfZC7cw") },
      },
      {
        title: "IBIZA (WITH YALLA HABEBE)",
        caption: "With Yalla Habebe. Trip And Bass Records",
        cover: "/artists/mady-minton/cover-ibiza.png",
        alt: "“Ibiza” with Yalla Habebe — cover art",
        listen: { title: "Ibiza", artist: "Yalla Habebe, Mady Minton", year: "2026", href: spotifyTrack("2cuulChPYbJ1hAPagsZOnr") },
      },
      {
        title: "TEQUILA (WITH YALLA HABEBE)",
        caption: "With Yalla Habebe. Trip And Bass Records",
        cover: "/artists/mady-minton/cover-tequila.png",
        alt: "“Tequila” with Yalla Habebe — cover art",
        listen: { title: "Tequila", artist: "Yalla Habebe, Mady Minton", year: "2026", href: spotifyTrack("6xnbTWvlyXljzC3r04FOuB") },
      },
      {
        title: "COMING SOON",
        caption: "Unreleased",
        cover: "/artists/mady-minton/PLACEHOLDER-cover-track-6.png",
        alt: "Coming soon — new Mady Minton single",
      },
    ],
  },
  atmosphere: {
    genre: "AFRO HOUSE",
    genreBacked: true,
    badge: "NEW ON TRIP AND BASS",
    image: "/artists/mady-minton/mady-minton-portrait-studio.jpg",
    alt: "Mady Minton at the decks, studio portrait",
    imagePosition: "50% 20%",
    notes: [
      "I BUILD SETS IN LAYERS — TENSION FIRST, THEN THE DROP THAT MOVES THE ROOM.",
      "EVERY RELEASE IS A SIGNAL. THE ROOM DECIDES WHAT IT MEANS.",
    ],
    videos: ["/artists/mady-minton/video/mady-minton-section3.mp4"],
  },
  rooms: {
    badge: "OUT NOW",
    source: "AGENXY",
    image: "/artists/mady-minton/mady-minton-portrait.jpg",
    alt: "Mady Minton",
    video: "/artists/mady-minton/video/mady-minton-section4.mp4",
    videoPosition: "30% 50%",
  },
  signature: {
    catalog: "TRIP AND BASS RECORDS",
    releasedOn: "RELEASED ON TRIP AND BASS RECORDS.",
    instagram: "madyminton",
    followers: "3.2K followers",
    image: "/artists/mady-minton/mady-minton-portrait-tent.jpg",
    alt: "Mady Minton at the decks",
  },
  rider: { modules: standardRider("MADY MINTON", "she"), bookingEmail: "mady@agenxy.com" },
  builtOn: {
    image: "/artists/mady-minton/mady-minton-portrait-crowd.jpg",
    alt: "Mady Minton",
    tags: ["DJ", "PRODUCER", "TRIP AND BASS", "AGENXY"],
    blurb: "Sets shaped by instinct and the read of a room — low end, neon signals, and whatever the night calls for next.",
    photo: "/artists/mady-minton/mady-minton-marquee.jpg",
    photoAlt: "Mady Minton’s name on the marquee at Marquee New York",
  },
  ring: {
    text: "MELODIC * AFRO * INDIE DANCE * TECH *",
    fontSize: 22,
    logo: "/artists/mady-minton/mady-minton-logo-transparent.png",
    logoAlt: "Mady Minton wordmark",
    logoClassName: "h-[106px] w-auto sm:h-[142px]",
  },
  about: {
    nameClassName: "text-[clamp(44px,13vw,120px)] tracking-[-0.03em] lg:text-[min(120px,calc((100vw_-_256px)*0.075))]",
    tagline: "SIGNED TO AGENXY. RELEASING ON TRIP AND BASS RECORDS.",
    logo: { src: "/artists/mady-minton/mady-minton-logo-on-black.png", alt: "Mady Minton wordmark", aspectRatio: "1/1" },
    subtitle: "DJ & Producer · Trip And Bass Records",
    // Provisional stand-in quote from the handoff — not yet confirmed as her own words.
    quote: "Every set is a trip before it’s a tracklist — I just decide where we’re going next.",
    quoteBy: "MADY MINTON",
    portrait: "/artists/mady-minton/mady-minton-portrait.jpg",
    portraitAlt: "Mady Minton",
    plays: [{ text: "MUSIC RELEASED ON " }, { text: "TRIP AND BASS RECORDS.", bold: true }],
    // No Facebook or 1001Tracklists profile found for Mady Minton yet (she's also @madymintonmusic on TikTok).
    socials: socialLinks({
      spotify: "https://open.spotify.com/artist/2rur1PqZ2AiFKzmvL9EGOi",
      soundcloud: "https://soundcloud.com/mady-minton",
      beatport: "https://www.beatport.com/artist/mady-minton/2279561",
      "apple-music": "https://music.apple.com/us/artist/mady-minton/1872721518",
      instagram: "https://www.instagram.com/madyminton/",
    }),
    bio: "I’M AN ARTIST ON TRIP AND BASS RECORDS, ACTIVE SINCE 2026. SOME RECORDS LAND STRAIGHT AWAY, OTHERS TAKE A SEASON TO FIND THEIR ROOM.",
    whatIPlay: [
      "MELODIC HOUSE",
      "AFRO HOUSE",
      "INDIE DANCE",
      "TECH HOUSE",
      "DJ SETS",
      "ORIGINAL PRODUCTIONS",
      "LABEL RELEASES",
    ],
    listenHref: "https://open.spotify.com/artist/2rur1PqZ2AiFKzmvL9EGOi",
  },
};

export const epks: ArtistEpk[] = [yallaHabebe, madyMinton, berin];

export function getEpk(slug: string) {
  return epks.find((epk) => epk.slug === slug);
}
