import type { Project } from "./api/gallery"
import { useEffect, useState } from "react";

export default function Gallery() {
	const [projects, setProjects] = useState<Project[]>([])
	useEffect(() => {
		fetch("/api/gallery") // TODO: REPLACE WITH REAL API LINK.
			.then(res => res.json())
			.then(data => setProjects(data))
	}, [])

	return <></>
}