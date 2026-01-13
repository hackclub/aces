"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type HackatimeProject = {
  name: string;
  hours: number;
};

type ProjectData = {
  project_name: string;
  repo: string;
  demo_url: string;
  preview_image: string;
  hackatime_projects: string[];
};

export default function EditProject({
  projectId,
  initialData,
  onCancel,
}: {
  projectId: number;
  initialData: ProjectData;
  onCancel: () => void;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hackatimeProjects, setHackatimeProjects] = useState<HackatimeProject[]>([]);
  const [loadingHackatime, setLoadingHackatime] = useState(true);

  useEffect(() => {
    async function fetchHackatimeProjects() {
      try {
        const res = await fetch(`/api/hackatime/projects`);
        if (res.ok) {
          const data = await res.json();
          setHackatimeProjects(
            Object.entries(data).map(([name, seconds]) => ({
              name,
              hours: ((seconds as number) || 0) / 3600,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch Hackatime projects", err);
      } finally {
        setLoadingHackatime(false);
      }
    }
    fetchHackatimeProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to update project");
      }

      router.refresh();
      onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleHackatimeProject = (projectName: string) => {
    setFormData((prev) => ({
      ...prev,
      hackatime_projects: prev.hackatime_projects.includes(projectName)
        ? prev.hackatime_projects.filter((p) => p !== projectName)
        : [...prev.hackatime_projects, projectName],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Edit Project</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded">
              <p className="text-rose-800 font-medium">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="project_name" className="block text-sm font-bold text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              id="project_name"
              value={formData.project_name}
              onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 transition-colors font-medium"
              required
            />
          </div>

          <div>
            <label htmlFor="repo" className="block text-sm font-bold text-gray-700 mb-2">
              Repository URL
            </label>
            <input
              type="url"
              id="repo"
              value={formData.repo}
              onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 transition-colors font-medium"
            />
          </div>

          <div>
            <label htmlFor="demo_url" className="block text-sm font-bold text-gray-700 mb-2">
              Demo URL
            </label>
            <input
              type="url"
              id="demo_url"
              value={formData.demo_url}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 transition-colors font-medium"
            />
          </div>

          <div>
            <label htmlFor="preview_image" className="block text-sm font-bold text-gray-700 mb-2">
              Preview Image URL
            </label>
            <input
              type="url"
              id="preview_image"
              value={formData.preview_image}
              onChange={(e) => setFormData({ ...formData, preview_image: e.target.value })}
              placeholder="https://hc-cdn.hel1.your-objectstorage.com/..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 transition-colors font-medium"
            />
            <p className="mt-2 text-xs text-gray-600">Must be hosted on Hack Club CDN</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Linked Hackatime Projects
            </label>
            {loadingHackatime ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rose-500 border-r-transparent"></div>
              </div>
            ) : hackatimeProjects.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-600 font-medium">No Hackatime projects available</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto border-2 border-gray-200 rounded-lg p-3">
                {hackatimeProjects.map((project) => (
                  <label
                    key={project.name}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={formData.hackatime_projects.includes(project.name)}
                        onChange={() => toggleHackatimeProject(project.name)}
                        className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                      />
                      <span className="font-medium text-gray-900">{project.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      {project.hours.toFixed(1)}h
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
