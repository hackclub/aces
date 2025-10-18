interface FAQCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  children: React.ReactNode;
}

export default function FAQCard({ title, children }: FAQCardProps) {
  return (
    <div className="w-full bg-indigo-700/80 md:px-7 px-5 py-8 rounded-xl border-2 border-dashed border-white">
      <h2 className="md:text-3xl text-2xl font-medium mb-2 text-white">
        {title}
      </h2>
      <p className="text-lg text-gray-200">{children}</p>
    </div>
  );
}
