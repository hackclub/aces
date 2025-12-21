import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, otp } = data;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/validate_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
    credentials: "include",
  });

  let cookie: string | null = null;

  try {
    const data = await res.json();
    cookie = data?.sessionId ?? null;
  } catch {
    // ignore
  }

  const response = new NextResponse(null, {
    status: res.status,
  });

  if (cookie) {
    response.cookies.set({
      name: "sessionId",
      value: cookie,
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });
  }

  return response;
}
