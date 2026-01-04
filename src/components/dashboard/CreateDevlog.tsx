"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateDevlog({ projectId }: { projectId: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      project_id: projectId,
      content: formData.get("content"),
      media_url: formData.get("media_url"),
    };

    try {
      const res = await fetch("/api/dashboard/devlogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to create devlog");
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
      >
        + Add Devlog
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            What did you work on?
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={3}
            maxLength={1000}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
            placeholder="Describe your progress..."
          />
        </div>

        <div>
          <label htmlFor="media_url" className="block text-sm font-medium mb-1">
            Media URL
          </label>
          <input
            type="url"
            id="media_url"
            name="media_url"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="https://hc-cdn.hel1.your-objectstorage.com/..."
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-rose-700 text-white hover:bg-rose-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Devlog"}
          </button>
        </div>
      </form>
    </div>
  );
}
