import Image from "next/image";
import Link from "next/link";

import { Project } from "@/app/dashboard/page";

export default function ProjectCard({ project }: { project: Project }) {
  const imageSrc = project.preview_image || "/shehasnoclueeither.png";

  return (
    <Link href={`/dashboard/projects/${project.project_id}`}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50">
        <Image
          src={imageSrc}
          alt={project.project_name}
          width={800}
          height={400}
          className="w-full h-auto object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">{project.project_name}</h3>
            {project.shipped && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Shipped</span>
            )}
          </div>
          <p className="text-gray-600 text-sm">
            {project.hackatime_total_hours.toFixed(1)} hours
          </p>
        </div>
      </div>
    </Link>
  );
}
