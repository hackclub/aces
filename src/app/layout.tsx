import "@/styles/globals.css";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Flag from "@/components/Flag";
import Meta from "@/components/Meta";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({ children}: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
    <head>
      <Meta />
    </head>
    <body className={`${outfit.className} bg-[var(--card)]`}>
    <a className="absolute p-3 m-3 left-0 -translate-y-20 focus:translate-y-0 hidden" href="#main-content">
      Skip to Main Content
    </a>
    { children }
    </body>
    </html>
  );
}
