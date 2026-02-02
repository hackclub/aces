import { NextResponse } from "next/server";

// TODO: This is a placeholder implementation. Backend needs to be updated to:
// 1. Add a ShopConfig model/table to store form URLs and other shop settings
// 2. Create /api/v1/shop/config endpoint to fetch/update shop configuration
// 3. This route should then proxy to the backend instead of using env vars

export async function GET() {
  const formUrl = process.env.NEXT_PUBLIC_SHOP_FORM_URL;

  if (!formUrl) {
    return NextResponse.json(
      { error: "Shop form URL not configured" },
      { status: 503 },
    );
  }

  return NextResponse.json({ formUrl });
}
