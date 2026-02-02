import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let data: {
    project_id: string;
    content: string;
    media_url?: string;
    description?: string | null;
  };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (data.description === "") {
    data.description = null;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/devlogs/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sessionId=${sessionId}`,
        },
        body: JSON.stringify(data),
      },
    );

    const text = await res.text();
    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      console.error("Failed to parse backend response as JSON");
    }

    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.error("Error proxying devlog creation", err);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
