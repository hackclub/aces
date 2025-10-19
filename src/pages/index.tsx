import Image from "next/image";
import Button from "@/components/Button";
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ForbiddenPopup from "@/components/ForbiddenPopup";
export default function Home() {

	const router = useRouter();
	const [is404, setIs404] = useState<boolean>(false);
	const [isForbidden, setIsForbidden] = useState<boolean>(false);
	const [ref, setRef] = useState<string | null>(null);

	useEffect(() => {
		if (!router.isReady) return;
		const is404 = "404" in router.query
		const isForbidden = "forbidden" in router.query
		const rawRef = router.query["ref"]

		const ref = rawRef ? rawRef as string : null;

		setIs404(is404)
		setIsForbidden(isForbidden)
		setRef(ref)

		}, [router.isReady, router.query]
	)
  return (
	  <main>
		  <div className="container h-screen flex items-center md:p-0 p-5">
			  <ForbiddenPopup isForbidden={isForbidden} isNotFound={is404}/>
			  <div className="w-full text-center self-center">
				  <Image
					  src={"/aces_logo.svg"}
					  alt="Aces Logo"
					  width={0}
					  height={0}
					  style={{ width: '50%', height: '50%' }}
					  className="mb-4 mx-auto"
				  />
				  <p className="md:text-3xl text-lg text-white font-medium mb-5">
					  You ship a {" "}
					  <span className={"text-rose-600"}>virtual card/board game</span>
					  , we ship{" "}
					  <span className="text-rose-600">your game physically</span> {" "}
					  and a trip to {" "}
					  <span className="text-rose-600 underline"><Link href={"https://awesome-con.com/"}>AwesomeCon</Link></span> in DC!
				  </p>

				  <div className="flex justify-center gap-x-4">
					  <Button href={"https://forms.hackclub.com/aces-rsvp" + (ref && `?ref=${ref}`)} color={"rose"}>RSVP</Button>
					  <Button color={"red"} invert>Submit</Button>
				  </div>
			  </div>
			  <div className="absolute left-0 bottom-12 w-full text-center">
				  <a href="#learn-more">
					  <h2 className="text-white text-xl mb-2">Learn more</h2>
					  <FaArrowDown className="mx-auto text-white text-xl animate-bounce" />
				  </a>
			  </div>
		  </div>
		  <div id={"learn-more"} className="container h-screen flex items-center justify-center p-5">
			  <h1 className={"text-center self-center"}>learn more</h1>
		  </div>
		  <div id={"requirements"} className="container h-screen flex items-center justify-center p-5">
			  <h1 className={"text-center self-center"}>req</h1>
		  </div>
		  <div id={"faq"} className="container h-screen flex items-center justify-center p-5">
			  <h1 className={"text-center self-center"}>faq stack</h1>
		  </div>
	  </main>
  );
}