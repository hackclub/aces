import { NextApiRequest, NextApiResponse } from "next";

const branch = process.env.NODE_ENV === "production" ? "main" : "dev";

let cache: {
	hash: string,
	message: string
} | undefined

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
	if (!cache) {
		const githubRes = await fetch(`https://api.github.com/repos/hackclub/aces/commits/${branch}`)
    const json = await githubRes.json()
		cache = {
      hash: json.sha.substring(0,7),
      message: json.commit.message
    };
	}
	res.status(200).json(cache);
}