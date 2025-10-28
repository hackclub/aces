import Image from "next/image";
import Link from "next/link";

export default function Flag() {
  return (
    <Link
      href="https://hackclub.com/"
      target="_blank"
      aria-label="Hack Club's homepage"
      style={{ position: "absolute", left: 0, top: 0, zIndex: 100 }}
    >
      <div className="relative w-24 h-24 md:w-32 md:h-28">
        <Image
          src="https://assets.hackclub.com/flag-orpheus-left.svg"
          alt="Hack Club flag"
          fill
          className={"flag object-contain origin-top-left duration-100"}
        />
      </div>
    </Link>
  );
}
