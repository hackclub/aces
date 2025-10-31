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
      await new Promise((resolve) => setTimeout(resolve, 200));
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

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now();
  if (now - cached.updated > CACHE_DURATION) {
    try {
      const count = await getCount();
      cached = { value: count, updated: now };
      console.log("cached value", cached.value, "updatedAt", new Date(cached.updated).toISOString());
    } catch (err: unknown) {
      console.error("getCount failed:", err);
      // Optionally, you can return the old cached value or an error
    }
  }
  res.status(200).json({ count: cached.value });
}