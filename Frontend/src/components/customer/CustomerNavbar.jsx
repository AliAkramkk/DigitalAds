import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FiBell, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../features/authSlice";
import axiosInstance from "../../api/axiosInstance";

const CustomerNavbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  console.log("user",user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/customer/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // setNotifications(response.data);
        const unreadNotifications = response.data.filter((notif) => !notif.isRead);
        setNotifications(unreadNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [token]);


  // Mark notifications as read and update state
  const markNotificationsAsRead = async () => {
    try {
      await axiosInstance.put("/customer/notifications/mark-as-read", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // **Update UI instantly: Mark notifications as read in state**
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // Get unread notification count
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  // Handle notification click and navigate
  const handleNotificationClick = (notification) => {
    setNotifOpen(false); // Close dropdown

    if (notification.message.includes("approved") || notification.message.includes("rejected")) {
      navigate("/customer/my-ads");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white text-black p-4 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/customer" className="text-2xl font-bold">
          Ad Manager
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/customer" className="hover:underline">Home</Link>
          <Link to="/customer/create-ad" className="hover:underline">Create Ad</Link>
          <Link to="/customer/my-ads" className="hover:underline">My Ads</Link>
          <Link to="/customer/payments" className="hover:underline">Payments</Link>
          <Link to="/customer/analytics" className="hover:underline">Analytics</Link>
        </div>

        <div className="flex items-center space-x-4 relative">
          {/* Notification Bell */}
          <div className="relative">
            <FiBell
              className="w-6 h-6 cursor-pointer text-violet-700 relative z-20"
              onClick={() => {
                if (!notifOpen) markNotificationsAsRead();
                setNotifOpen(!notifOpen);
              }}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-64 py-2 max-h-60 overflow-auto z-50 border border-gray-200">
                {notifications.length === 0 ? (
                  <p className="text-center p-2 text-gray-500">No new notifications</p>
                ) : (
                  notifications.map((notification, index) => (
                    <button
                      key={index}
                      className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-100"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {notification.message}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
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

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2">
                <p className="px-4 py-2 font-semibold">Hi, {user?.name}</p>
                <Link to="/customer/profile" className="block px-4 py-2 hover:bg-gray-100">
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
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white p-4 text-center">
          <Link to="/customer" className="hover:underline">Home</Link>
          <Link to="/customer/create-ad" className="hover:underline">Create Ad</Link>
          <Link to="/customer/my-ads" className="hover:underline">My Ads</Link>
          <Link to="/customer/payments" className="hover:underline">Payments</Link>
          <Link to="/customer/analytics" className="hover:underline">Analytics</Link>
        </div>
      )}
    </nav>
  );
};

export default CustomerNavbar;
