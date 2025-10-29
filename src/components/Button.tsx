import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "rose" | "red" | "white";
  invert?: boolean;
  href?: string;
  disable?: boolean;
  children: React.ReactNode;
}

const baseClasses =
  "text-xl font-medium rounded-lg text-sm px-5 py-2.5 text-center no-underline";

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
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const variant = invert ? "invert" : "normal";
  const disabledClasses = disabled ? "cursor-not-allowed brightness-85 saturate-8" : "cursor-pointer";
  const colorClasses = colorClassMap[color][variant];

  const classes = clsx(baseClasses, colorClasses, disabledClasses);
  return (
    <a href={href}>
      <button className={classes} disabled={disabled} {...rest} >
        {children}
      </button>
    </a>
  );
}
