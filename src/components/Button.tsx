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
  "text-xl font-medium rounded-lg text-sm px-5 py-2.5 text-center no-underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

const colorClassMap = {
  rose: {
    normal: "text-white bg-rose-700 hover:bg-rose-800 focus:ring-rose-500 shadow-md hover:shadow-lg",
    invert: "text-rose-700 bg-white hover:bg-rose-50 focus:ring-rose-500 border-2 border-rose-700",
  },
  red: {
    normal: "text-white bg-red-500 hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg",
    invert: "text-red-500 bg-white hover:bg-red-50 focus:ring-red-500 border-2 border-red-500",
  },
  white: {
    normal: "text-black bg-white hover:bg-gray-100 focus:ring-gray-400 shadow-md hover:shadow-lg",
    invert: "text-white bg-black hover:bg-gray-900 focus:ring-gray-600 border-2 border-white",
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
  const disabledClasses = disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer";
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
