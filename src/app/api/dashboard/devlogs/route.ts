import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/devlogs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `sessionId=${sessionId}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json().catch(() => null);

  return NextResponse.json(responseData, { status: res.status });
}
