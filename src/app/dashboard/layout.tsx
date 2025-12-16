import { ReactNode } from "react";
import DashNav from "@/components/dashboard/DashNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="">
        {children}
      </div>
      <DashNav />
    </div>
  );
}
