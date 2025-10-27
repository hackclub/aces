import type { Project } from "./api/gallery"
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

export default function Gallery() {
	const [projects, setProjects] = useState<Project[]>([])
	useEffect(() => {
		fetch("/api/gallery")
			.then(res => res.json())
			.then(data => setProjects(data))
	}, [])

	return <main className={"container"}>
		<div className="container min-h-screen flex flex-col justify-evenly md:p-0 p-5">
			<h1 className={"text-white text-8xl text-center"}>Gallery</h1>
			<div className={"flex flex-row flex-wrap justify-center-safe align-center p-10 m-4 gap-10"}>
				{projects.map((project, i) => (
					<div key={i}>
						<ProjectCard project={project} key={i} />
					</div>
				))}
			</div>
		</div>
	</main>
}