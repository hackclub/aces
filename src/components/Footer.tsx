"use client";
import { useEffect, useState } from "react";
import { TbGitCommit } from "react-icons/tb";

export default function Footer() {
	const [commit, setCommit] = useState({
		hash: "loading",
		message: "loading"
	})
	useEffect(() => {
		async function getCommit() {
			try {
				const response = await fetch("/api/git")
				if (!response.ok) throw new Error("Could not fetch commit")
				const data = await response.json()
				setCommit(data)
			} catch (err) {
				console.log("error", err)
			}
		}
		getCommit()
	}, []);

  return (
    <footer className="w-full text-center bg-rose-800 p-5 text-white flex flex-col items-center justify-center">
      <p className="md:text-lg text-md">
        Made with love by Hack Club. Check out our{" "}
        <a className="text-rose-200" href="https://github.com/hackclub/aces">
          GitHub
        </a>
        , and the{" "}
        <a className="text-rose-200" href="https://hackclub.com/slack">
          Hack Club Slack
        </a>
        .
      </p>
      <div className={"flex flex-row align-center content-center"}>
        <TbGitCommit className={"self-center justify-center text-rose-200"}/>
        <a href={`https://github.com/hackclub/aces/commit/${commit.hash}`} className={"self-center justify-center text-rose-200"}>
          {commit.hash}: {commit.message}
        </a>
      </div>
    </footer>
  );
}
