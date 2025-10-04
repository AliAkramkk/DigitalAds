
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-10 rounded-2xl shadow-xl m-10">
      {/* Left: Auto-scrolling user showcase */}
      <div className="relative w-full md:w-1/2 h-64 overflow-hidden -rotate-6">
        <motion.div
          className="absolute top-0 left-0 w-full "
          animate={{ y: [0, -users.length * 120] }} // scroll up
          transition={{
            repeat: Infinity,
            duration: users.length * 3, // 3s per user
            ease: "linear",
          }}
        >
          {users.concat(users).map((user, i) => (
            <div
              key={i}
              className="bg-white mx-auto mb-4 p-6 rounded-xl shadow-lg w-80 text-center h-48"
            >
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600 mt-2">
                Watched <span className="font-bold">{user.totalAdsWatched}</span> ads
              </p>
              <p className="text-indigo-900 mt-1 font-bold text-lg">
                Earned {user.totalRewardEarned} points 🎉
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: Promo text */}
      <div className="mt-10 md:mt-0 md:ml-12 w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800 font-mono ">
          See how users are earning rewards 🚀
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Real people, real rewards! Watch ads, earn points, and join thousands
          already benefiting from AdsView.
        </p>
        <Link to="/signup">
        <button className="px-6 py-3 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition">
          Sign Up & Start Earning
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
