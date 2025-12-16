import { NextRequest } from "next/server";
import { apiUrl } from "@/utils";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const email = data.email;

  const res = await fetch(apiUrl`api/v1/auth/send_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return new Response(null,{
    status: res.status,
    headers: { "Content-Type": "application/json" },
  })
}