import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const isHome = useRouter().pathname === "/";
  return (
    <nav
      className="absolute w-full z-[50] bg-transparent px-8 py-8 text-white"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="mx-auto md:space-x-6 space-x-2 text-right">
        {!isHome && (
          <li className="inline">
            <Link href="/" className="md:text-xl text-md hover:text-gray-300">
              Home
            </Link>
          </li>
        )}
        <li className="inline">
          <Link
            href="/#learn-more"
            className="md:text-xl text-md hover:text-gray-300"
          >
            About
          </Link>
        </li>
        <li className="inline">
          <Link
            href="/#requirements"
            className="md:text-xl text-md hover:text-gray-300"
          >
            Requirements
          </Link>
        </li>
        <li className="inline">
          <Link href="/#faq" className="md:text-xl text-md hover:text-gray-300">
            FAQ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
