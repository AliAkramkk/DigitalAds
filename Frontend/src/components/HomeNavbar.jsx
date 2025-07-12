import React ,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

const HomeNavbar = () => {

     const [isScrolled, setIsScrolled] = useState(false);
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-purple-50 shadow-xl backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-3">
          <Link to="/" className="text-xl md:text-4xl font-robotoCondensed text-gray-800">
          AD<span className="text-purple-900">s</span> View<span className="text-sm">.in</span>
        </Link>
        </nav>
    </header>
  )
}

export default HomeNavbar