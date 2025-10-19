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
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const faqItems = [
		{ q: 'Do we need Hackatime? Can we track Art?', a: 'Yes, you need Hackatime. We are currently discussing the best solution to offer time tracking for art, but it will be allowed.' },
		{ q: 'When/Where is the IRL event?', a: 'March 13-15 in DC.' },
		{ q: 'Can I still make a game if I cannot go IRL?', a: 'Yes. We will have a shop for other things for you to spend your hours on as well.' },
		{ q: 'How do travel stipends work?', a: 'For every hour not used towards the 40hr event invitation, you will gain currency. The currency will be spendable for flight stipends at a rate of $10/hr, among other prizes.' },
		{ q: 'Do projects need to be open source?', a: 'Yes.' },
		{ q: 'Can you work in teams?', a: 'Yes, but each person must complete the 40hr requirement separately. For example, a team of two needs 80 hours total (40 for each person).' },
	];

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
			  <div className="w-full max-w-2xl bg-white/5 p-6 rounded-lg">
				  <h2 className="text-3xl text-white font-semibold mb-4">Requirements</h2>
				  <ul className="list-disc list-inside space-y-4 text-white">
					  <li>
						  <strong>NO AI ART</strong>: All visual assets must be created by humans (no AI-generated images).
					  </li>
					  <li>
						  <strong>40 hours logged</strong>: You must log at least 40 hours of work total covering both art and code.
					  </li>
					  <li>
						  <strong>≤ 30% AI code</strong>: No more than 30% of the games code can be AI-Written. Write your own code!
					  </li>
					  <li>
						  <strong>Human-written README</strong>: The README must be authored by humans. It's okay if it's not your best writing, but please make it personal!
					  </li>
					  <li>
						  <strong>Open source on GitHub</strong>: Project must be public on GitHub (include a clear license).
					  </li>
					  <li>
						  <strong>Shipped to itch.io or Steam</strong>: Final build must be published on itch.io or Steam!
					  </li>
				  </ul>
				  <div className={`absolute left-0 -bottom-460 w-full text-center`}>
					  <a href="#faq">
						  <h2 className="text-white text-xl mb-2">FAQ</h2>
						  <FaArrowDown className="mx-auto text-white text-xl animate-bounce" />
					  </a>
				  </div>
			  </div>
		  </div>
		  <div id={"faq"} className="container h-screen flex items-center justify-center p-5">
			  <div className="w-full max-w-2xl p-6 bg-rose-800 rounded-lg text-white">
				  <h2 className="text-3xl font-semibold text-center mb-6">FAQ</h2>
				  <ul className="space-y-3">
					  {faqItems.map((item, i) => (
						    <li key={i} className="border-b border-white/10 pb-3">
						      <button
						        onClick={() => setOpenFaq(openFaq === i ? null : i)}
						        aria-expanded={openFaq === i}
						        aria-controls={`faq-${i}`}
						        className="w-full flex items-center justify-between text-left py-2"
						      >
						        <span className="font-bold">{item.q}</span>
						        <span className={`flex flex-col gap-1 w-5 h-5 transition-transform ${openFaq === i ? 'rotate-90' : ''}`}>
						          <span className="block h-[2px] w-full bg-white" />
						          <span className="block h-[2px] w-full bg-white" />
						          <span className="block h-[2px] w-full bg-white" />
						        </span>
						      </button>
						      <div id={`faq-${i}`} className={`ml-6 mt-2 text-sm transition-all overflow-hidden ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
						        <p>{item.a}</p>
						      </div>
						    </li>
					  ))}
				  </ul>
			  </div>
		  </div>
	  </main>
  );
}