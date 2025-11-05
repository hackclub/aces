// src/pages/api/rsvp.ts
import { NextApiRequest, NextApiResponse } from "next";

async function getCount() {
  let offset;
  let count = 0;

  do {
    const url = new URL(`https://api.airtable.com/v0/${process.env.RSVP_AIRTABLE_BASE_ID}/RSVPs`);
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.RSVP_AIRTABLE_API_KEY}`,
      },
    });
    if (!res.ok) {
      console.error(res.statusText);
      throw new Error(res.statusText);
    }
    const data = await res.json();
    count += data.records?.length ?? 0;
    offset = data.offset;

    if (offset) await new Promise((resolve) => setTimeout(resolve, 200));
  } while (offset);

  return count;
}

let cached = { value: -1, updated: 0 };

// Cache duration in milliseconds
const CACHE_DURATION = 30000;

// Extend global to hold a single timer across module reloads (avoid duplicate timers in dev)
declare global {
  var __RSVP_CACHE_TIMER__: NodeJS.Timeout | undefined;
}

async function updateCache() {
  try {
    const count = await getCount();
    cached = { value: count, updated: Date.now() };
    console.log("cached value", cached.value, "updatedAt", new Date(cached.updated).toISOString());
  } catch (err: unknown) {
    console.error("updateCache failed:", err);
    // keep previous cached value
  }
}

// Start background updater once per server instance
if (!global.__RSVP_CACHE_TIMER__) {
  // initial immediate update (fire-and-forget)
  updateCache().catch((e) => console.error("initial update failed:", e));

  // schedule periodic updates
  global.__RSVP_CACHE_TIMER__ = setInterval(() => {
    updateCache().catch((e) => console.error("scheduled update failed:", e));
  }, CACHE_DURATION);
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ count: cached.value, updatedAt: cached.updated });
}
