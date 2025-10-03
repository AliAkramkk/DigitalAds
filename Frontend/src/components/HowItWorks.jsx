// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   AiOutlineUpload,
//   AiOutlineEye,
//   AiOutlineDollarCircle,
//   AiOutlineUsergroupAdd,
// } from "react-icons/ai";

// const steps = [
//   {
//     id: 1,
//     icon: <AiOutlineUpload size={50} className="text-yellow-600" />,
//     title: "Business Owners Upload Ads",
//     description:
//       "Easily upload your ads and reach your target audience with detailed analytics.",
//   },
//   {
//     id: 2,
//     icon: <AiOutlineUsergroupAdd size={50} className="text-green-600" />,
//     title: "Ads Get Approved",
//     description:
//       "Our team reviews your ads to ensure quality and compliance before publishing.",
//   },
//   {
//     id: 3,
//     icon: <AiOutlineEye size={50} className="text-blue-600" />,
//     title: "Users Watch & Engage",
//     description:
//       "Users watch your ads and engage, boosting your brand awareness effectively.",
//   },
//   {
//     id: 4,
//     icon: <AiOutlineDollarCircle size={50} className="text-purple-600" />,
//     title: "Users Earn Rewards",
//     description:
//       "Users earn cashback and rewards for watching ads, creating a win-win ecosystem.",
//   },
// ];

// const HowItWorks = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % steps.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="my-20 max-w-5xl mx-auto px-4 text-center">
//       <h2 className="text-4xl font-bold mb-8 text-gray-800 font-mono">
//         How It Works
//       </h2>
//       <AnimatePresence mode="wait">
//         {steps.map(
//           (step, index) =>
//             index === current && (
//               <motion.div
//                 key={step.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 transition={{ duration: 0.7 }}
//                 className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-xl"
//               >
//                 <div className="flex justify-center mb-4">{step.icon}</div>
//                 <h3 className="text-2xl font-semibold mb-2 text-gray-900">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-600">{step.description}</p>
//               </motion.div>
//             )
//         )}
//       </AnimatePresence>
//       {/* Dots */}
//       <div className="flex justify-center mt-6 gap-4">
//         {steps.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrent(idx)}
//             className={`w-4 h-4 rounded-full transition-colors ${
//               current === idx ? "bg-yellow-500" : "bg-gray-300"
//             }`}
//             aria-label={`Step ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;
import React, { useEffect, useState } from "react";
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
              className="bg-white mx-auto mb-4 p-6 rounded-xl shadow-lg w-80 text-center"
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
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800 font-mono">
          See how users are earning rewards 🚀
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Real people, real rewards! Watch ads, earn points, and join thousands
          already benefiting from AdsView.
        </p>
        <button className="px-6 py-3 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition">
          Sign Up & Start Earning
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
