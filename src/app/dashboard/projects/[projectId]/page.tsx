import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import DevlogCard, { Devlog } from "@/components/dashboard/DevlogCard";
import CreateDevlog from "@/components/dashboard/CreateDevlog";

type Project = {
  project_id: number;
  project_name: string;
  hackatime_projects: string[];
  hackatime_total_hours: number;
  last_updated: string;
  repo: string | null;
  demo_url: string | null;
  preview_image: string | null;
  shipped: boolean;
};

async function getProject(projectId: string): Promise<Project | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}`,
    {
      headers: { Cookie: `sessionId=${sessionId}` },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;
  return res.json();
}

async function getDevlogs(projectId: string): Promise<Devlog[]> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${projectId}/devlogs`,
    {
      headers: { Cookie: `sessionId=${sessionId}` },
      cache: "no-store",
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.devlogs || [];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const [project, devlogs] = await Promise.all([
    getProject(projectId),
    getDevlogs(projectId),
  ]);

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/dashboard" className="text-rose-700 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard"
        className="text-rose-700 hover:underline text-sm mb-4 inline-block"
      >
        &larr; Back to Projects
      </Link>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
        {project.preview_image && (
          <Image
            src={project.preview_image}
            alt={project.project_name}
            width={800}
            height={300}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{project.project_name}</h1>
              <p className="text-gray-600 mt-1">
                {project.hackatime_total_hours.toFixed(1)} hours logged
              </p>
            </div>
            {project.shipped && (
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded">
                Shipped
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                View Repo
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-sm transition-colors"
              >
                View Demo
              </a>
            )}
          </div>

          {project.hackatime_projects.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-500">Linked Hackatime projects:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.hackatime_projects.map((hp) => (
                  <span
                    key={hp}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {hp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Devlogs</h2>
        <div className="space-y-4">
          <CreateDevlog projectId={project.project_id} />
          {devlogs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
              No devlogs yet
            </div>
          ) : (
            devlogs.map((devlog) => (
              <DevlogCard key={devlog.id} devlog={devlog} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
