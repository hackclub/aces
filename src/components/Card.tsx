interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  step: number;
  children: React.ReactNode;
}

export default function Card({ title, step, children }: CardProps) {
  return (
    <div className="w-full bg-white md:px-7 px-5 py-8 rounded-xl">
      <h1 className="text-4xl font-bold text-center mb-5 text-indigo-500">
        Step {step}
      </h1>
      <h2 className="md:text-3xl text-2xl font-medium mb-2">{title}</h2>
      <p className="md:text-lg text-md text-indigo-800">
        {children}
      </p>
    </div>
  );
}
