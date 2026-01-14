"use client";

import { useEffect, useState } from "react";

export default function CardsProgressBar() {
  const [cards, setCards] = useState<number | null>(null);
  const maxCards = 400;

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCards(data.cards);
        }
      } catch (err) {
        console.error("Failed to fetch cards:", err);
      }
    }
    fetchCards();
  }, []);

  if (cards === null) return null;

  const percentage = Math.min((cards / maxCards) * 100, 100);

  return (
    <div className="mb-10 relative">
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-black tracking-tighter text-[#DC143C] drop-shadow-[0_2px_8px_rgba(220,20,60,0.3)] font-[family-name:var(--font-righteous)]">
            {cards}
          </span>
          <span className="text-2xl font-black text-gray-300">/</span>
          <span className="text-3xl font-black text-gray-700">{maxCards}</span>
          <span className="text-sm font-black text-gray-600 uppercase tracking-wider ml-2 bg-[#FFD700]/30 px-2 py-1 rounded-full">
            Cards
          </span>
        </div>
      </div>

      <div className="relative h-12 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 rounded-2xl overflow-visible shadow-inner border-2 border-gray-300">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#DC143C] rounded-2xl transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/30" />
        </div>

        <div className="absolute -right-10 top-1/2 -translate-y-1/2 z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aces_card_centered.svg"
            alt="ACES Card"
            className="w-20 h-28 transform rotate-[15deg] drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
