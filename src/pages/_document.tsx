import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google"
import Flag from "@/components/Flag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";


const outfit = Outfit({
	subsets: ["latin"]
})

export default function RootLayout({
	                                   children,
                                   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="scroll-smooth" lang="en">
			<head>
				<Meta/>
			</head>
			<body className={`${outfit.className}`}>
				<Flag />
					<Navbar />
					{children}
				<Footer />
			</body>
		</html>
	);
}
