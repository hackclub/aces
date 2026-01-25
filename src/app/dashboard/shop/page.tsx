"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ShopRedirect() {
  const searchParams = useSearchParams();
  const item = searchParams.get("item");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!item) {
      setError("Missing item parameter. Please specify what you want to purchase.");
      setLoading(false);
      return;
    }

    async function fetchAndRedirect() {
      try {
        const res = await fetch("/api/shop/form-url");

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Failed to load shop configuration");
          setLoading(false);
          return;
        }

        const { formUrl } = await res.json();
        const redirectUrl = `${formUrl}?item=${encodeURIComponent(item!)}`;
        window.location.href = redirectUrl;
      } catch (err) {
        console.error("Error fetching form URL", err);
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      }
    }

    fetchAndRedirect();
  }, [item]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-black mb-4 text-gray-900 font-[family-name:var(--font-righteous)]">
          Oops!
        </h1>
        <p className="text-lg text-gray-700 mb-6">{error}</p>
        <a
          href="/dashboard"
          className="px-6 py-3 bg-[#DC143C] text-white font-bold rounded-xl hover:bg-[#8B0000] transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-black mb-6 text-gray-900 font-[family-name:var(--font-righteous)]">
          Shop
        </h1>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#DC143C] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg text-gray-700">Redirecting to shop...</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-black mb-6 text-gray-900 font-[family-name:var(--font-righteous)]">
            Shop
          </h1>
          <div className="w-12 h-12 border-4 border-[#DC143C] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopRedirect />
    </Suspense>
  );
}
