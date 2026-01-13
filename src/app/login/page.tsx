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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[url(/bg_new.png)] bg-cover">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 flex flex-col border-2 border-gray-100">
        <div>
          <h1 className="text-5xl font-bold mb-8 text-center text-gray-900 tracking-tight">Login</h1>
        </div>
        {referralMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm text-center">
            {referralMessage}
          </div>
        )}
        <button
          className="mt-4 px-6 py-3.5 bg-red-500 text-white rounded-xl hover:bg-red-600 w-full font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
          onClick={handleLogin}
          aria-label="Login with Hack Club Account"
        >
          Login with Hack Club Account
        </button>
      </div>
    </div>
  );
}
