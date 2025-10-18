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
			<Main />
			<NextScript />
			</body>
		</Html>
	);
}
