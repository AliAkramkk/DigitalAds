// import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import hom1 from "../assets/Images/phone1.png";
import hom2 from "../assets/Images/phone2.png";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
     useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 2); // Only 2 posters
      }, 5000); // Change every 5 seconds
    
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="relative w-full overflow-hidden mt-20">
      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div
            key="poster1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-amber-300 to-yellow-200 p-6 md:p-12 rounded-2xl shadow-lg mx-4 md:mx-20"
          >
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold text-green-900">
                🎉 New Customers Get <span className="text-red-600">2 FREE Ads!</span>
              </h1>
              <p className="mt-4 text-gray-700 text-lg">
                Promote your products and services at zero cost! Sign up now and get
                two ad uploads absolutely free. Start reaching your audience today.
              </p>
              <Link to="/signup">
                <button className="mt-6 px-6 py-3 bg-green-900 text-white rounded-full flex items-center gap-3 hover:bg-green-700 transition-all">
                  Claim Your Free Ads <BsArrowRight className="text-xl" />
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
              <img src={hom1} alt="Free Ads Promo" className="w-72 md:w-96 drop-shadow-xl" />
            </div>
          </motion.div>
        )}
    
        {currentSlide === 1 && (
          <motion.div
            key="poster2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-green-900 to-green-700 p-6 md:p-12 rounded-2xl shadow-lg mx-4 md:mx-20"
          >
            <div className="md:w-1/2 text-white">
              <h1 className="text-3xl md:text-5xl font-bold">
                💰 Earn Rewards While You Watch
              </h1>
              <p className="mt-4 text-lg">
                Every ad you watch turns into real rewards. Sign up today and start
                earning from your screen time. The more you watch, the more you earn!
              </p>
              <Link to="/signup">
                <button className="mt-6 px-6 py-3 bg-amber-300 text-green-900 rounded-full flex items-center gap-3 hover:bg-amber-200 transition-all">
                  Start Earning Now <BsArrowRight className="text-xl" />
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
              <img src={hom2} alt="Earn Rewards" className="w-72 md:w-96 drop-shadow-xl rounded-xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    
      {/* Carousel Dots */}
      <div className="flex justify-center mt-4 gap-3">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlide === index ? "bg-green-900 w-6" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
