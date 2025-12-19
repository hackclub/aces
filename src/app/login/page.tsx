"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginResponse = {
  className: string
  message: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [emailButtonAllow, setEmailButtonAllow] = useState(true)
  const [otpButtonAllow, setOtpButtonAllow] = useState(true)
  const [message, setMessage] = useState<LoginResponse>({
    className: "hidden",
    message: ""
  })
  const [emailMode, setEmailMode] = useState(true)
  const router = useRouter()

  const otpOnClick = async () => {
    setEmailButtonAllow(false)

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: "Please enter a valid email address."
      })
      setEmailButtonAllow(true)
      return
    }

    setMessage({ className: "hidden", message: "" })

    try {
      const response = await fetch('/api/dashboard/request_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage({
          className: "text-green-500 mb-4 text-center",
          message: "OTP sent! Please check your email."
        })
        setEmailMode(false)
      } else {
        setMessage({
          className: "text-red-500 mb-4 text-center",
          message: "An error occurred. Please try again."
        })
      }
    } catch {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: "Network error. Please try again."
      })
    }

    setEmailButtonAllow(true)
  }

  const validateOnClick = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: "Please enter a valid 6-digit OTP."
      })
      return
    }

    setMessage({ className: "hidden", message: "" })
    setOtpButtonAllow(false)

    try {
      const response = await fetch('/api/dashboard/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      if (response.ok) {
        router.push('/dashboard')
      } else if (response.status === 401) {
        setMessage({
          className: "text-red-500 mb-4 text-center",
          message: "Wrong OTP. Please try again."
        })
      } else {
        setMessage({
          className: "text-red-500 mb-4 text-center",
          message: "An error occurred. Please try again."
        })
      }
    } catch {
      setMessage({
        className: "text-red-500 mb-4 text-center",
        message: "Network error. Please try again."
      })
    }

    setOtpButtonAllow(true)
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[url(/bg_new.png)] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col">
        <div>
          <h1 className="text-5xl font-bold mb-6 text-center">Login</h1>
        </div>
        <p className={message.className}>{message.message}</p>
        <div className={emailMode ? "" : "hidden"}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 border-gray-400 text-gray-900 text-2xl text-center rounded-lg w-full"
            placeholder="orpheus@hackclub.com"
          />
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full disabled:opacity-50"
            onClick={otpOnClick}
            disabled={!emailButtonAllow}
          >
            Send OTP
          </button>
        </div>
        <div className={emailMode ? "hidden" : ""}>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="bg-gray-100 border-gray-400 text-gray-900 text-2xl text-center rounded-lg w-full"
            placeholder="674169"
          />
          <button
            className="mt-4 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-300 w-full disabled:opacity-50"
            onClick={validateOnClick}
            disabled={!otpButtonAllow}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
