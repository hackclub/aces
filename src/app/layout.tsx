import "@/styles/globals.css";
import { ReactNode } from "react";
import Meta from "@/components/Meta";
import { Righteous, Figtree } from "next/font/google";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export default function RootLayout({ children}: { children: ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${righteous.variable} ${figtree.variable}`}>
    <body className={`${figtree.className} bg-(--card)`}>
    <Meta />
    <a className="absolute p-3 m-3 left-0 -translate-y-20 focus:translate-y-0 hidden" href="#main-content">
      Skip to Main Content
    </a>
    { children }
    </body>
    </html>
  );
}
