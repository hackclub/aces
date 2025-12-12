import { FaHome, FaShoppingCart } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";

export default function DashNav() {
  return (
    <div className={"bg-red-200 p-4 mr-10 rounded-2xl w-min min-h-max flex flex-col justify-evenly"}>
      <a href={"/dashboard"}>
        <div
          className={"mb-4 p-2 rounded-lg bg-red-400 text-white text-center hover:bg-red-500 hover:cursor-pointer transition-all inline-flex flex-row items-center justify-center w-full text-3xl"}>
          <FaHome className={"mr-1"} />
          Home
        </div>
      </a>
      <a href={"/dashboard/shop"}>
        <div
          className={"mb-4 p-2 rounded-lg bg-red-400 text-white text-center hover:bg-red-500 hover:cursor-pointer transition-all inline-flex flex-row items-center justify-center w-full text-3xl"}>
          <FaShoppingCart className={"mr-1"} />
          Shop
        </div>
      </a>
      <a href={"/dashboard/projects"}>
        <div
          className={"mb-4 p-2 rounded-lg bg-red-400 text-white text-center hover:bg-red-500 hover:cursor-pointer transition-all inline-flex flex-row items-center justify-center w-full text-3xl"}>
          <TbCardsFilled className={"mr-1"} />
          Projects
        </div>
      </a>
    </div>
  );
}