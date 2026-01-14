"use client";

import { useState } from "react";
import Image from "next/image";
import EditProject from "./EditProject";

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

export default function ProjectDetailsClient({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden mb-8">
        {project.preview_image && (
          <Image
            src={project.preview_image}
            alt={project.project_name}
            width={600}
            height={225}
            className="w-full h-36 object-cover"
          />
        )}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {project.project_name}
              </h1>
              <p className="text-gray-600 mt-2 text-lg font-medium">
                {project.hackatime_total_hours.toFixed(1)} hours logged
              </p>
            </div>
            <div className="flex items-center gap-3">
              {project.shipped && (
                <span className="bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                  Shipped
                </span>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 shadow-sm hover:shadow-md"
              >
                Edit
              </button>
            </div>
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
            repo: project.repo || "",
            demo_url: project.demo_url || "",
            preview_image: project.preview_image || "",
            hackatime_projects: project.hackatime_projects,
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
