import { readFileSync } from "fs";
import { join } from "path";
import {
  featuredTrack as featuredTrackBase,
  trackStats as trackStatsBase,
  stats as siteStatsBase,
} from "@/lib/data";

export type TrackMetricKey = "move-ya-body" | "tipsy" | "blackwater" | "tequila";

export type TrackMetrics = {
  streams: number;
  playlists: number;
  chart: number | null;
};

export type LiveStatsSnapshot = {
  updatedAt: string;
  source: string;
  site: {
    yearEstablished: number;
    projectsLaunched: number;
    streamsLastYear: number;
    satisfiedClientsPercent: number;
  };
  tracks: Record<TrackMetricKey, TrackMetrics>;
};

/** Catalog used by the daily refresh job — Spotify IDs Chartmetric / Spotify APIs understand. */
export const TRACK_CATALOG: Record<
  TrackMetricKey,
  { title: string; spotifyTrackId: string; spotifyAlbumId?: string }
> = {
  "move-ya-body": {
    title: "MOVE YA BODY",
    spotifyTrackId: "58pWWWIePapqY8IjRdGauf",
    spotifyAlbumId: "22nKzML2I5RuQhr452gdEB",
  },
  tipsy: {
    title: "TIPSY",
    spotifyTrackId: "1bEGTX9PSTuDMCUZbiq3Lt",
  },
  blackwater: {
    title: "BLACKWATER",
    spotifyTrackId: "5BWjtNm6laJJFTWeZkWdCk",
  },
  tequila: {
    title: "TEQUILA",
    spotifyTrackId: "6xnbTWvlyXljzC3r04FOuB",
    spotifyAlbumId: "6uNfBx0ZJSe1XIk95prZ5v",
  },
};

const TRACK_KEYS = Object.keys(TRACK_CATALOG) as TrackMetricKey[];

function seedSnapshot(): LiveStatsSnapshot {
  return {
    updatedAt: new Date(0).toISOString(),
    source: "seed",
    site: {
      yearEstablished: 2025,
      projectsLaunched: 87,
      streamsLastYear: 90_000_000,
      satisfiedClientsPercent: 100,
    },
    tracks: {
      "move-ya-body": { streams: 48_200_000, playlists: 1240, chart: 2 },
      tipsy: { streams: 18_600_000, playlists: 892, chart: null },
      blackwater: { streams: 6_400_000, playlists: 412, chart: null },
      tequila: { streams: 4_900_000, playlists: 328, chart: null },
    },
  };
}

export function formatCompactCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "—";
  if (value >= 1_000_000_000) {
    const n = value / 1_000_000_000;
    return `${n >= 10 ? Math.round(n) : n.toFixed(1).replace(/\.0$/, "")}B`;
  }
  if (value >= 1_000_000) {
    const n = value / 1_000_000;
    return `${n >= 10 ? Math.round(n) : n.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return Math.round(value).toLocaleString("en-US");
  }
  return String(Math.round(value));
}

export function formatChartRank(rank: number | null | undefined): string {
  if (rank == null || !Number.isFinite(rank) || rank <= 0) return "—";
  return `#${Math.round(rank)}`;
}

export function loadLiveStats(): LiveStatsSnapshot {
  try {
    const path = join(process.cwd(), "data", "live-stats.json");
    const raw = JSON.parse(readFileSync(path, "utf8")) as LiveStatsSnapshot;
    const seed = seedSnapshot();
    return {
      ...seed,
      ...raw,
      site: { ...seed.site, ...raw.site },
      tracks: TRACK_KEYS.reduce(
        (acc, key) => {
          acc[key] = { ...seed.tracks[key], ...(raw.tracks?.[key] ?? {}) };
          return acc;
        },
        {} as Record<TrackMetricKey, TrackMetrics>,
      ),
    };
  } catch {
    return seedSnapshot();
  }
}

export function getLiveSiteStats() {
  const live = loadLiveStats();
  return siteStatsBase.map((stat) => {
    if (stat.id === ".A") {
      return { ...stat, value: String(live.site.yearEstablished) };
    }
    if (stat.id === ".b") {
      return { ...stat, value: formatCompactCount(live.site.projectsLaunched) };
    }
    if (stat.id === ".c") {
      return { ...stat, value: formatCompactCount(live.site.streamsLastYear) };
    }
    if (stat.id === ".d") {
      return { ...stat, value: `${live.site.satisfiedClientsPercent}%` };
    }
    return stat;
  });
}

export function getLiveInsights() {
  const live = loadLiveStats();
  const featuredMetrics = live.tracks["move-ya-body"];
  const featured = {
    ...featuredTrackBase,
    streams: formatCompactCount(featuredMetrics.streams),
    playlists: formatCompactCount(featuredMetrics.playlists),
    chart: formatChartRank(featuredMetrics.chart),
  };

  const keyByTitle: Record<string, TrackMetricKey> = {
    TIPSY: "tipsy",
    BLACKWATER: "blackwater",
    TEQUILA: "tequila",
  };

  const tracks = trackStatsBase.map((track) => {
    const key = keyByTitle[track.title];
    const metrics = key ? live.tracks[key] : undefined;
    return {
      ...track,
      streams: metrics ? formatCompactCount(metrics.streams) : track.streams,
      playlists: metrics ? formatCompactCount(metrics.playlists) : track.playlists,
    };
  });

  return {
    featured,
    tracks,
    updatedAt: live.updatedAt,
    source: live.source,
  };
}
