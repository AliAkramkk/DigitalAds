import { useState, useEffect } from "react";
import hom1 from "../assets/Images/phone1.png";
import hom2 from "../assets/Images/phone2.png";
// import GridMotion from "../components/HomePage/GridMotion";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Achievments from "../components/HomePage/Achievments";
import Services from "../components/HomePage/Services";
import holdwatchwin from "../assets/Images/holdwatchwin.png";
import grow from "../assets/Images/grow.png";

import TiltedGrid from "../components/HomePage/TiltedImageGrid";
import { Link } from "react-router-dom";


const Home = () => {
 const slides = [
    {
      id: 1,
      title: (
        <>
          MAKE A BETTER <br />
          <span className="text-blue-900">INCOME</span>
        </>
      ),
      description:
        "Ads View redefines the way you earn online. Whether you're a creator, business, or looking to boost passive income, our platform helps you monetize your time effectively.",
      img: hom1,
    },
    {
      id: 2,
      title: (
        <>
          Are You A <span className="text-blue-900">Business Owner?</span>
        </>
      ),
      description:
        "Promote your products or services easily on Ads View. Reach a broader audience, increase brand visibility, and drive real engagement while monitoring your ad performance.",
      img: hom2,
    },
  ]; 

   const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <Navbar />
      <div className="relative bg-purple-50 ">
        {/* Top SVG Wave */}
      

        {/* Hero Section */}
        <div className="relative bg-purple-50 min-h-screen flex flex-col md:flex-row justify-around pt-24 items-center px-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-around items-center w-full"
          >
            {/* Text Section */}
            <div className="m-3 py-10 md:py-15 md:px-5 text-left w-full md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-mono text-gray-900">{slides[currentSlide].title}</h1>
              <p className="text-gray-700 mt-4 text-lg md:text-xl">{slides[currentSlide].description}</p>
              <Link to="/signup">
              <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 bg-black text-white rounded-lg flex items-center justify-around gap-4 transition-all duration-300 group">
                SignUp Now
                <span className="font-bold text-2xl group-hover:translate-x-2 transition-transform duration-300">
                  <BsArrowRight />
                </span>
              </button>
              </Link>
            </div>

            {/* Image Section */}
            <motion.img
              src={slides[currentSlide].img}
              alt=""
              className="m-2 md:py-5 md:w-[500px] md:h-auto object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

        {/* Customers Section */}
 {/* <Achievments /> */}
<Services />
        <div className="hidden md:block py-12 text-center">
         
          {/* <GridMotion items={items} /> */}

       
        </div>
        <TiltedGrid />
      </div>
    </>
  );
};

export default Home;
