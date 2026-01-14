"use client";

import { useState } from "react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IconType } from "react-icons";

type DashItemProps = {
  href: string,
  Icon: IconType,
  label: string,
  disabled?: boolean
}

function DashItem({href, Icon, label, disabled}: DashItemProps) {
  return (
    <a 
      href={!disabled ? href : undefined} 
      className={disabled ? "pointer-events-none" : "group"}
      aria-disabled={disabled}
      aria-label={label}
    >
      <div className={"px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#DC143C] to-[#8B0000] text-white text-center transition-all inline-flex items-center justify-center text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-[#FFD700] focus:ring-offset-2 shadow-lg font-black tracking-wide" + (disabled ? " opacity-40 cursor-not-allowed" : " hover:cursor-pointer hover:shadow-xl")}>
        <Icon className="mr-2.5" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </a>
  )
}

export default function DashNav() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        onClick={toggleCollapse}
        className="h-3 bg-[#DC143C] cursor-pointer hover:bg-[#B01030] transition-colors"
        role="button"
        tabIndex={0}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        onKeyDown={(e) => e.key === "Enter" && toggleCollapse()}
      />
      <nav
        className={`bg-gradient-to-t from-[#0F1419] via-[#590019] to-transparent backdrop-blur-xl flex items-center justify-center px-6 shadow-[0_-8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden ${
          collapsed ? "h-0" : "h-20"
        }`}
        role="navigation"
        aria-label="Dashboard navigation"
        aria-hidden={collapsed}
      >
        <div className="flex items-center justify-around space-x-4 md:space-x-12">
          <DashItem href={"/dashboard"} Icon={FaHome} label={"Home"}/>
          <DashItem href={"/dashboard/shop"} Icon={FaShoppingCart} label={"Shop"} disabled/>
          <DashItem href={"/dashboard/projects"} Icon={FaMagnifyingGlass} label={"Explore"} disabled />
        </div>
      </nav>
    </div>
  );
}
