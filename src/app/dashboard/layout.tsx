import { ReactNode } from "react";
import { cookies } from "next/headers";
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

async function getUser(): Promise<User> {
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

  return (
    <div className="h-screen w-screen flex flex-col bg-[url(/bg_new.png)] bg-cover">
      <div className="flex-1 p-4 pb-24 md:pb-32 lg:pb-40 overflow-auto">
        <div className="bg-red-300/50 backdrop-blur-md rounded-lg shadow-lg p-6 min-h-full">
          <UserProvider user={user}>
            {children}
          </UserProvider>
        </div>
      </div>
      <DashNav />
    </div>
  );
}
