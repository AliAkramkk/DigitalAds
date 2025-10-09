import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import UserNavbar from "../../components/User/UserNavbar";
import Blogs from "../../components/User/Blogs";
import { motion } from "framer-motion";
import { Eye, Gift, Flame, Medal } from "lucide-react";

const UserHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [ads, setAds] = useState([]);
  const [stats, setStats] = useState({
    totalAdsWatched: 0,
    totalRewardEarned: 0,
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [progress, setProgress] = useState(40); // example: 40% to next reward

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/user/latest-ads").then((res) => setAds(res.data));
    axiosInstance.get("/user/stats").then((res) => setStats(res.data));
    axiosInstance.get("/user/leaderboard").then((res) => setLeaderboard(res.data));
  }, []);

  return (
    <>
      <UserNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-300 to-violet-100 text-white p-10 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl md:text-5xl font-bold">
          Welcome back, {user.name} 👋
        </h1>
        <p className="mt-3 text-lg opacity-90">
          Watch ads. Earn rewards. Stay updated.
        </p>
        <button
          onClick={() => navigate("/ads")}
          className="mt-5 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-indigo-50"
        >
          Start Watching Ads
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow p-6 flex items-center gap-4"
        >
          <Eye className="w-10 h-10 text-indigo-600" />
          <div>
            <p className="text-gray-500">Total Ads Watched</p>
            <h2 className="text-2xl font-bold">{stats.totalAdsWatched}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow p-6 flex items-center gap-4"
        >
          <Gift className="w-10 h-10 text-pink-500" />
          <div>
            <p className="text-gray-500">Rewards Earned</p>
            <h2 className="text-2xl font-bold">{stats.totalRewardEarned}</h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow p-6 flex items-center gap-4"
        >
          <Flame className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-gray-500">Active Streak</p>
            <h2 className="text-2xl font-bold">5 Days</h2>
          </div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <div className="px-6">
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3">
            Weekly Goal: Earn 100 Points
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-bl from-indigo-300 to-violet-700 h-4"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            You are {100 - progress}% away from your goal 🎯
          </p>
        </div>
      </div>

      {/* Latest Ads */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Latest Ads</h2>
          <button
            onClick={() => navigate("/ads")}
            className="px-4 py-2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-200 text-white hover:bg-indigo-700"
          >
            See All Ads
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <motion.div
              key={ad._id}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/user/ads/${ad._id}`)}
              className="bg-white rounded-xl shadow overflow-hidden cursor-pointer"
            >
              <img
                src={ad.thumbnailUrl}
                alt={ad.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {ad.description}
                </p>
                <p className="mt-2 text-indigo-600 font-bold">+5 Points</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">🏆 Leaderboard</h2>
        <div className="bg-white shadow rounded-2xl p-6">
          {leaderboard.slice(0, 5).map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between py-2 border-b last:border-none"
            >
              <div className="flex items-center gap-3">
                <Medal className="w-6 h-6 text-yellow-500" />
                <span className="font-medium">{user.name}</span>
              </div>
              <span className="font-bold text-indigo-600">
                {user.rewards} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blogs */}
      <div className="p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-6">Blogs</h2>
        <Blogs limit={3} showMore={true} />
      </div>

      {/* Footer */}
      <div className="bg-indigo-600 text-white p-6 text-center mt-10">
        <p className="text-lg font-semibold">
          AD<span className="text-pink-400">s</span> View
          <span className="text-sm">.in</span>
        </p>
        <p className="text-sm opacity-80 mt-2">
          © 2025 AdsView.in — All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default UserHome;
