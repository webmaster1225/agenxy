/**
 * Live Instagram data for the artist EPKs. Two sources, cached for an hour either way:
 *
 * 1. Official — the Graph API's Business Discovery endpoint, used when these server env vars
 *    are set. One AGENXY-owned professional account token reads any public Business/Creator
 *    profile by username, so each artist doesn't have to authorize their own account.
 *      INSTAGRAM_BUSINESS_ACCOUNT_ID  AGENXY's Instagram professional account ID (linked to a Facebook Page)
 *      INSTAGRAM_ACCESS_TOKEN         Token with instagram_basic + pages_read_engagement
 *                                     (a Business Manager system-user token doesn't expire)
 *      INSTAGRAM_GRAPH_VERSION        Optional, defaults to v25.0
 *
 * 2. Stopgap — without a token, the public endpoint instagram.com's own profile page uses. No
 *    setup, and it includes pinned posts, but it's undocumented and outside Instagram's API
 *    terms: it can change or rate-limit without notice, and is often blocked from cloud hosts.
 *
 * If the source fails, callers get `null` and render their placeholder tiles.
 * Server-only: never import this from a client component (it reads the access token).
 */

import { connect } from "node:http2";
import { unstable_cache } from "next/cache";

export type InstagramPost = {
  id: string;
  permalink: string;
  image: string;
  caption?: string;
  likes?: number;
  comments?: number;
  isVideo: boolean;
  /** Pinned to the top of the profile (only known from the public endpoint). */
  pinned?: boolean;
};

export type InstagramProfile = {
  username: string;
  avatar?: string;
  followers?: number;
  posts: InstagramPost[];
};

type GraphMedia = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  like_count?: number;
  comments_count?: number;
  children?: { data?: Pick<GraphMedia, "media_type" | "media_url" | "thumbnail_url">[] };
};

type GraphDiscovery = {
  username: string;
  profile_picture_url?: string;
  followers_count?: number;
  media?: { data?: GraphMedia[] };
};

const REVALIDATE_SECONDS = 60 * 60;

// Business Discovery doesn't expose every media field on every API version, so fall back to
// the long-standing basic set if Meta rejects the richer one (error code 100).
const MEDIA_FIELD_SETS = [
  "id,caption,media_type,media_url,thumbnail_url,permalink,like_count,comments_count,children{media_type,media_url,thumbnail_url}",
  "id,caption,media_type,media_url,permalink,like_count,comments_count",
];

function coverImage(media: GraphMedia) {
  if (media.media_type === "VIDEO") return media.thumbnail_url;
  const first = media.children?.data?.[0];
  return media.media_url ?? first?.thumbnail_url ?? first?.media_url;
}

function toProfile(discovery: GraphDiscovery, count: number): InstagramProfile {
  const posts = (discovery.media?.data ?? []).flatMap((media) => {
    const image = coverImage(media);
    if (!image || !media.permalink) return [];
    return [
      {
        id: media.id,
        permalink: media.permalink,
        image,
        caption: media.caption,
        likes: media.like_count,
        comments: media.comments_count,
        isVideo: media.media_type === "VIDEO",
      },
    ];
  });

  return {
    username: discovery.username,
    avatar: discovery.profile_picture_url,
    followers: discovery.followers_count,
    posts: posts.slice(0, count),
  };
}

function warn(username: string, reason: unknown) {
  console.warn(`[instagram] @${username}: ${reason instanceof Error ? reason.message : String(reason)}`);
}

async function fetchBusinessDiscovery(
  username: string,
  count: number,
  token: string,
  accountId: string,
): Promise<InstagramProfile | null> {
  const version = process.env.INSTAGRAM_GRAPH_VERSION || "v25.0";

  for (const [attempt, mediaFields] of MEDIA_FIELD_SETS.entries()) {
    // Over-fetch so videos without a thumbnail can be skipped and still fill the grid.
    const fields = `business_discovery.username(${username}){username,profile_picture_url,followers_count,media.limit(${
      count * 2
    }){${mediaFields}}}`;
    const url = `https://graph.facebook.com/${version}/${accountId}?fields=${encodeURIComponent(
      fields,
    )}&access_token=${encodeURIComponent(token)}`;

    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
      const body = await res.json();

      if (!res.ok || !body.business_discovery) {
        const error = body?.error;
        if (error?.code === 100 && attempt < MEDIA_FIELD_SETS.length - 1) continue;
        warn(username, error?.message ?? `HTTP ${res.status}`);
        return null;
      }

      return toProfile(body.business_discovery, count);
    } catch (err) {
      warn(username, err);
      return null;
    }
  }

  return null;
}

type PublicMediaNode = {
  id: string;
  shortcode: string;
  display_url?: string;
  is_video?: boolean;
  pinned_for_users?: unknown[];
  edge_liked_by?: { count: number };
  edge_media_to_comment?: { count: number };
  edge_media_to_caption?: { edges: { node: { text: string } }[] };
};

type PublicUser = {
  username: string;
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
  edge_followed_by?: { count: number };
  edge_owner_to_timeline_media?: { edges: { node: PublicMediaNode }[] };
};

// The web app's public app ID; the endpoint rejects requests without it.
const INSTAGRAM_WEB_APP_ID = "936619743392459";

/**
 * Instagram answers this endpoint over HTTP/2 but rate-limits HTTP/1.1 clients (429), and
 * Node's built-in fetch only speaks HTTP/1.1 — so this one request goes through node:http2.
 */
function getJsonOverHttp2(url: string, headers: Record<string, string>, timeoutMs = 10_000) {
  const { origin, pathname, search } = new URL(url);

  return new Promise<{ status: number; body: unknown }>((resolve, reject) => {
    const session = connect(origin);
    const fail = (err: Error) => {
      session.destroy();
      reject(err);
    };
    session.on("error", fail);

    const req = session.request({ ":method": "GET", ":path": pathname + search, ...headers });
    req.setTimeout(timeoutMs, () => fail(new Error(`timed out after ${timeoutMs}ms`)));
    req.on("error", fail);

    let status = 0;
    const chunks: Buffer[] = [];
    req.on("response", (responseHeaders) => {
      status = Number(responseHeaders[":status"]);
    });
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      session.close();
      const text = Buffer.concat(chunks).toString("utf8");
      try {
        resolve({ status, body: JSON.parse(text) });
      } catch {
        resolve({ status, body: null });
      }
    });
    req.end();
  });
}

// Throws on failure so unstable_cache doesn't keep a bad result for the whole hour.
const fetchPublicProfileCached = unstable_cache(
  async (username: string, count: number): Promise<InstagramProfile> => {
    const { status, body } = await getJsonOverHttp2(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        "x-ig-app-id": INSTAGRAM_WEB_APP_ID,
        accept: "application/json",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      },
    );
    const user = (body as { data?: { user?: PublicUser } } | null)?.data?.user;
    if (status !== 200 || !user) throw new Error(`public endpoint HTTP ${status}`);

    // Same order as the profile grid on instagram.com: pinned posts first, then the latest.
    const posts = (user.edge_owner_to_timeline_media?.edges ?? []).flatMap(({ node }) =>
      node.display_url
        ? [
            {
              id: node.id,
              permalink: `https://www.instagram.com/p/${node.shortcode}/`,
              image: node.display_url,
              caption: node.edge_media_to_caption?.edges[0]?.node.text,
              likes: node.edge_liked_by?.count,
              comments: node.edge_media_to_comment?.count,
              isVideo: Boolean(node.is_video),
              pinned: Boolean(node.pinned_for_users?.length),
            },
          ]
        : [],
    );

    return {
      username: user.username,
      avatar: user.profile_pic_url_hd ?? user.profile_pic_url,
      followers: user.edge_followed_by?.count,
      posts: posts.slice(0, count),
    };
  },
  ["instagram-public-profile"],
  { revalidate: REVALIDATE_SECONDS },
);

async function fetchPublicProfile(username: string, count: number): Promise<InstagramProfile | null> {
  try {
    return await fetchPublicProfileCached(username, count);
  } catch (err) {
    warn(username, err);
    return null;
  }
}

export async function getInstagramProfile(username: string, count = 6): Promise<InstagramProfile | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  return token && accountId
    ? fetchBusinessDiscovery(username, count, token, accountId)
    : fetchPublicProfile(username, count);
}

export function formatCount(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}
