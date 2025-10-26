import {useEffect, useState} from "react";

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
    <footer className="w-full text-center bg-rose-800 p-5 text-white">
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
    </footer>
  );
}
