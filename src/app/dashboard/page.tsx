import { cookies } from "next/headers";
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
      {projects.length === 0 ? (
        <div className="text-xl text-center mt-20">
          <p>You have no projects yet. Start by creating a new project!</p>
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
