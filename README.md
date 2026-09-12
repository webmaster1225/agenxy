# AGENXY

Pixel-faithful Next.js clone of the [Agenxy Framer site](https://new-kiwi-576732.framer.app/) — artist management, label, and booking agency.

## Pages

- `/` Home — Works, About, Insights, Contact
- `/label` Campaign / works index
- `/management` Studio about, values, leadership, clients
- `/artists` Roster index
- `/artists/each-artists` Artist profile
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
