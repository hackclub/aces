import "@/styles/globals.css";
import { ReactNode } from "react";
import DashNav from "@/components/dashboard/DashNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={"h-screen w-screen rounded-2xl p-20 flex flex-row"}>
      <DashNav />
      {children}
    </div>
  );
}
