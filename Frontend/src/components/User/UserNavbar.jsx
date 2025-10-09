import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiBell, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { Menu, X, Bell, User } from "lucide-react";

const UserNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action   
    };

  return (
    <nav className="bg-white shadow-md p-4 ">
      {/* Logo */}
      <div className="container mx-auto flex justify-between items-center">
        
       <Link to="/user/home" className="text-xl md:text-4xl font-robotoCondensed text-gray-800">
          AD<span className="text-purple-900">s</span> View<span className="text-sm">.in</span>
        </Link>
      
      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium ">
        <li><Link to="/user/home" className="hover:text-blue-900 hover:underline hover:border-2 hover:shadow-md hover:p-2">Home</Link></li>
        <li><Link to="/user/watch-ads" className="hover:text-blue-900 hover:underline hover:border-2 hover:shadow-md hover:p-2">Watch Ads</Link></li>
        <li><Link to="/user/earnings" className="hover:text-blue-900 hover:underline hover:border-2 hover:shadow-md hover:p-2">Earnings</Link></li>

        <li><Link to="/user/redeem-rewards" className="hover:text-blue-900 hover:underline hover:border-2 hover:shadow-md hover:p-2">Redeem Rewards</Link></li>
        <li><Link to="/user/leaderboard" className="hover:text-blue-900 hover:underline hover:border-2 hover:shadow-md hover:p-2">Leaderboard</Link></li>
      </ul>
      </div>
      
      {/* Profile and Notifications */}
      <div className="flex items-center space-x-4">
        <FiBell className="text-xl cursor-pointer hover:text-blue-500" />
        
        {/* Profile Section */}
        <div className="relative">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <FaUserCircle className="text-3xl text-gray-500" />
            )}
          </div>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2">
               <p className="px-4 py-2 font-semibold">Hi, {user?.name}</p>
              <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                <FiLogOut /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-1 mt-2 bg-white p-4 items-center text-center justify-center font-medium">
          <Link to="/user" className="hover:underline">
            Home
          </Link>
          <Link to="/user/watch-ads" className="hover:underline">
          Watch Ads
          </Link>
          <Link to="/user/earnings" className="hover:underline">
          Earnings
          </Link>
          <Link to="/user/redeem-rewards" className="hover:underline">
          Redeem Rewards
          </Link>
          <Link to="/user/leederboard" className="hover:underline">
          Leaderboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
