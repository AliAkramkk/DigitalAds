import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent shadow-xl backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-4xl font-robotoCondensed text-gray-800">
          AD<span className="text-purple-900">s</span> View<span className="text-sm">.in</span>
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gradient-to-br from-indigo-200 to-violet-50 text-black rounded-md transition hover:rounded-xl"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-gradient-to-br from-indigo-300 to-violet-50 text-black rounded-md transition hover:rounded-xl"
          >
            Signup
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-2xl text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-100 shadow-lg w-64 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center mt-20">
          <button
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
            className="w-full px-6 py-3 bg-black text-white rounded-lg mb-3 hover:bg-gray-800 transition"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/signup");
              setIsOpen(false);
            }}
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Signup
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
