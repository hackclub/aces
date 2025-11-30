"use client";
import { useState } from "react";

export default function LoginPage() {
  const [otpVisible, setOtpVisible] = useState(false);
  const [email, setEmail] = useState("");
  const valid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(email);

  async function clicky(
    email: string,
    otp: string | undefined
  ) {
    if (!otpVisible) {
      alert("yes, sending otp to " + email);

      const IDVres = await fetch(`https://identity.hackclub.com/api/external/check?email=${email}`)
      const IDVdata = await IDVres.json();
      const result = IDVdata["result"] === "verified_eligible";
      if (!result) {
        alert("Verify at https://identity.hackclub.com/verify to continue.");
        return;
      }
      setOtpVisible(true);
    } else {
      // do the verification
      alert("verifying otp " + otp + " for " + email);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8">Login Page</h1>
        <div className={"flex flex-col"}>
          <input type={"email"}
                 id={"email"}
                 placeholder={"orpheus@aces.deck"}
                 className={`mb-4 p-2 border border-gray-300 rounded-lg w-64 ${
                   valid ? "border-green-500" : email !== "" ? "border-red-300" : "border-gray-300"
                 }`}
                 onInput={(e) => setEmail(e.currentTarget.value)}
                 hidden={otpVisible} />
          <input type={"password"} id={"otp"} placeholder={"679123"} className={"mb-4 p-2 border border-gray-300 rounded-lg w-64"} hidden={!otpVisible} />
          <input type={"button"} className={"mb-4 p-2 border border-gray-300 rounded-lg w-64"} value={"Login"} onClick={() => {
            const email = document.getElementById("email") as HTMLInputElement | null;
            const otp = document.getElementById("otp") as HTMLInputElement | null;
            if (otp === null || !valid) return;
            clicky(email!.value, otp?.value);
          }} />
        </div>
      </div>
    </div>
  );
}