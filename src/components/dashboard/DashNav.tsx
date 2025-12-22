import { FaHome, FaShoppingCart } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IconType } from "react-icons";

type DashItemProps = {
  href: string,
  Icon: IconType,
  label: string,
}

function DashItem({href, Icon, label, disabled}: DashItemProps) {
  return (
    <a href={!disabled ? href : undefined} >
      <div className={"p-3 rounded-lg bg-red-400 text-white text-center hover:bg-red-500 transition-all inline-flex items-center justify-center text-xl md:text-2xl" + (disabled ? " opacity-50 cursor-not-allowed hover:bg-red-400" : " hover:cursor-pointer")}>
        <Icon className="mr-2" />
        {label}
      </div>
    </a>
  )
}

export default function DashNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-red-300 h-2/15 flex items-center justify-center px-8"
    >
      <div className="flex items-center justify-around space-x-8 md:space-x-12">
        <DashItem href={"/dashboard"} Icon={FaHome} label={"Home"}/>
        <DashItem href={"/dashboard/shop"} Icon={FaShoppingCart} label={"Shop"} disabled/>
        {/*TODO: remove when shop is live*/}
        <DashItem href={"/dashboard/projects"} Icon={FaMagnifyingGlass} label={"Explore"} />
      </div>
    </nav>
  );
}
