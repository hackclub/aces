"use client";
import type { User } from "@/app/dashboard/layout";
import UserContext from "@/app/dashboard/userContext";
import type { ReactNode } from "react";

export default function UserProvider({
  user,
  children,
}: { user: User; children: ReactNode }) {
  return <UserContext value={user}>{children}</UserContext>;
}
