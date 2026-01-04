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

async function getProjects(): Promise<Project[]> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  console.log(sessionId);

  if (!sessionId) {
    return [];
  }

  const req = new Request(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`,
    {
      method: "GET",
      headers: {
        Cookie: `sessionId=${sessionId}`,
      },
      cache: "no-store",
    }
  )

  console.log(req)

  const res = await fetch(req);

  console.log(res)

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Page() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/projects/new">
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50 h-full min-h-[200px] flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400">
            <div className="text-center p-4">
              <span className="text-4xl text-gray-400">+</span>
              <p className="text-gray-600 mt-2">New Project</p>
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
