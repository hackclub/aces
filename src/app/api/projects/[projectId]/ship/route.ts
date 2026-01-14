import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}/ship`,
      {
        method: "POST",
        headers: {
          Cookie: `sessionId=${sessionId}`,
        },
      }
    );

    const text = await res.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      console.error("Failed to parse backend response as JSON");
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error proxying project ship", err);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
