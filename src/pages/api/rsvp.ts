import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";

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

    await new Promise((resolve) => setTimeout(resolve, 200));

    const data = await res.json();
    count += data.records?.length ?? 0;
    offset = data.offset;
  } while (offset);

  return count
}

let cached = { value: -1, updated: 0 };

setInterval(async () => {
  const count = await getCount();
  cached = { value: count, updated: Date.now() };
  console.log("cached value", cached);
}, 5000);

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ count: cached.value });
}