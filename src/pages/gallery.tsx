import type { Project } from "./api/gallery"
import { useEffect, useState } from "react";

export default function Gallery() {
	const [projects, setProjects] = useState<Project[]>([])
	useEffect(() => {
		fetch("/api/gallery")
			.then(res => res.json())
			.then(data => setProjects(data))
	}, [])

	return <main>
		<div className="container h-screen flex flex-col justify-evenly md:p-0 p-5">
			<h1 className={"text-white text-8xl text-center"}>Gallery</h1>
			<div className={"flex flex-col flex-wrap justify-evenly align-center"}>
				{projects.map((project, i) => (
					<div key={i}>
						<p className={"text-center"}>{project.name}</p>
					</div>
				))}
			</div>
		</div>
	</main>
}