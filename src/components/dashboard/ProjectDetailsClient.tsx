"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import EditProject from "./EditProject";

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

type Props = {
  project: Project;
  devlogCount: number;
};

export default function ProjectDetailsClient({ project, devlogCount }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [shipError, setShipError] = useState<string | null>(null);

  const canShip = !project.shipped && devlogCount > 0;

  async function handleShip() {
    setIsShipping(true);
    setShipError(null);

    try {
      const res = await fetch(`/api/projects/${project.project_id}/ship`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Failed to ship project");
      }

      router.refresh();
    } catch (err) {
      setShipError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsShipping(false);
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden mb-8">
        {project.preview_image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.preview_image}
            alt={project.project_name}
            className="w-full h-36 object-cover"
          />
        )}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {project.project_name}
              </h1>
              <p className="text-gray-600 mt-2 text-lg font-medium">
                {project.hackatime_total_hours.toFixed(1)} hours logged
              </p>
              {project.description && (
                <p className="text-gray-700 mt-4 text-base leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {project.shipped && (
                <span className="bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                  Shipped
                </span>
              )}
              {canShip && (
                <button
                  onClick={handleShip}
                  disabled={isShipping}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isShipping ? "Shipping..." : "Ship Project"}
                </button>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 shadow-sm hover:shadow-md"
              >
                Edit
              </button>
            </div>
            {shipError && (
              <p className="text-red-600 text-sm mt-2">{shipError}</p>
            )}
          </div>

          {(project.repo || project.demo_url) && (
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
          )}
          
          <div className="mt-6">
            <a
              href="/dashboard"
              className="text-rose-600 hover:text-rose-700 font-medium transition-colors underline focus:outline-none focus:ring-2 focus:ring-rose-500 rounded px-1"
            >
              &larr; Back to Projects
            </a>
          </div>

          {project.hackatime_projects.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-gray-100">
              <p className="text-sm font-semibold text-gray-600 mb-3">
                Linked Hackatime projects:
              </p>
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

      {isEditing && (
        <EditProject
          projectId={project.project_id}
          initialData={{
            project_name: project.project_name,
            repo: project.repo,
            demo_url: project.demo_url,
            preview_image: project.preview_image,
            description: project.description || "",
            hackatime_projects: project.hackatime_projects,
          }}
          onCancelAction={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
