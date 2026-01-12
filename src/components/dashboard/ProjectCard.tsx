import Image from "next/image";
import Link from "next/link";

import { Project } from "@/app/dashboard/page";

export default function ProjectCard({ project }: { project: Project }) {
  const imageSrc = project.preview_image || "/shehasnoclueeither.png";
  const suits = ["♠", "♥", "♦", "♣"];
  const suit = suits[project.project_id % suits.length];
  const suitColor = suit === "♥" || suit === "♦" ? "text-rose-600" : "text-gray-800";

  return (
    <Link 
      href={`/dashboard/projects/${project.project_id}`}
      aria-label={`View project: ${project.project_name}`}
      className="group focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-xl"
    >
      <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border-2 border-gray-200 hover:border-rose-300 hover:-translate-y-1">
        {/* Card corner pip */}
        <div className={`absolute top-2 left-2 z-10 ${suitColor} font-bold text-sm bg-white/90 backdrop-blur-sm px-2 py-1 rounded`}>
          {suit}
        </div>
        
        <Image
          src={imageSrc}
          alt={project.project_name}
          width={800}
          height={400}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-rose-700 transition-colors">
              {project.project_name}
            </h3>
            {project.shipped && (
              <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full" aria-label="Project shipped">
                Shipped
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm font-medium">
            {project.hackatime_total_hours.toFixed(1)} hours logged
          </p>
        </div>
        
        {/* Card bottom corner pip */}
        <div className={`absolute bottom-2 right-2 ${suitColor} font-bold text-sm bg-white/90 backdrop-blur-sm px-2 py-1 rounded rotate-180`}>
          {suit}
        </div>
      </div>
    </Link>
  );
}
