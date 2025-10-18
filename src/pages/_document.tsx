import Meta from "@/components/Meta";
import {Head, Main, NextScript} from "next/document";
import React from "react";


export default function Document() {
	return (
		<html className="scroll-smooth" lang="en">
			<Head>
				<Meta/>
			</Head>
			<body>
			<Main />
			<NextScript />
			</body>
		</html>
	);
}
