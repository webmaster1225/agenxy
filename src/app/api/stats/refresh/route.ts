import { NextResponse } from "next/server";
import { spawn } from "child_process";
import { join } from "path";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

async function runRefresh() {
  return new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(process.execPath, [join(process.cwd(), "scripts", "refresh-stats.mjs")], {
      cwd: process.cwd(),
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("close", (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });
}

/** Daily / weekly cron entrypoint. Secure with CRON_SECRET. */
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runRefresh();
  if (result.code !== 0) {
    return NextResponse.json(
      { ok: false, stdout: result.stdout, stderr: result.stderr },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, stdout: result.stdout.trim() });
}

export async function POST(req: Request) {
  return GET(req);
}
