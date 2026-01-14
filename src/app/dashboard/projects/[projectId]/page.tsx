import { cookies } from "next/headers";
import Link from "next/link";
import DevlogCard, { Devlog } from "@/components/dashboard/DevlogCard";
import CreateDevlog from "@/components/dashboard/CreateDevlog";
import ProjectDetailsClient from "@/components/dashboard/ProjectDetailsClient";

type Project = {
  project_id: number;
  project_name: string;
  hackatime_projects: string[];
  hackatime_total_hours: number;
  last_updated: string;
  repo: string;
  demo_url: string;
  preview_image: string;
  description?: string;
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
      <ProjectDetailsClient project={project} />

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
