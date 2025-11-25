import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body.email;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }
  const BACKENDURL = "https://place.hold.er"
  const backendRes = await fetch(`${BACKENDURL}/auth/otp`, {
    method: "POST",
    body: JSON.stringify({
      email: email
    })
  })
  if (!backendRes.ok) {
    return res.status(500).json({ error: "Failed to send OTP" });
  }
  return res.status(200).json({ message: "OTP sent successfully" });
}