import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Flag from "@/components/Flag";
import {Outfit} from "next/font/google";

const outfit = Outfit({
	subsets: ["latin"]
})

export default function App({ Component, pageProps }: AppProps) {
	return <div className={`${outfit.className}`}>
		<Flag/>
		<Navbar/>
		<Component {...pageProps} />
		<Footer/>
	</div>
}
