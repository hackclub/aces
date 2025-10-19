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
	const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

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
			  <div className="relative">
				  <button
					  onClick={() => setIsCardOpen(v => !v)}
					  aria-expanded={isCardOpen}
					  className="focus:outline-none mx-auto"
				  >
					  <Image
						  src={"/aces_card.svg"}
						  alt={"Aces Logo"}
						  width={300}
						  height={300}
						  className={`transition-transform duration-300 ${isCardOpen ? 'scale-105 rotate-3 -translate-y-40' : 'scale-100 animate-pulse'}`}
					  />
				  </button>

				  <div className={`absolute top-3/4 mt-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${isCardOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
					  <div className="bg-white text-black p-4 rounded shadow-lg w-80">
						  <ul>
							  <li>
								  Create a <span className={"text-rose-300 font-extrabold"}> virtual card/board game in 40 hours...</span>
							  </li>
							  <li>
								  Get a grant to <span className={"text-rose-300 font-extrabold"}>make your game for real...</span>
							  </li>
							  <li>
								  And get invited to <span className={"text-rose-300 font-extrabold"}>The Deck</span>, a 48 hour hackathon in Washington DC!
							  </li>
						  </ul>
						</div>
				  </div>

				  <div className={`absolute left-0 -bottom-50 w-full text-center ${isCardOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
					  <a href="#requirements">
						  <h2 className="text-white text-xl mb-2">Requirements</h2>
						  <FaArrowDown className="mx-auto text-white text-xl animate-bounce" />
					  </a>
				  </div>
			  </div>


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