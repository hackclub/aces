import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "rose" | "red" | "white";
  invert?: boolean;
  href?: string;
  onClick?: () => void;
  disable?: boolean;
  children: ReactNode;
}

const baseClasses =
  "text-lg font-bold tracking-wide rounded-xl px-6 py-3 text-center no-underline transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2";

const colorClassMap = {
  rose: {
    normal: "text-white bg-gradient-to-br from-[#DC143C] to-[#8B0000] hover:from-[#FF1744] hover:to-[#DC143C] focus:ring-red-500 shadow-lg hover:shadow-xl",
    invert: "text-[#DC143C] bg-white hover:bg-[#DC143C] hover:text-white focus:ring-red-500 border-3 border-[#DC143C]",
  },
  red: {
    normal: "text-white bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
    invert: "text-red-600 bg-white hover:bg-red-600 hover:text-white focus:ring-red-500 border-3 border-red-600",
  },
  white: {
    normal: "text-gray-900 bg-white hover:bg-gray-50 focus:ring-gray-400 shadow-lg hover:shadow-xl",
    invert: "text-white bg-gray-900 hover:bg-black focus:ring-gray-600 border-3 border-white",
  },
};

export default function Button({
  color,
  invert,
  href,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const variant = invert ? "invert" : "normal";
  const disabledClasses = disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer";
  const colorClasses = colorClassMap[color][variant];

  const classes = clsx(baseClasses, colorClasses, disabledClasses);
  return (
    <a href={href} className="inline-block">
      <button className={classes} disabled={disabled} aria-disabled={disabled} {...rest} >
        {children}
      </button>
    </a>
  );
}
