# AGENXY

Pixel-faithful Next.js clone of the [Agenxy Framer site](https://new-kiwi-576732.framer.app/) — artist management, label, and booking agency.

## Pages

- `/` Home — Works, About, Insights, Contact
- `/label` Campaign / works index
- `/management` Studio about, values, leadership, clients
- `/artists` Roster index
- `/artists/[slug]` Artist EPK (`yalla-habebe`, `mady-minton`, `berin`) — content in `src/lib/epk.ts`
- `/contact-us` Contact, form, FAQs

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

## Live stats

Insights streams / playlists / charts and About totals are served from `data/live-stats.json`.

Spotify’s public API does **not** expose stream counts. Refresh daily from Chartmetric:

```bash
export CHARTMETRIC_REFRESH_TOKEN=...
npm run refresh-stats
```

Cron (example, 06:00 UTC daily):

```bash
0 6 * * * cd /home/ubuntu/Documents/agenxy && CHARTMETRIC_REFRESH_TOKEN=... npm run refresh-stats >> /tmp/agenxy-stats.log 2>&1
```

Or hit `GET /api/stats/refresh` with `Authorization: Bearer $CRON_SECRET` (see `vercel.json` for a daily schedule).

## Artist EPK Instagram feed

The "Signature Sound" section on each `/artists/[slug]` page shows 6 Instagram posts and the live follower count, refreshed hourly (code in `src/lib/instagram.ts`).

**Right now (no token):** posts come from the public endpoint instagram.com's own profile page uses — pinned posts first, then the latest, like the profile grid. It needs no setup, but it's undocumented and outside Instagram's API terms, so it can change, rate-limit, or be blocked from cloud hosts without notice. It only works over HTTP/2, which is why it doesn't use `fetch`. When it fails, the page shows placeholder tiles linking to the profile and logs `[instagram] …` on the server.

**Official API (recommended long term):** set the env vars below and the page switches to Meta's Business Discovery API automatically. One AGENXY token covers every artist (their accounts just need to stay public Business/Creator profiles — all three are Creator accounts today). This API doesn't say which posts are pinned, so it shows the 6 latest.

1. Connect AGENXY's Instagram professional account to a Facebook Page, and add both to a Meta app.
2. Create a token with `instagram_basic` and `pages_read_engagement` — a Business Manager system-user token doesn't expire; a regular long-lived user token lasts 60 days.
3. Set the env vars (e.g. in Vercel):

```bash
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841400000000000   # AGENXY's IG account ID
INSTAGRAM_ACCESS_TOKEN=...
# INSTAGRAM_GRAPH_VERSION=v25.0                    # optional
```

If Meta returns an error (e.g. an expired token), the page shows the placeholder tiles and logs `[instagram] …` on the server.
