import { NextResponse } from "next/server";
import { loadLiveStats } from "@/lib/live-stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = loadLiveStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
