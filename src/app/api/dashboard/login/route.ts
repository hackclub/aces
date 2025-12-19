import { NextRequest, NextResponse } from "next/server";
import { apiUrl } from "@/utils";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, otp } = data;

  const res = await fetch(apiUrl`api/v1/auth/validate_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const response = new NextResponse(null, {
    status: res.status,
  });

  const cookie = await res.json().then(data => data["sessionId"]).catch(() => null);

  if (cookie) {
    response.cookies.set({
      name: "sessionId",
      value: cookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
      path: '/'
      sameSite: 'strict'

    });
  }

  return response;
}
