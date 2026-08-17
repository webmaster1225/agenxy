const cdn = (file: string) =>
  `https://framerusercontent.com/images/${file}`;

export const assets = {
  worksHero: cdn("oN2WwOWKiJZSMcdEy2hZSU7w3Q.png"),
  workA: cdn("JM6fX1huctJncvI56MIqGQxfmk.png"),
  workB: cdn("lmaGXg6sjWKcW8IOWBU33YGgQ.png"),
  workC: cdn("lNihbmftOjDvkAOR9Nodd7mhX4.png"),
  workD: cdn("173E057JvEWst9enaVmnRiFjQ.png"),
  tipsy: cdn("RxtPXsmahwnW6kGXPQEnOyzw7JA.png"),
  moveYaBody: cdn("ikKrpcGBvvVG1Or0UkAGAzX3xA.png"),
  wide: cdn("SRjB74625vaAWeUrGGEyAg5wYg.jpg"),
  artistA: cdn("u8iy29T534bwRvGJ1RsHXBtzuc.jpg"),
  artistB: cdn("Ej4aQ6paCEbjBsJlw1YWTVkot8s.png"),
  avatarA: cdn("lqXkWvK7c5WC81SYuRHX0QYBidM.png"),
  avatarB: cdn("Ya02jbzOk9oPuwSeXoDjDbP7V0U.png"),
  berinVideo: "https://framerusercontent.com/assets/WrExxkDHbsjVVnQ6jax34hUMzk.mp4",
  yallaVideo: "https://framerusercontent.com/assets/j9yZdgBtosNwdE76Ui2imNJxaJ8.mp4",
  ofEarthVideo: "https://framerusercontent.com/assets/dRHWzVptVvpgdXINm46ZLtoiwoY.mp4",
  portraitsStillness: "https://framerusercontent.com/images/YoJUEqVllERi0Vfk99fsQ7J2oQw.jpg?width=1920&height=1080",
  heirloomHands: "https://framerusercontent.com/images/KNc16FV0KFyEXgmfxgSe5f0YPWo.jpg?width=1920&height=1083",
  sanori: "/label/sanori.png",
  novaFoundryVideo: "https://motion.thepolar.studio/video/lu_9.mp4",
  wavely: "/label/wavely.png",
  studioVale: "https://framerusercontent.com/images/6HYyvJ0m3yt6OeKr0iUlD6PhXS0.jpg?width=1920&height=1200",
  frameAndForm: "https://framerusercontent.com/images/ytaHmpOUBE0r0ujdcCjRoXLZxU.jpg?width=1400&height=1600",
  neumaApp: "https://framerusercontent.com/images/wUd8RmkVdjUOdCpLj1tDEvx4.jpg?width=1400&height=1600",
  threeSixty: "https://framerusercontent.com/images/lOgE28bymJgqZ3hWK0KWrwggQ.jpg?width=1400&height=1600",
  axonFutures: "https://framerusercontent.com/images/0k9FRFQNoXTs4URgl8IU55yRMI8.jpg?width=1400&height=1600",
  aeraMotionVideo: "https://motion.thepolar.studio/video/lu_5.mp4",
  kivoRecordsVideo: "https://motion.thepolar.studio/video/lu_6.mp4",
  oroObject: "https://framerusercontent.com/images/q7Vqyxkg02Z8W1C0mCL25YIM3s.jpg?width=1110&height=1480",
  elanStudio: "https://framerusercontent.com/images/Bx4DObSpvprMbR9rrsPdixDWUQ.jpg?width=1000&height=1300",
  noriIndex: "https://framerusercontent.com/images/7IMjB4oGsod2J0wPL6Kjp1CWzk.jpg?width=1000&height=1000",
  oblika: "https://framerusercontent.com/images/KbfUGse8Jwqt60zKWXVEVHfHYo4.jpg?width=1400&height=1600",
  lumaCeramicsVideo: "https://motion.thepolar.studio/video/lu_11.mp4",
  managementHeroVideo: "https://motion.thepolar.studio/video/works_1.mp4",
  managementDisciplinesVideo: "https://motion.thepolar.studio/video/lu_14.mp4",
};

export const nav = [
  { href: "/label", label: "Label", kicker: "Our Works:", count: "+56" },
  { href: "/management", label: "Management", kicker: "Our Team:", count: "+35" },
  { href: "/artists", label: "Artists", kicker: "We Work With:", count: "+5" },
  { href: "/contact-us", label: "Contacts", kicker: "Reach Out To Us:" },
];

export const featuredWorks = [
  {
    title: "BERIN",
    isNew: true,
    video: assets.berinVideo,
    image: assets.workA,
  },
  {
    title: "TIPSY-BERIN",
    image: assets.tipsy,
  },
  {
    title: "YALLA HABEBE",
    video: assets.yallaVideo,
    image: assets.artistA,
  },
  {
    title: "MOVE YA BODY",
    image: assets.moveYaBody,
  },
];

export const otherWorks = [
  {
    title: "TIPSY",
    year: "2025",
    artist: "Berin",
    href: "https://open.spotify.com/track/1bEGTX9PSTuDMCUZbiq3Lt",
  },
  {
    title: "MOVE YA BODY",
    year: "2024",
    artist: "Yalla Habebe",
    href: "https://open.spotify.com/album/22nKzML2I5RuQhr452gdEB",
  },
  {
    title: "REASON",
    year: "2024",
    artist: "Berin",
    href: "https://open.spotify.com/track/1bEGTX9PSTuDMCUZbiq3Lt",
  },
  {
    title: "THE WAY I ARE",
    year: "2023",
    artist: "Yalla Habebe",
    href: "https://open.spotify.com/track/32OCYo7vNetSrFhn7BX5bo",
  },
];

export const stats = [
  { id: ".A", label: "Year of establishment", value: "2022" },
  { id: ".b", label: "PROJECT LAUNCHED", value: "87" },
  { id: ".c", label: "streams OF LAST YEAR", value: "90M" },
  { id: ".d", label: "fULLY SATISFIED CLIENTS", value: "100%" },
];

export const team = [
  { name: "Yalla Habebe", role: "TEAM CEO", image: assets.artistA },
  { name: "Blaine Minton", role: "PARTNER", image: assets.avatarA },
  { name: "Jorge Mendoza", role: "PARTNER", image: assets.avatarB },
  { name: "PJ Escobar", role: "MANAGER", image: assets.workD },
  { name: "Alex Camus", role: "CMO", image: assets.workA },
  { name: "EMANAY", role: "ADVISORY", image: assets.artistB },
];

export const roster = [
  { name: "YALLA HABEBE", year: "2022", role: "Artist", image: assets.artistA },
  { name: "Berin", year: "2022", role: "Artist", image: assets.tipsy },
  { name: "mady minton", year: "2022", role: "Artist", image: assets.avatarA },
  { name: "purple", year: "2022", role: "Artist", image: assets.workD },
];

export const testimonials = [
  "YALLA HABEBE",
  "BERIN",
  "MADY MINTON",
  "MAKE THE GIRLS DANCE",
  "TRIP AND BASS",
  "Marquee New York",
];

export const featuredInsight = {
  date: "Oct 3rd, 2025",
  isNew: true,
  title: "HOW SMART DESIGN CAN BOOST CONVERSION RATES",
  image: assets.wide,
};

export const insightCards = [
  {
    published: "July 17, 2025",
    title: "HOW SMART DESIGN CAN BOOST CONVERSION RATES",
    image: assets.workA,
  },
  {
    published: "July 17, 2025",
    title: "HOW SMART DESIGN CAN BOOST CONVERSION RATES",
    image: assets.tipsy,
  },
  {
    published: "July 17, 2025",
    title: "HOW SMART DESIGN CAN BOOST CONVERSION RATES",
    image: assets.workC,
  },
  {
    published: "July 17, 2025",
    title: "HOW SMART DESIGN CAN BOOST CONVERSION RATES",
    image: assets.wide,
  },
];

export const insights = [featuredInsight, ...insightCards];

export const labelProjects: Array<{
  name: string;
  category: string;
  year: string;
  image?: string;
  video?: string;
}> = [
  { name: "Sanori", category: "Skincare & Wellness", year: "2025", image: assets.sanori },
  { name: "Nova Foundry", category: "Audio / Technology", year: "2025", video: assets.novaFoundryVideo },
  { name: "Wavely", category: "Fashion", year: "2024", image: assets.wavely },
  { name: "Studio Vale", category: "Marketing", year: "2024", image: assets.studioVale },
  { name: "Frame & Form", category: "Health and Wellness", year: "2024", image: assets.frameAndForm },
  { name: "Neuma App", category: "Marketing", year: "2024", image: assets.neumaApp },
  { name: "360°", category: "Fashion", year: "2024", image: assets.threeSixty },
  { name: "Axon Futures", category: "Digital", year: "2024", image: assets.axonFutures },
  { name: "Aera Motion", category: "Health and Wellness", year: "2024", video: assets.aeraMotionVideo },
  { name: "Kivo Records", category: "Marketing", year: "2024", video: assets.kivoRecordsVideo },
  { name: "Oro Object", category: "Health and Wellness", year: "2024", image: assets.oroObject },
  { name: "Élan Studio", category: "Marketing", year: "2024", image: assets.elanStudio },
  { name: "Nori Index", category: "Health and Wellness", year: "2024", image: assets.noriIndex },
  { name: "Oblika", category: "Fashion", year: "2024", image: assets.oblika },
  { name: "Luma Ceramics", category: "Marketing", year: "2024", video: assets.lumaCeramicsVideo },
];

export const values = [
  "Partnership",
  "Creativity",
  "STRATEGY",
  "Innovation",
  "EXPERIENCE",
  "Quality",
  "Simplicity",
  "Authenticity",
  "SCALABILITY",
  "PERFORMANCE",
];

export const leadership = [
  { name: "Amira Voss", role: "Creative Director", image: cdn("dl06TIIMIMsavKYU11EXMZ2HE.jpg") + "?width=1000&height=1000" },
  { name: "Oscar Levin", role: "Lead Developer", image: cdn("fHQ1wVUJ8Orv6smSA6jJ9jHZ7E.jpg") + "?width=1000&height=1000" },
  { name: "Julian Reyes", role: "Technical Lead", image: cdn("4YwwSQvRz7V1HOF4B2qqsjsr4k.jpg") + "?width=1000&height=1000" },
  { name: "Theo Ritchie", role: "Motion Designer", image: cdn("7bjzuHbiDlbOKG9u4tQnTPT5mHc.jpg") + "?width=1000&height=1000" },
  { name: "Claire de Roux", role: "Brand Designer", image: cdn("SnwBuv5yseGDKIbTPu4SVBXOR2k.jpg") + "?width=1000&height=1000" },
  { name: "Mira Solano", role: "Art Director", image: cdn("4CvvuuKtnnOP581frsMveAniUto.jpg") + "?width=1000&height=1000" },
  { name: "Sofia Brunet", role: "Client Partnerships", image: cdn("vvVxraDNbmUZYfvKPE5wnnE5V34.jpg") + "?width=1000&height=1000" },
  { name: "Noah Becker", role: "Web Designer", image: cdn("pnQBgqCekFy0vkbGC2cVa5ErAHA.jpg") + "?width=1000&height=1000" },
];

export const leadershipGrid = [
  { index: 0, col: 1, row: 1 },
  { index: 1, col: 3, row: 1 },
  { index: 2, col: 4, row: 1 },
  { index: 3, col: 1, row: 2 },
  { index: 4, col: 2, row: 2 },
  { index: 5, col: 4, row: 2 },
  { index: 6, col: 1, row: 3 },
  { index: 7, col: 3, row: 3 },
];

export const clients = [
  {
    name: "Norva",
    blurb: "Luxury audio systems with precision and minimalist aesthetic.",
    image: cdn("ua6f8fjTKdEHgSV1jPDh56UyE8.jpg") + "?width=1400&height=1400",
  },
  {
    name: "Sanori",
    blurb: "Modern architecture studio focused on sustainable spatial design.",
    image: cdn("T73OaLmbjIq0ZBPqBSpUmUmrT0.jpg") + "?width=1400&height=1400",
  },
  {
    name: "Oblika",
    blurb: "Independent fashion label with strong editorial visual identity.",
    image: cdn("DivjKSvz9iVvKkVuj06FrW7mkg.jpg") + "?width=1400&height=1400",
  },
  {
    name: "Humae",
    blurb: "Creative SaaS platform for teams and professionals.",
    image: cdn("OhlIulL3YftcyUZVtQ1k2gCRXIU.jpg") + "?width=1400&height=1400",
  },
  {
    name: "Élan Studio",
    blurb:
      "Gathering and analyzing data about a target audience’s preferences, behaviors, and needs to inform design and marketing decisions.",
    image: cdn("m7rTT8ukNPvFe4mLADDsaBNhI20.jpg") + "?width=1400&height=1400",
  },
  {
    name: "Framer & Form",
    blurb: "Creative agency focused on design, film, and photography.",
    image: cdn("0uEwrOxQfao7U7cmgXUOCWNcQw.jpg") + "?width=1400&height=1400",
  },
  {
    name: "Artevia",
    blurb: "Modern interfaces and secure systems for finance, crypto, and digital banking.",
    image: cdn("4uN5fCuKx04oJllFF4UvsccoAA.jpg") + "?width=1400&height=1400",
  },
  {
    name: "Neuma",
    blurb: "Minimal, responsive platforms that simplify workflows and help users focus.",
    image: cdn("sst5fDKiir2ZmmM4b4v1ZRNcaE.jpg") + "?width=1400&height=1400",
  },
];

export const artistWorks: Array<{
  title: string;
  category: string;
  filter: string;
  video?: string;
  image?: string;
}> = [
  {
    title: "Of Earth",
    category: "Commercial",
    filter: "Commercial",
    video: assets.ofEarthVideo,
  },
  {
    title: "Portraits in Stillness",
    category: "Photography",
    filter: "Stills",
    image: assets.portraitsStillness,
  },
  {
    title: "Heirloom Hands",
    category: "Photography",
    filter: "Stills",
    image: assets.heirloomHands,
  },
];

export const faqs = [
  {
    q: "What is DBLR?",
    a: "DBLR is a creative studio partner for brands that need design, development, and campaign work in one place.",
  },
  {
    q: "What services do you offer",
    a: "Artist management, label operations, booking, brand design, digital products, and campaign production.",
  },
  {
    q: "Do you provide custom development solutions?",
    a: "Yes. We build custom websites, platforms, and campaign systems tailored to each roster and brand.",
  },
  {
    q: "What type of clients do you service?",
    a: "Musicians, labels, nightlife, fashion, wellness, and culture-led consumer brands.",
  },
  {
    q: "Can you track performance of marketing campaigns?",
    a: "Every campaign ships with measurement — streams, reach, conversions, and booked dates.",
  },
  {
    q: "How do you approach digital marketing campaigns?",
    a: "We start with the artist or brand story, then build a channel plan around release moments and live dates.",
  },
];
