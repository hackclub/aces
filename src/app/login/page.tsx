"use client"
import { useState } from "react";
import { apiUrl } from "@/utils";
import { useRouter } from "next/navigation";

type LoginResponse = {
  className: string
  message: string
}

export default function LoginPage() {

  const [emailButtonAllow, setEmailButtonAllow] = useState<boolean>(true)

  const otpOnClick = async () => {

    setEmailButtonAllow(false)

    const email = (document.getElementById('email') as HTMLInputElement).value

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: "Please enter a valid email address."
      })
      setEmailButtonAllow(true)
      return;
    } else {
      setMessage({
        className: "hidden",
        message: ""
      })
    }

    const response = email === "let@me.pass" ? {ok: true, status: 200} : await fetch('/api/dashboard/request_otp', { // TODO REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REVMOE!!!!!
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    if (response.ok || email == "let@me.pass") { // TODO REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE
      setMessage({
        className: "text-green-500 mb-4 text-center",
        message: "OTP sent! Please check your email."
      })
      setEmailMode(false)
    } else {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: `An error occurred. Please try again. (code ${response.status})`
      })
    }
    setEmailButtonAllow(true)
  }

  const router = useRouter()

  const validateOnClick = async () => {
    const email = (document.getElementById('email') as HTMLInputElement).value
    const otpStr = (document.getElementById('otp') as HTMLInputElement).value

    if (!/^\d{6}$/.test(otpStr)) {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: "Please enter a valid 6-digit OTP."
      })
      return;
    }
    setMessage({
      className: "hidden",
      message: ""
    })

    const otp = parseInt(otpStr)

    const response = await fetch(apiUrl`api/v1/auth/validate_otp`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email, otp })
    })
    const data = await response.json()
    if (response.ok) {
      router.push('/dashboard')
    } else if (response.status == 401) {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: "Wrong OTP. Please try again."
      })
    } else {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: data["detail"] || `An error occurred. Please try again. (code ${response.status})`
      })
    }
  }

  const [message, setMessage] = useState<LoginResponse>({
    className: "hidden",
    message: ""
  })

  const [emailMode, setEmailMode] = useState<boolean>(true)

  return <div className="h-screen w-screen flex flex-col items-center justify-center bg-[url(/bg_new.png)] bg-cover" >
    <div className={"bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col"}>
      <div>
        <h1 className={"text-5xl font-bold mb-6 text-center"}>Login</h1>
      </div>
      <p id={"lecture"} className={message.className}>{message.message}</p>
      <div className={emailMode ? "" : "hidden"}>
        <input type="email"
               id="email"
               name="email"
               className={"bg-gray-100 border-gray-400 text-gray-900 text-2xl text-center rounded-lg w-full"}
               placeholder="orpheus@hackclub.com"
        />
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
                onClick={otpOnClick}
                disabled={!emailButtonAllow}
        >
          Send OTP
        </button>
      </div>
      <div className={emailMode ? "hidden" : ""}>
        <input type="number"
               id="otp"
               name="otp"
               className={"bg-gray-100 border-gray-400 text-gray-900 text-2xl text-center rounded-lg w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"}
               placeholder="674169"

        />
        <button className="mt-4 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-300 w-full"
                onClick={validateOnClick}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
}