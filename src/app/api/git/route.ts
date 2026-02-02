import { NextResponse } from "next/server";

let cache:
  | {
      hash: string;
      message: string;
    }
  | undefined;

export async function GET() {
  if (!cache) {
    const githubRes = await fetch(
      "https://api.github.com/repos/hackclub/aces/commits/main",
    );

    if (!githubRes.ok) {
      throw new Error(`GitHub API error: ${githubRes.status}`);
    }

    const json = await githubRes.json();

    cache = {
      hash: json.sha.substring(0, 7),
      message: json.commit.message,
    };
  }

  return NextResponse.json(cache);
}
