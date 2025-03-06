import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";
import { FiBell, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

const CustomerNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <nav className="bg-white text-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/customer" className="text-2xl font-bold">
          Ad Manager
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/customer" className="hover:underline">
            Home
          </Link>
          <Link to="/customer/create-ad" className="hover:underline">
            Create Ad
          </Link>
          <Link to="/customer/my-ads" className="hover:underline">
            My Ads
          </Link>
          <Link to="/customer/payments" className="hover:underline">
            Payments
          </Link>
          <Link to="/customer/analytics" className="hover:underline">
            Analytics
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6 cursor-pointer text-violet-700" />

          {/* Profile Picture */}
          <div className="relative">
            <div
              className="cursor-pointer flex items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-500" />
              )}
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2">
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white p-4 text-center justify-center">
          <Link to="/customer" className="hover:underline">
            Home
          </Link>
          <Link to="/customer/create-ad" className="hover:underline">
            Create Ad
          </Link>
          <Link to="/customer/my-ads" className="hover:underline">
            My Ads
          </Link>
          <Link to="/customer/payments" className="hover:underline">
            Payments
          </Link>
          <Link to="/customer/analytics" className="hover:underline">
            Analytics
          </Link>
        </div>
      )}
    </nav>
  );
};

export default CustomerNavbar;
