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

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  getCount().then(count => res.status(200).json({ count }));
}
