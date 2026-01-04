"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      project_name: formData.get("project_name"),
      repo: formData.get("repo") || null,
      demo_url: formData.get("demo_url") || null,
      preview_image: formData.get("preview_image") || null,
    };

    try {
      const res = await fetch("/api/dashboard/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to create project");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-3xl font-bold mb-6">New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="project_name" className="block text-sm font-medium mb-1">
            Project Name *
          </label>
          <input
            type="text"
            id="project_name"
            name="project_name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="My Awesome Project"
          />
        </div>

        <div>
          <label htmlFor="repo" className="block text-sm font-medium mb-1">
            GitHub Repo URL
          </label>
          <input
            type="url"
            id="repo"
            name="repo"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <label htmlFor="demo_url" className="block text-sm font-medium mb-1">
            Demo URL
          </label>
          <input
            type="url"
            id="demo_url"
            name="demo_url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="https://myproject.com"
          />
        </div>

        <div>
          <label htmlFor="preview_image" className="block text-sm font-medium mb-1">
            Preview Image URL
          </label>
          <input
            type="url"
            id="preview_image"
            name="preview_image"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="https://example.com/image.png"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-rose-700 text-white hover:bg-rose-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
