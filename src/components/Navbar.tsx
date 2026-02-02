"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const isHome = usePathname() === "/";
  return (
    <nav
      className="absolute w-full z-50 bg-transparent px-6 py-6 text-white"
      aria-label="Main navigation"
    >
      <ul className="mx-auto md:space-x-6 space-x-3 text-right font-bold">
        {!isHome && (
          <li className="inline">
            <Link
              href="/"
              className="md:text-xl text-md transition-colors hover:text-[#FFD700]"
            >
              Home
            </Link>
          </li>
        )}
        <li className="inline">
          <Link
            href="/#learn-more"
            className="md:text-xl text-md transition-colors hover:text-[#FFD700]"
          >
            About
          </Link>
        </li>
        <li className="inline">
          <Link
            href="/#requirements"
            className="md:text-xl text-md transition-colors hover:text-[#FFD700]"
          >
            Requirements
          </Link>
        </li>
        <li className="inline">
          <Link
            href="/#faq"
            className="md:text-xl text-md transition-colors hover:text-[#FFD700]"
          >
            FAQ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
