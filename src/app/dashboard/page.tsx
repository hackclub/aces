import { cookies } from "next/headers";
import Link from "next/link";
import ProjectCard from "@/components/dashboard/ProjectCard";
import CardsProgressBar from "@/components/dashboard/CardsProgressBar";

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

async function getProjects(): Promise<Project[]> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return [];
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`,
      {
        method: "GET",
        headers: {
          Cookie: `sessionId=${sessionId}`,
        },
        cache: "no-store",
      }
    );

    if (res.status === 401) {
      return [];
    }

    if (!res.ok) {
      console.error("Failed to fetch projects", { status: res.status });
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching projects", err);
    return [];
  }
}

export default async function Page() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-6xl font-black mb-6 text-gray-900 tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-[family-name:var(--font-righteous)]">
        My Projects
      </h1>
      <CardsProgressBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link 
          href="/dashboard/projects/new"
          className="group focus:outline-none focus:ring-4 focus:ring-[#DC143C] focus:ring-offset-2 rounded-2xl"
          aria-label="Create new project"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 bg-linear-to-br from-gray-50 via-white to-gray-100 h-full min-h-[200px] flex items-center justify-center cursor-pointer border-3 border-dashed border-gray-300 hover:border-[#DC143C]">
            <div className="text-center p-5">
              <span className="text-5xl text-[#DC143C] group-hover:text-[#FFD700] transition-colors block mb-2" aria-hidden="true">+</span>
              <p className="text-gray-900 font-black text-lg group-hover:text-[#DC143C] transition-colors tracking-tight">New Project</p>
            </div>
          </div>
        </Link>
        {projects.map((project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>
    </div>
  );
}
