import React from "react";
import hom1 from "../assets/Images/phone1.png";
import hom2 from "../assets/Images/phone2.png";
import GridMotion from "../components/HomePage/GridMotion";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Achievments from "../components/HomePage/Achievments";
import Services from "../components/HomePage/Services";
import ad1 from "../assets/Images/ad1.webp";
import ad2 from "../assets/Images/ad2.jpg";
import ad3 from "../assets/Images/ad3.jpg";
import ad4 from "../assets/Images/ad4.jpg";
import ad5 from "../assets/Images/ad5.jpg";
import ad6 from "../assets/Images/ad6.jpg";
import ad7 from "../assets/Images/ad7.jpg";
import TiltedGrid from "../components/HomePage/TiltedImageGrid";
const items = [
  "Item 1",
  // <div key="jsx-item-1">Custom JSX Content</div>,
  "https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop",
  ad1,
  ad2,
  ad3,
  ad4,
  ad5,
  ad6,
  ad7,
  ad1,
  ad2,
  ad3,
  ad4,
  ad5,
  ad6,
  ad7,
  ad3,
  ad4,
  ad5,
  ad6,
  ad7,
];

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative bg-purple-50 ">
        {/* Top SVG Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          {/* <svg viewBox="0 0 2400 800" className='w-full h-40 md:h-56 lg:h-64' xmlns='http://www.w3.org/2000/svg'>
                        <path fill='#A855F7' fillOpacity='1' d='M0,192L48,202.7C96,213,192,235,288,250.7C384,267,480,277,576,245.3C672,213,768,139,864,133.3C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192V320H0Z'></path>
                    </svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 2400 800"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="sssurf-grad"><stop stop-color="hsl(208, 77%, 50%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(208, 74%, 93%)" stop-opacity="1" offset="100%"></stop></linearGradient></defs><g fill="url(#sssurf-grad)" transform="matrix(1,0,0,1,0,-90.84744262695312)"><path d="M 0 330.12022360843997 Q 450 533.2187973420561 600 301.6948489021251 Q 1050 510.28604733424464 1200 335.2656498505763 Q 1650 453.2437270571152 1800 304.94918367555874 Q 2250 495.2523507479094 2400 303.9866493483795 L 2400 800 L 0 800 L 0 326.08279557177383 Z" transform="matrix(1,0,0,1,0,35)" opacity="0.05"></path><path d="M 0 330.12022360843997 Q 450 533.2187973420561 600 301.6948489021251 Q 1050 510.28604733424464 1200 335.2656498505763 Q 1650 453.2437270571152 1800 304.94918367555874 Q 2250 495.2523507479094 2400 303.9866493483795 L 2400 800 L 0 800 L 0 326.08279557177383 Z" transform="matrix(1,0,0,1,0,70)" opacity="0.21"></path><path d="M 0 330.12022360843997 Q 450 533.2187973420561 600 301.6948489021251 Q 1050 510.28604733424464 1200 335.2656498505763 Q 1650 453.2437270571152 1800 304.94918367555874 Q 2250 495.2523507479094 2400 303.9866493483795 L 2400 800 L 0 800 L 0 326.08279557177383 Z" transform="matrix(1,0,0,1,0,105)" opacity="0.37"></path><path d="M 0 330.12022360843997 Q 450 533.2187973420561 600 301.6948489021251 Q 1050 510.28604733424464 1200 335.2656498505763 Q 1650 453.2437270571152 1800 304.94918367555874 Q 2250 495.2523507479094 2400 303.9866493483795 L 2400 800 L 0 800 L 0 326.08279557177383 Z" transform="matrix(1,0,0,1,0,140)" opacity="0.53"></path><path d="M 0 330.12022360843997 Q 450 533.2187973420561 600 301.6948489021251 Q 1050 510.28604733424464 1200 335.2656498505763 Q 1650 453.2437270571152 1800 304.94918367555874 Q 2250 495.2523507479094 2400 303.9866493483795 L 2400 800 L 0 800 L 0 326.08279557177383 Z" transform="matrix(1,0,0,1,0,175)" opacity="0.68"></path><path d="M 0 330.12022360843997 Q 450 533.2187973420561 600 301.6948489021251 Q 1050 510.28604733424464 1200 335.2656498505763 Q 1650 453.2437270571152 1800 304.94918367555874 Q 2250 495.2523507479094 2400 303.9866493483795 L 2400 800 L 0 800 L 0 326.08279557177383 Z" transform="matrix(1,0,0,1,0,210)" opacity="0.84"></path><path d="M 0 330.12022360843997 Q 450 533.2187973420561 600 301.6948489021251 Q 1050 510.28604733424464 1200 335.2656498505763 Q 1650 453.2437270571152 1800 304.94918367555874 Q 2250 495.2523507479094 2400 303.9866493483795 L 2400 800 L 0 800 L 0 326.08279557177383 Z" transform="matrix(1,0,0,1,0,245)" opacity="1"></path></g></svg> */}
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col md:flex-row justify-around pt-24 items-center px-6">
          <div className="m-3 py-10 md:py-15 md:px-5 text-left md:text-left">
            <h1 className="text-3xl md:text-5xl font-mono text-gray-900">
              MAKE A BETTER <br />{" "}
              <span className="text-blue-500 text-wrap whitespace-pre-line">INCOME</span>
            </h1>
            <p className="md:w-2/3 text-gray-700 mt-4 text-lg md:text-xl">
            Ads View, your comprehensive income web application, is here to redefine the way you earn online. 
  Whether you're a content creator, a business, or just someone looking to boost your passive income, 
  our platform empowers you to monetize your time effectively.
            </p>
            <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 bg-black text-white m-  rounded-lg flex items-center justify-around gap-4 transition-all duration-300 group">
              Learn more
              <span className="font-bold text-2xl group-hover:translate-x-2 transition-transform duration-300">
                <BsArrowRight />
              </span>
            </button>
          </div>
          <motion.img
            src={hom1}
            alt=""
            className="m-2 md:py-5  md:w-[550px] md:h[300px] object-auto scale-y-12 mr-20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Business Section */}
        <div className="flex flex-col md:flex-row justify-around items-center px-6 py-12">
          <motion.img
            src={hom2}
            alt=""
            className="m-2 md:py-5 md:w-1/2 "
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="m-3 md:py-14 px-8 text-left md:text-left  md:ml-16 w-full md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-mono text-gray-900">
              Are You A Business <span className=" text-blue-500">Owner?</span> <br />{" "}
              {/* <span className="text-purple-900">Owner?</span>  */}
            </h1>
            <p className="text-gray-700 mt-4 text-lg  md:text-xl w-full">
            Promote your products or services with ease on our platform. Reach a broader audience, increase your brand visibility, 
  and drive real engagement. With Ads View, you can upload and manage your own ads, monitor performance, 
  and connect directly with potential customers — all in one place.
            </p>
            <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 bg-black text-white m-  rounded-lg flex items-center justify-around gap-4 transition-all duration-300 group">
              Learn more
              <span className="font-bold text-2xl group-hover:translate-x-2 transition-transform duration-300">
                <BsArrowRight />
              </span>
            </button>
          </div>
        </div>

        {/* Customers Section */}
 <Achievments />
<Services />
        <div className="hidden md:block py-12 text-center">
          <h1 className="text-5xl font-mono text-blue-800">
            Some of our Customers
          </h1>
          {/* <GridMotion items={items} /> */}

       
        </div>
        <TiltedGrid />
      </div>
    </>
  );
};

export default Home;
