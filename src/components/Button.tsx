import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "rose" | "red" | "white";
  invert?: boolean;
  href?: string;
  children: React.ReactNode;
}

const baseClasses =
  "text-xl cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center";

const colorClassMap = {
  rose: {
    normal: "text-white bg-rose-700",
    invert: "text-rose-700 bg-white",
  },
  red: {
    normal: "text-white bg-red-500",
    invert: "text-red-500 bg-white",
  },
  white: {
    normal: "text-black bg-white",
    invert: "text-white bg-black",
  },
};

export default function Button({
  color,
  invert,
  href,
  children,
  ...rest
}: ButtonProps) {
  const variant = invert ? "invert" : "normal";
  const colorClasses = colorClassMap[color][variant];

  const classes = clsx(baseClasses, colorClasses);
  return (
    <a href={href}>
      <button type="button" className={classes} {...rest}>
        {children}
      </button>
    </a>
  );
}
