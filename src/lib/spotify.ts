export type ListenTrack = {
  title: string;
  artist: string;
  year?: string;
  href: string;
};

const EMBEDDABLE = new Set(["track", "album", "playlist", "episode", "show", "artist"]);

export function toSpotifyEmbedUrl(href: string) {
  try {
    const url = new URL(href);
    if (!url.hostname.includes("spotify.com")) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const type = parts[0];
    const id = parts[1]?.split("?")[0];
    if (!type || !id || !EMBEDDABLE.has(type)) return null;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  } catch {
    return null;
  }
}

export function isAlbumEmbed(embedUrl: string) {
  return embedUrl.includes("/embed/album/") || embedUrl.includes("/embed/playlist/");
}

/** Track / album / playlist / search — not artist profile pages. */
export function isSpotifyRelease(href: string) {
  try {
    const url = new URL(href);
    if (!url.hostname.includes("spotify.com")) return false;
    const type = url.pathname.split("/").filter(Boolean)[0];
    return type === "track" || type === "album" || type === "playlist" || type === "search";
  } catch {
    return false;
  }
}
