

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-white">paradiseLankaStay</h2>
        <p className="mt-2 text-gray-400">Your comfort is our priority.</p>

        <div className="mt-6 flex justify-center space-x-8">
          <a href="/" className="text-lg text-gray-400 hover:text-white transition duration-300">
            Home
          </a>
          <a href="/hotels" className="text-lg text-gray-400 hover:text-white transition duration-300">
            Hotels
          </a>
          <a href="/about" className="text-lg text-gray-400 hover:text-white transition duration-300">
            About
          </a>
          <a href="/contact" className="text-lg text-gray-400 hover:text-white transition duration-300">
            Contact
          </a>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} paradiseLankaStay. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
