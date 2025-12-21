"use client";
import { ReactNode } from "react";
import { UserContext } from "@/app/dashboard/userContext";
import { User } from "@/app/dashboard/layout";

export default function UserProvider({ user, children }: { user: User; children: ReactNode }) {
  return (
    <UserContext value={user}>
      {children}
    </UserContext>
  );
}
