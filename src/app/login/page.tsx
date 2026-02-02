"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [referralMessage, setReferralMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get("ref") || urlParams.get("referral");

    if (referralCode) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `referralCode=${encodeURIComponent(referralCode)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

      setReferralMessage(`Referral code "${referralCode}" has been set!`);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/oauth`;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[url(/bg_new.png)] bg-cover relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1419]/60 via-[#590019]/40 to-transparent backdrop-blur-sm" />
      <div className="relative bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[420px] flex flex-col border-3 border-[#DC143C]">
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-[#FFD700] to-[#DC143C] rounded-full opacity-20 blur-2xl" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-[#DC143C] to-[#590019] rounded-full opacity-20 blur-2xl" />
        <div className="relative z-10">
          <h1 className="text-5xl font-black mb-8 text-center bg-gradient-to-br from-[#DC143C] to-[#590019] bg-clip-text text-transparent tracking-tighter drop-shadow-lg font-[family-name:var(--font-righteous)]">
            Login
          </h1>
        </div>
        {referralMessage && (
          <div className="mb-5 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-400 rounded-xl text-emerald-800 font-bold text-sm text-center shadow-md">
            {referralMessage}
          </div>
        )}
        <button
          type="button"
          className="mt-4 px-6 py-4 bg-gradient-to-br from-[#DC143C] to-[#8B0000] text-white rounded-2xl hover:from-[#FF1744] hover:to-[#DC143C] w-full font-black text-lg tracking-wide transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FFD700] focus:ring-offset-2 shadow-lg hover:shadow-xl"
          onClick={handleLogin}
          aria-label="Login with Hack Club Account"
        >
          Login with Hack Club Account
        </button>
      </div>
    </div>
  );
}
