import Meta from "@/components/Meta";
import {Head, Html, Main, NextScript} from "next/document";
import React from "react";


export default function Document() {
	return (
		<Html className="scroll-smooth" lang="en">
			<Head>
				<Meta/>
			</Head>
			<body>
			<a className="absolute p-3 m-3 left-0 -translate-y-20 focus:translate-y-0" href="#main-content">Skip to Main
				Content</a>
			<Main />
			<NextScript />
			</body>
		</Html>
	);
}
