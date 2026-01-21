import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  // First, get user info to retrieve hackatime_id
  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
    headers: { Cookie: `sessionId=${sessionId}` },
  });

  if (!userRes.ok) {
    return NextResponse.json({ detail: "Failed to fetch user" }, { status: userRes.status });
  }

  const user = await userRes.json();
  const hackatimeId = user.hackatime_id;

  if (!hackatimeId) {
    return NextResponse.json({}, { status: 200 });
  }

  // Fetch all Hackatime projects for this user
  const hackatimeRes = await fetch(
    `https://hackatime.hackclub.com/api/v1/users/${hackatimeId}/stats?features=projects&start_date=2025-12-21T00:00:00Z`,
    { cache: "no-store" }
  );

  if (!hackatimeRes.ok) {
    return NextResponse.json({ detail: "Failed to fetch Hackatime data" }, { status: 500 });
  }

  const hackatimeData = await hackatimeRes.json();
  const projects = hackatimeData?.data?.projects || [];

  const projectMap: Record<string, number> = {};
  projects.forEach((p: { name: string; total_seconds: number }) => {
    projectMap[p.name] = p.total_seconds;
  });

  return NextResponse.json(projectMap);
}
