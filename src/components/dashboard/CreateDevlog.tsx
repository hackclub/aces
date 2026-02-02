"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

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
        const err = await res.json();
        throw new Error(err.detail || "Failed to create cash out");
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
        type="button"
        onClick={() => setOpen(true)}
        className="group w-full py-5 border-2 border-dashed border-rose-300 hover:border-rose-500 rounded-xl text-rose-600 hover:text-rose-700 transition-all duration-200 font-semibold bg-gradient-to-br from-rose-50/50 to-purple-50/50 hover:from-rose-100/50 hover:to-purple-100/50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        aria-label="Submit new cash out"
      >
        <span className="inline-flex items-center gap-2 text-lg">
          <svg
            className="w-6 h-6 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Submit Cash Out
        </span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border-2 border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
        Submit Cash Out
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            What did you work on?
            <span className="text-rose-600 ml-1">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={4}
            maxLength={1000}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none transition-all"
            placeholder="Describe your progress..."
          />
        </div>

        <div>
          <label
            htmlFor="media_url"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Media URL (screenshot/demo)
            <span className="text-rose-600 ml-1">*</span>
          </label>
          <input
            type="url"
            id="media_url"
            name="media_url"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            placeholder="https://hc-cdn.hel1.your-objectstorage.com/..."
          />
          <p className="mt-2 text-xs text-gray-500">
            Must be hosted on Hack Club CDN
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-700 hover:to-rose-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            aria-busy={loading}
          >
            {loading ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
