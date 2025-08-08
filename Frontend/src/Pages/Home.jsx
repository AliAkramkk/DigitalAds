import { useState, useEffect } from "react";

// import GridMotion from "../components/HomePage/GridMotion";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight,BsBuildingsFill,BsBarChartFill } from "react-icons/bs";
import { AiOutlineUser,AiTwotoneVideoCamera,AiTwotoneDollar } from "react-icons/ai";
import { RiBardLine } from "react-icons/ri"
import Achievments from "../components/HomePage/Achievments";
import Services from "../components/HomePage/Services";
import holdwatchwin from "../assets/Images/holdwatchwin.png";
import grow from "../assets/Images/grow.png";
import { MdMapsHomeWork } from "react-icons/md";
import TiltedGrid from "../components/HomePage/TiltedImageGrid";
import { Link } from "react-router-dom";
import Footer from "../components/HomePage/Footer";
import ChatBox from "../components/ChatBox";
import { RiHandCoinFill } from "react-icons/ri";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import UserCustomerSplit from "../components/UserCustomerSplit";
import RewardsSection from "../components/RewardsSection";
import Testimonials from "../components/Testimonials";
import FinalCTA from "../components/FinalCTA";


const Home = () => {

  const highlights = [
  { title: "Upload Ads Easily", desc: "Drag, drop, and submit in minutes.", color: "bg-amber-200" },
  { title: "Quick Approvals", desc: "Admin review in record time.", color: "bg-emerald-200" },
  { title: "Earn Rewards", desc: "Watch ads, earn instantly.", color: "bg-sky-200" },
  { title: "Boost Your Reach", desc: "Reach thousands of viewers.", color: "bg-pink-200" },
];
 
 const [index, setIndex] = useState(0);
//    const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//   const interval = setInterval(() => {
//     setCurrentSlide((prev) => (prev + 1) % 2); // Only 2 posters
//   }, 5000); // Change every 5 seconds

//   return () => clearInterval(interval);
// }, []);

  return (
    <>
      <Navbar />
      <div className="relative  ">
        {/* Top SVG Wave */}
      
<Hero />
      

      <div className="flex md:flex-row flex-col  m-5 justify-center items-center gap-5">
        <div className="flex flex-col w-full md:w-2/3 mt-20 md:p-5 bg-amber-300 rounded-r-full">
          <h1 className="md:text-5xl p-3 font-mono mt-16">Change the  way <br />you use your <br /> social media </h1>
          <p className="md:mt-24 text-gray-800 p-5">Make your digital time more meaningful with Ads View.Turn your screen time into rewards. Watch ads, earn cashback, and unlock exclusive deals effortlessly.
            
            Join us today and start earning while you engage with content you love.
          </p>
          <Link to="/signup">
              <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 m-4 bg-black text-white rounded-full flex items-center justify-around gap-4 transition-all duration-300 group">
                SignUp Now
                <span className="font-bold text-2xl group-hover:translate-x-2 transition-transform duration-300">
                  <BsArrowRight />
                </span>
              </button>
              </Link>
        </div>

        <div className="relative flex flex-col mt-28 bg-amber-300 p-4 overflow-hidden">
            <div className="hidden md:block absolute -left-72 -top-0 h-full w-10/12 bg-white rounded-full z-0"></div>
          <div className="flex flex-row gap- ml-32">
            <div className="w-48 p-8"style={{ backgroundColor: '#E0EAE8' }}>
              {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, suscipit? */}
              <img src={holdwatchwin} alt="" className="-mt-12 w-[400px] h-[150px]" />
            </div>
            <div className="w-48 h-[200px] rounded-l-[150px]"style={{ backgroundColor: '#EBE8D8' }}>
              <h1 className="text-end text-xl m-3 font-thin">121+</h1>
              <h1 className="text-start m-3 mt-10 text-xl font-thin">Companies</h1>
             <h1 className="text-end text-5xl ml-32 font-thin"> <MdMapsHomeWork /></h1>
            </div>
          </div>

           <div className="flex flex-row  ml-32">
            <div className="w-48 p-8 rounded-tr-[105px] font-thin"style={{ backgroundColor: '#E0EAE8' }}>
              <RiBardLine className=" w-10 h-10 text-start justify-start items-start mr-80"/>
              80+ Users Online <br />80+ Buisness Owners 
            </div>
            <div className="w-48"style={{ backgroundColor: '#1C3F3A' }}>
        <img src={grow} alt="" className="items-center justify-center m-8" />
            </div>
          </div>
          
        </div>
      </div>

     <h1 className="text-xl md:text-2xl text-green-950 text-center mt-14 font-mono "> About Us</h1>
<h1 className="px-4 md:px-0 md:text-5xl  md:text-center mt-14 font-mono "> One App For all Your <br />Entertainment</h1>
<h1 className="px-4 text-md md:justify-center text-start  mt-8 md:ml-[450px] font-mono text-gray-400 "> Ads View redefines the way you earn online. <br />Whether you're a creator, business, or looking to boost passive income, <br />our platform helps you monetize your time effectively</h1>
       
       <div className="md:mx-20 mx-5 mt-6 flex md:flex-row flex-row-2">
        <div className="w:1/2 md:w-1/4 p-4 h-[280px] text-2xl text-white font-thin bg-amber-300"style={{ backgroundColor: '#1C3F3A' }}>Make Your Digital Time More Meaningfull
        <BsBarChartFill className="md:w-36 md:h-48 h-28 text-white text-center items-center ml-8 mt-5" />
        </div>
        <div className=" p-4 h-[280px] m:3 md:mx-3 rounded-bl-[80px] md:w-5/6"style={{ backgroundColor: '#E0EAE8' }}>
        <div className="flex md:flex-row "
        >
          <div className="w-1/4 border shadow-xl md:p-4 m-3 md:ml-16 font-thin ">
          <BsBuildingsFill className="w-24 h-28 md:w-32 md:h-40 text-blue-400 " />
         <h1 className="text-center">110+ companies</h1>

          </div>
          <div className="w-1/4 border shadow-xl md:p-4 m-3 font-thin">
          <AiOutlineUser className="w-24 h-28 md:w-32 md:h-40 text-amber-700"/>
         <h1 className="text-center">200+ Active Users</h1>

          </div>
          <div className="w-1/4 border shadow-xl md:p-4 m-3 font-thin text-center">
          <AiTwotoneVideoCamera className="w-24 h-28 md:w-32 md:h-40 text-white"/>
         <h1 className="text-center">200+ Ads Published</h1>

          </div>
          {/* <div className="w-1/4 border shadow-xl p-4 m-3 font-thin">
          <AiTwotoneDollar className="w-32 h-40 text-blue-300"/>
         <h1 className="text-center">20000+ Rewards delivered</h1>

          </div> */}
       

        </div>
        
        </div>
       </div>
      <HowItWorks />


       <UserCustomerSplit />

        {/* Customers Section */}
 {/* <Achievments /> */}
{/* <Services /> */}

<RewardsSection />
<Testimonials />
      <FinalCTA />
       {/* <Services /> */}
      </div>
      <ChatBox />
      <Footer />
    </>
  );
};

export default Home;
