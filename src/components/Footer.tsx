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
    <footer className="relative w-full text-center bg-gradient-to-b from-[#590019] to-[#0F1419] p-6 text-white flex flex-col items-center justify-center gap-3 border-t-4 border-[#DC143C] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(220,20,60,0.15),transparent_70%)]" />
      <p className="relative z-10 md:text-lg text-md leading-relaxed font-medium">
        Made with love by <span className="font-bold text-[#FFD700]">Hack Club</span>. Check out our{" "}
        <a className="text-[#FFD700] hover:text-white underline decoration-2 underline-offset-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded px-1" href="https://github.com/hackclub/aces">
          GitHub
        </a>
        , and the{" "}
        <a className="text-[#FFD700] hover:text-white underline decoration-2 underline-offset-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded px-1" href="https://hackclub.com/slack">
          Hack Club Slack
        </a>
        .
      </p>
      <div className="relative z-10 flex flex-row items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        <TbGitCommit className="text-[#FFD700] text-lg" aria-hidden="true" />
        <a 
          href={`https://github.com/hackclub/aces/commit/${commit.hash}`} 
          className="text-gray-300 hover:text-[#FFD700] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded px-1 text-sm font-mono"
          aria-label={`View commit: ${commit.message}`}
        >
          {commit.hash}: {commit.message}
        </a>
      </div>
    </footer>
  );
}
