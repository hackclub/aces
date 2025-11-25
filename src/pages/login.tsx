import { useState } from "react";

export default function LoginPage() {
  const [hideOtp, setHideOtp] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8">Login Page</h1>
        <div className={"flex flex-col"}>
          <div>
            <input type={"checkbox"} name={"hideOtp"} className={"mb-4 mr-1"} defaultChecked={hideOtp} onInput={() => {setHideOtp(!hideOtp);}}/>
            kjkasjdka
          </div>
          <input type={"email"} name={"email"} placeholder={"orpheus@hb.com"} className={"mb-4 p-2 border border-gray-300 rounded-lg w-64"} hidden={hideOtp} />
          <input type={"password"} name={"otp"} placeholder={"679123"} className={"mb-4 p-2 border border-gray-300 rounded-lg w-64"} hidden={!hideOtp} />
          <input type={"submit"} className={"mb-4 p-2 border border-gray-300 rounded-lg w-64"} />
        </div>
      </div>
    </div>
  );
}