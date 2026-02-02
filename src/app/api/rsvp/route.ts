import { NextResponse } from "next/server";

const cacheForEmergencies: number | undefined = undefined;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${process.env.RSVP_AIRTABLE_BASE_ID}/RSVPS?sort[0][field]=count&sort[0][direction]=desc&maxRecords=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RSVP_AIRTABLE_API_KEY}`,
        },
      },
    );

    const data = await res.json();
    const newestRecord = data.records?.[0];
    const count = newestRecord?.fields?.count ?? cacheForEmergencies;

    return NextResponse.json({ count });
  } catch {
    return NextResponse.json(
      { count: cacheForEmergencies, error: "Failed to fetch" },
      { status: 500 },
    );
  }
}
