import { cookies } from "next/headers";
import Link from "next/link";
import ProjectCard from "@/components/dashboard/ProjectCard";

export type Project = {
  project_id: number;
  project_name: string;
  hackatime_projects: string[];
  hackatime_total_hours: number;
  last_updated: string;
  repo: string;
  demo_url: string;
  preview_image: string;
  shipped: boolean;
};

async function getAllProjects(): Promise<Project[]> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return [];
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/all`,
    {
      method: "GET",
      headers: {
        Cookie: `sessionId=${sessionId}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function ExplorePage() {
  const projects = await getAllProjects();

  return (
    <div>
      <Link
        href="/dashboard"
        className="text-rose-700 hover:text-rose-800 font-semibold mb-6 inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 rounded px-2 py-1"
      >
        &larr; Back to Dashboard
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-gray-900 tracking-tight">
        Explore Projects
      </h1>
      
      {projects.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-700 font-semibold text-lg">No projects available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
