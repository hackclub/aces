export default function Navbar() {
  return (
    <div className="absolute w-full z-100 bg-transparent px-8 py-8 text-white">
      <div className="container mx-auto">
        <div className="md:space-x-6 space-x-2 text-right">
          <a href="#learn-more" className="md:text-xl text-md hover:text-gray-300">
            About
          </a>
          <a href="#requirements" className="md:text-xl text-md hover:text-gray-300">
            Requirements
          </a>
          <a href="#events" className="md:text-xl text-md hover:text-gray-300">
            Examples
          </a>
          <a href="#faq" className="md:text-xl text-md hover:text-gray-300">
            FAQ
          </a>
        </div>
      </div>
    </div>
  );
}
