import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { MdMapsHomeWork } from "react-icons/md";
import { RiBardLine } from "react-icons/ri";
import holdwatchwin from "../assets/Images/holdwatchwin.png";
import grow from "../assets/Images/grow.png";
import Footer from "../components/HomePage/Footer";
import ChatBox from "../components/ChatBox";
import HowItWorks from "../components/HowItWorks";
import ServiceCard from "../components/ServiceCard";
import RewardsSection from "../components/RewardsSection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* 🌟 HERO SECTION */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-white">
        <div className="max-w-xl text-center md:text-left">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Turn Your Screen Time <br />
            <span className="bg-gradient-to-r from-amber-500 to-violet-500 bg-clip-text text-transparent">
              Into Real Rewards
            </span>
          </motion.h1>

          <p className="text-gray-600 mt-6 text-lg">
            Watch ads, earn cashback, and unlock exclusive deals.  
            Make your online time more meaningful — start today!
          </p>

          <Link to="/signup">
            <button className="mt-8 px-6 py-3 bg-gradient-to-r from-amber-500 to-violet-500 text-white rounded-full font-medium flex items-center justify-center gap-2 mx-auto md:mx-0 hover:shadow-lg transition-all duration-300">
              Sign Up Now <BsArrowRight className="text-lg" />
            </button>
          </Link>
        </div>

        {/* Hero Illustration */}
        <div className="relative mt-10 md:mt-10">
          <div className="w-80 md:w-[480px] h-[480px] bg-gradient-to-br from-indigo-50 to-violet-50 rounded-full flex items-center justify-center shadow-inner">
            <img
              src={holdwatchwin}
              alt="Hold Watch Win"
              className="w-64 md:w-80 drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 🧩 STATS SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 px-10 md:px-20 py-16 text-center bg-gray-50">
        <div className="p-8 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition">
          <MdMapsHomeWork className="text-4xl text-indigo-500 mx-auto mb-3" />
          <h3 className="text-2xl font-semibold text-gray-800">120+</h3>
          <p className="text-gray-500">Companies Registered</p>
        </div>
        <div className="p-8 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition">
          <RiBardLine className="text-4xl text-violet-500 mx-auto mb-3" />
          <h3 className="text-2xl font-semibold text-gray-800">5K+</h3>
          <p className="text-gray-500">Active Users</p>
        </div>
        <div className="p-8 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition">
          <img src={grow} alt="Grow" className="w-12 mx-auto mb-3" />
          <h3 className="text-2xl font-semibold text-gray-800">8K+</h3>
          <p className="text-gray-500">Ads Watched Daily</p>
        </div>
      </section>

      {/* 🧠 HOW IT WORKS */}
      <div className="md:py-10  md:px-20">
        <HowItWorks />
      </div>

      {/* 💎 SERVICE SECTION */}
      <div className="px-6 md:px-20 py-10">
        <ServiceCard />
      </div>

      {/* 🏆 REWARDS SECTION */}
      <div className="bg-gray-50 py-16 p-5 ">
        <RewardsSection />
      </div>

      {/* 💬 CHAT & FOOTER */}
      <ChatBox />
      <Footer />
    </>
  );
};

export default Home;
