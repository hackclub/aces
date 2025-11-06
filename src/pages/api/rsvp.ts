// src/pages/api/rsvp.ts
import { NextApiRequest, NextApiResponse } from "next";

// Rewritten to ensure a single background updater reloads the cached count every 30s.

async function getCount(): Promise<number> {
  let offset: string | undefined;
  let count = 0;

  do {
    const url = new URL(`https://api.airtable.com/v0/${process.env.RSVP_AIRTABLE_BASE_ID}/RSVPs`);
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.RSVP_AIRTABLE_API_KEY}`,
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      console.error("Airtable request failed:", res.status, text);
      throw new Error(text || "Airtable request failed");
    }

    const data = await res.json();
    count += (data.records?.length ?? 0);
    offset = data.offset;

    if (offset) await new Promise((r) => setTimeout(r, 200));
  } while (offset);

  return count;
}

type Cache = { value: number | null; updated: number };
let cached: Cache = { value: null, updated: 0 };

// Default cache duration 30 seconds; can be overridden with env var (ms)
const CACHE_DURATION_MS = Number(process.env.RSVP_CACHE_DURATION_MS) || 30_000;

// Extend global to hold a single timer across module reloads (avoid duplicate timers in dev)
declare global {
   
  var __RSVP_CACHE_TIMER__: NodeJS.Timeout | undefined;
}

async function updateCache(): Promise<void> {
  try {
    const count = await getCount();
    cached = { value: count, updated: Date.now() };
    console.info("[rsvp] cache updated:", cached.value, new Date(cached.updated).toISOString());
  } catch (err: unknown) {
    console.error("[rsvp] updateCache failed:", err);
    // keep previous cached value if any
  }
}

// Start background updater once per server instance
if (!global.__RSVP_CACHE_TIMER__) {
  // initial immediate update (fire-and-forget)
  updateCache().catch((e) => console.error("[rsvp] initial update failed:", e));

  // schedule periodic updates
  global.__RSVP_CACHE_TIMER__ = setInterval(() => {
    updateCache().catch((e) => console.error("[rsvp] scheduled update failed:", e));
  }, CACHE_DURATION_MS);
}

// Cleanup function to clear the background timer
export function shutdownRSVPTimer(): void {
  if (global.__RSVP_CACHE_TIMER__) {
    clearInterval(global.__RSVP_CACHE_TIMER__);
    global.__RSVP_CACHE_TIMER__ = undefined;
    console.info("[rsvp] RSVP cache timer cleared.");
  }
}

// Optionally clear timer on process exit (for dev/hot-reload environments)
if (typeof process !== "undefined" && process.on) {
  process.on("SIGTERM", shutdownRSVPTimer);
  process.on("SIGINT", shutdownRSVPTimer);
  process.on("exit", shutdownRSVPTimer);
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (cached.value === null) {
    res.status(503).json({ error: "Service Unavailable: RSVP count not yet available." });
    return;
  }

  res.status(200).json({
    count: cached.value,
    updatedAt: new Date(cached.updated).toISOString(),
  });
}
