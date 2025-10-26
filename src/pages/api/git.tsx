import childProcess from "node:child_process";
import { NextApiRequest, NextApiResponse } from "next";

let cache: {
	hash: string,
	message: string
} | undefined

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
	if (!cache) {
		const hash = childProcess
			.execSync("git rev-parse --short HEAD")
			.toString()
			.trim();

		const message = childProcess
			.execSync("git log -1 --pretty=%s")
			.toString()
			.trim();
		cache = {hash, message};
	}
	res.status(200).json(cache);
}