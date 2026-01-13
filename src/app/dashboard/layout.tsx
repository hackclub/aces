import { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import DashNav from "@/components/dashboard/DashNav";
import UserProvider from "@/app/dashboard/UserProvider";

export type User = {
  id: number
  email: string
  username: string
  hackatime_id: number
  permissions: string[]
  marked_for_deletion: boolean
} | null

async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
    headers: {
      Cookie: `sessionId=${sessionId}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const headersList = await headers()
  const pathname = headersList.get('x-pathname')
    ?? headersList.get('x-invoke-path')
    ?? ''

  return (
    <div className="h-screen w-screen flex flex-col bg-[url(/bg_new.png)] bg-cover relative">
      <div className="flex-1 p-4 pb-24 md:pb-32 lg:pb-40 overflow-auto">
        <div className="bg-red-300/60 backdrop-blur-md rounded-2xl shadow-xl p-8 min-h-full border-2 border-red-400/30">
          <UserProvider user={user}>
            {children}
          </UserProvider>
        </div>
      </div>
      <DashNav />
      {/*
      {!hide && user && (
          <div className="fixed bottom-40 left-4 w-58 bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center gap-3 hover:shadow-xl transition-shadow">
            <Image
              src={`/shehasnoclueeither.png`} //TODO, figure out how to get slack pfps and render those
              alt={user.username ?? "Profile Picture"}
              width={64}
              height={64}
              className="w-24 h-24 rounded-full bg-gray-200 object-cover shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{user.username}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
      */}
    </div>
  );
}
