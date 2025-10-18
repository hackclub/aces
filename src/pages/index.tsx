import Image from "next/image";
import Button from "@/components/Button";
import {FaArrowDown} from "react-icons/fa6";
import Link from "next/link";
export default function Home() {

	const handleAlert = (message: string) => {
		alert(message);
	}

  return (
	  <>
		  <div className="bg-gradient-to-br from-rose-800 to-red-950">
			  <div className="container mx-auto h-screen flex items-center md:p-0 p-5">
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
						  <span className="text-rose-600"><Link href={"https://awesome-con.com/"}>AwesomeCon</Link></span> in DC!
					  </p>

					  <div className="flex justify-center gap-x-4">
						  <Button href={"https://forms.hackclub.com/aces-rsvp"} color={"rose"}>RSVP</Button>
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
		  </div>
	  </>
  );
}