"use client"
import Link from "next/link";
import { useRouter } from "next/router";


export default function Navbar() {
	const isHome = useRouter().pathname === "/"
  return (
    <div className="absolute w-full z-100 bg-transparent px-8 py-8 text-white">
      <div className="container mx-auto">
        <div className="md:space-x-6 space-x-2 text-right">
	        {!isHome &&
		        (<Link href="/" className="md:text-xl text-md hover:text-gray-300">
		          Home
	          </Link>)}
          <Link href="/#learn-more" className="md:text-xl text-md hover:text-gray-300">
            About
          </Link>
          <Link href="/#requirements" className="md:text-xl text-md hover:text-gray-300">
            Requirements
          </Link>
          <Link href="/gallery" className="md:text-xl text-md hover:text-gray-300">
	          Gallery
          </Link>
          <Link href="/#faq" className="md:text-xl text-md hover:text-gray-300">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
