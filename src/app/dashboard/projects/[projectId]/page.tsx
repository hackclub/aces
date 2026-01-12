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
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Project not found</h1>
        <Link 
          href="/dashboard" 
          className="text-rose-700 hover:text-rose-800 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 rounded px-2 py-1"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard"
        className="text-rose-700 hover:text-rose-800 font-semibold mb-6 inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 rounded px-2 py-1"
      >
        &larr; Back to Projects
      </Link>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden mb-8">
        {project.preview_image && (
          <Image
            src={project.preview_image}
            alt={project.project_name}
            width={800}
            height={300}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{project.project_name}</h1>
              <p className="text-gray-600 mt-2 text-lg font-medium">
                {project.hackatime_total_hours.toFixed(1)} hours logged
              </p>
            </div>
            {project.shipped && (
              <span className="bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                Shipped
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 shadow-sm hover:shadow-md"
              >
                View Repo
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
              >
                View Demo
              </a>
            )}
          </div>

          {project.hackatime_projects.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-gray-100">
              <p className="text-sm font-semibold text-gray-600 mb-3">Linked Hackatime projects:</p>
              <div className="flex flex-wrap gap-2">
                {project.hackatime_projects.map((hp) => (
                  <span
                    key={hp}
                    className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200"
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
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Cash Outs</h2>
          <span className="px-3.5 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm font-bold border border-rose-200">
            {devlogs.length}
          </span>
        </div>
        <div className="space-y-5">
          <CreateDevlog projectId={project.project_id} />
          {devlogs.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="text-gray-400 mb-3">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-700 font-semibold text-lg">No cash outs yet</p>
              <p className="text-gray-500 mt-2">Submit your first cash out to earn cards!</p>
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
