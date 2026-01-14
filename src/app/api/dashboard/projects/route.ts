import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `sessionId=${sessionId}`,
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      console.error("Failed to parse backend response as JSON");
    }

    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.error("Error proxying project creation", err);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
