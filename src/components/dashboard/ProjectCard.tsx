import Link from "next/link";

import { Project } from "@/app/dashboard/page";

export default function ProjectCard({ project }: { project: Project }) {
  const imageSrc = project.preview_image || "/shehasnoclueeither.png";
  const suits = ["♠", "♥", "♦", "♣"];
  const suit = suits[project.project_id % suits.length];
  const suitColor = suit === "♥" || suit === "♦" ? "text-[#DC143C]" : "text-gray-900";

  return (
    <Link 
      href={`/dashboard/projects/${project.project_id}`}
      aria-label={`View project: ${project.project_name}`}
      className="group focus:outline-none focus:ring-4 focus:ring-[#DC143C] focus:ring-offset-2 rounded-2xl"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 bg-white border-3 border-gray-200 hover:border-[#DC143C]">
        <div className={`absolute top-2 left-2 z-10 ${suitColor} font-black text-xl bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg shadow-lg`}>
          {suit}
        </div>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={project.project_name}
          className="w-full h-40 object-cover"
        />
        
        <div className="p-3 bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-black text-gray-900 group-hover:text-[#DC143C] transition-colors tracking-tight">
              {project.project_name}
            </h3>
            {project.shipped && (
              <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md" aria-label="Project shipped">
                Shipped
              </span>
            )}
          </div>
          <p className="text-gray-700 text-sm font-bold bg-[#FFD700]/20 inline-block px-2 py-1 rounded">
            {project.hackatime_total_hours.toFixed(1)} hours logged
          </p>
        </div>
        
        <div className={`absolute bottom-2 right-2 ${suitColor} font-black text-xl bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg shadow-lg rotate-180`}>
          {suit}
        </div>
      </div>
    </Link>
  );
}
