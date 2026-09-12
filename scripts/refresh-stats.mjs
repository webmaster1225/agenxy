#!/usr/bin/env node
/**
 * Refresh Agenxy live stats into data/live-stats.json.
 *
 * Spotify’s public API does not expose stream / playlist / chart counts.
 * This job pulls from Chartmetric when CHARTMETRIC_REFRESH_TOKEN is set.
 *
 * Usage:
 *   node scripts/refresh-stats.mjs
 *   npm run refresh-stats
 *
 * Env:
 *   CHARTMETRIC_REFRESH_TOKEN  required for live pull
 *   CHARTMETRIC_API_BASE       optional (default https://api.chartmetric.com)
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const statsPath = join(root, "data", "live-stats.json");

const TRACK_CATALOG = {
  "move-ya-body": { spotifyTrackId: "58pWWWIePapqY8IjRdGauf" },
  tipsy: { spotifyTrackId: "1bEGTX9PSTuDMCUZbiq3Lt" },
  blackwater: { spotifyTrackId: "5BWjtNm6laJJFTWeZkWdCk" },
  tequila: { spotifyTrackId: "6xnbTWvlyXljzC3r04FOuB" },
};

const API_BASE = (process.env.CHARTMETRIC_API_BASE || "https://api.chartmetric.com").replace(/\/$/, "");

function loadSnapshot() {
  return JSON.parse(readFileSync(statsPath, "utf8"));
}

function saveSnapshot(snapshot) {
  writeFileSync(statsPath, `${JSON.stringify(snapshot, null, 2)}\n`);
}

async function chartmetricAccessToken(refreshToken) {
  const res = await fetch(`${API_BASE}/api/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshtoken: refreshToken }),
  });
  if (!res.ok) {
    throw new Error(`Chartmetric token failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  const token = data.token || data.access_token || data?.obj?.token;
  if (!token) throw new Error("Chartmetric token response missing token");
  return token;
}

async function cmGet(path, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Chartmetric GET ${path} failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

function latestSeriesValue(payload) {
  const series = payload?.obj?.[0]?.data;
  if (!Array.isArray(series) || series.length === 0) return null;
  const last = series[series.length - 1];
  const value = typeof last?.value === "number" ? last.value : Number(last?.value);
  return Number.isFinite(value) ? value : null;
}

async function fetchTrackMetrics(spotifyTrackId, token) {
  const streamsPath = `/api/track/${spotifyTrackId}/spotify/stats/highest-playcounts?type=streams&latest=true&isIdPlatformSpecific=true`;
  const playlistsPath = `/api/track/${spotifyTrackId}/spotify/stats/highest-playcounts?type=playlist_count&latest=true&isIdPlatformSpecific=true`;

  let streams = null;
  let playlists = null;
  let chart = null;

  try {
    streams = latestSeriesValue(await cmGet(streamsPath, token));
  } catch (err) {
    console.warn(`streams ${spotifyTrackId}:`, err.message);
  }

  try {
    playlists = latestSeriesValue(await cmGet(playlistsPath, token));
  } catch (err) {
    // playlist_count may not exist on all plans — fall back to playlist listing length
    console.warn(`playlist_count ${spotifyTrackId}:`, err.message);
    try {
      const list = await cmGet(
        `/api/track/${spotifyTrackId}/spotify/current/playlists?limit=100&isIdPlatformSpecific=true`,
        token,
      );
      const rows = list?.obj ?? list?.obj?.data ?? list?.data;
      if (Array.isArray(rows)) playlists = rows.length;
      else if (typeof list?.obj?.total === "number") playlists = list.obj.total;
    } catch (inner) {
      console.warn(`playlists list ${spotifyTrackId}:`, inner.message);
    }
  }

  try {
    const charts = await cmGet(
      `/api/track/${spotifyTrackId}/spotify/charts?latest=true&isIdPlatformSpecific=true`,
      token,
    );
    const rows = charts?.obj ?? charts?.obj?.data ?? [];
    const list = Array.isArray(rows) ? rows : Array.isArray(rows?.data) ? rows.data : [];
    const best = list
      .map((row) => row.rank ?? row.peak_rank ?? row.position)
      .filter((n) => typeof n === "number" && n > 0)
      .sort((a, b) => a - b)[0];
    if (best) chart = best;
  } catch (err) {
    console.warn(`charts ${spotifyTrackId}:`, err.message);
  }

  return { streams, playlists, chart };
}

async function main() {
  const refreshToken = process.env.CHARTMETRIC_REFRESH_TOKEN;
  const snapshot = loadSnapshot();

  if (!refreshToken) {
    snapshot.updatedAt = new Date().toISOString();
    snapshot.source = "cache-touch";
    saveSnapshot(snapshot);
    console.log(
      "No CHARTMETRIC_REFRESH_TOKEN set — touched updatedAt only.\n" +
        "Add a Chartmetric refresh token to pull live streams / playlists / charts.",
    );
    return;
  }

  const token = await chartmetricAccessToken(refreshToken);
  const nextTracks = { ...snapshot.tracks };
  let totalStreams = 0;

  for (const [key, meta] of Object.entries(TRACK_CATALOG)) {
    const metrics = await fetchTrackMetrics(meta.spotifyTrackId, token);
    const prev = snapshot.tracks?.[key] ?? { streams: 0, playlists: 0, chart: null };
    nextTracks[key] = {
      streams: metrics.streams ?? prev.streams,
      playlists: metrics.playlists ?? prev.playlists,
      chart: metrics.chart ?? prev.chart ?? null,
    };
    totalStreams += nextTracks[key].streams || 0;
    console.log(key, nextTracks[key]);
  }

  snapshot.tracks = nextTracks;
  snapshot.site = {
    ...snapshot.site,
    // Keep a rolling catalog total as the site streams metric until a dedicated FY query exists.
    streamsLastYear: totalStreams || snapshot.site.streamsLastYear,
  };
  snapshot.updatedAt = new Date().toISOString();
  snapshot.source = "chartmetric";
  saveSnapshot(snapshot);
  console.log("Wrote", statsPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
