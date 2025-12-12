"use client"
import Image from "next/image";
import Button from "@/components/Button";
import { useState } from "react";
import Flag from "@/components/Flag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reqItems = [
    {
      sum: "NO AI ART",
      det: "All non-programming assets must be created by humans",
    },
    {
      sum: "40 hours logged",
      det: "You must log at least 40 hours of work total covering both art and code.",
    },
    {
      sum: "≤ 30% AI code",
      det: "No more than 30% of the games code can be AI-Written. Write your own code!",
    },
    {
      sum: "Human-written README",
      det: "The README must be authored by humans. It's okay if it's not your best writing, but please make it personal!",
    },
    {
      sum: "FOSS",
      det: `Your game must be public on ${<a href='https://github.com'>GitHub</a>} (or another Git server). Include a clear license, I recommend the WTFPL!`,
    },
    {
      sum: "Shipped to itch.io or Steam",
      det: "The built game must be published on itch.io or Steam!",
    },
  ];

  const faqItems = [
    {
      q: "Do we need Hackatime? Can we track Art?",
      a: "Yes, you need Hackatime. We are currently discussing the best solution to offer time tracking for art, but it will be allowed.",
    },
    { q: "When/Where is the IRL event?", a: "March 13-15 in DC." },
    {
      q: "Can I still make a game if I cannot go IRL?",
      a: "Yes. We will have a shop for other things for you to spend your hours on as well.",
    },
    {
      q: "How do travel stipends work?",
      a: "For every hour not used towards the 40hr event invitation, you will gain currency. The currency will be spendable for flight stipends at a rate of $10/hr, among other prizes.",
    },
    { q: "Do projects need to be open source?", a: "Yes." },
    {
      q: "Can you work in teams?",
      a: "Yes, but each person must complete the 40hr requirement separately. For example, a team of two needs 80 hours total (40 for each person).",
    },
  ];

  return <>
    <Flag />
    <Navbar />
    <main>
      <div className="container h-screen flex items-center md:p-0 p-5">
        <h1 className="sr-only">Ace Homepage</h1>
        <div className="w-full text-center self-center">
          <Image
            src={"/aces_logo.svg"}
            alt="Aces Logo"
            width={0}
            height={0}
            style={{ width: "50%", height: "50%" }}
            className="mb-4 mx-auto"
          />
          <p className="md:text-3xl text-lg text-white font-medium mb-5">
            Build your own digital <strong>board/card game</strong>, get a{" "}
            <strong>grant</strong> to make it real, and head to DC for{" "}
            <strong>AwesomeCon</strong> to showcase it, then stay for an
            in-person <strong>hackathon!</strong>
          </p>
          <div className="flex justify-center gap-x-4 no-underline">
            <Button
              href={"#learn-more"}  color={"rose"}>
              Learn More
            </Button>
            <Button color={"red"} invert href={"/dashboard"}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <div
        id={"learn-more"}
        className="container h-screen flex items-center justify-center p-5"
      >
        <div className="relative">
          <button
            onClick={() => setIsCardOpen((v) => !v)}
            aria-expanded={isCardOpen}
            className="focus:outline-none mx-auto"
          >
            <Image
              src={"/aces_card.svg"}
              alt={"Aces Logo"}
              width={300}
              height={300}
              className={`cursor-pointer transition-transform duration-300 ${
                isCardOpen
                  ? "scale-105 rotate-3 -translate-y-40"
                  : "scale-100 button-tilt"
              }`}
            />
          </button>

          <div
            className={`absolute top-3/4 mt-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
              isCardOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="bg-white text-black text-2xl p-4 rounded shadow-lg w-80">
              <ul>
                <li>
                  Create a{" "}
                  <span className={"text-rose-300 font-extrabold"}>
                    {" "}
                    virtual card/board game in 40 hours...
                  </span>
                </li>
                <li>
                  Get a grant to{" "}
                  <span className={"text-rose-300 font-extrabold"}>
                    make your game for real...
                  </span>
                </li>
                <li>
                  And get invited to{" "}
                  <span className={"text-rose-300 font-extrabold"}>
                    The Deck
                  </span>
                  , a 48 hour hackathon in Washington DC!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        id={"requirements"}
        className="container h-screen flex items-center justify-center p-5"
      >
        <div className="w-full max-w-2xl bg-rose-800 p-6 text-white rounded-lg">
          <h2 className="text-3xl text-white font-semibold mb-4">
            Requirements
          </h2>
          <ul className="list-disc list-inside space-y-4">
            {reqItems.map((item, i) => (
              <li key={i}>
                <strong>{item.sum}</strong>: {item.det}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        id={"faq"}
        className="container h-screen flex items-center justify-center p-5"
      >
        <div className="w-full max-w-2xl p-6 bg-rose-800 rounded-lg text-white">
          <h2 className="text-3xl font-semibold text-center mb-6">FAQ</h2>
          <ul className="space-y-3">
            {faqItems.map((item, i) => (
              <li key={i} className="border-b border-white/10 pb-3">
                <details open={openFaq === i} className="group">
                  <summary
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenFaq((prev) => (prev === i ? null : i));
                    }}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-${i}`}
                    className="list-none w-full flex items-center justify-between text-left py-2 cursor-pointer focus:outline-none"
                  >
                    <span className="font-bold">{item.q}</span>
                    <span
                      className={`flex flex-col gap-1 w-5 h-5 transition-transform ${
                        openFaq === i ? "rotate-90" : ""
                      }`}
                    >
                      <span className="block h-[2px] w-full bg-white" />
                      <span className="block h-[2px] w-full bg-white" />
                      <span className="block h-[2px] w-full bg-white" />
                    </span>
                  </summary>
                  <div
                    id={`faq-${i}`}
                    className={`ml-6 mt-2 text-sm transition-all overflow-hidden ${
                      openFaq === i
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className={"text-lg"}>{item.a}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </>
}
