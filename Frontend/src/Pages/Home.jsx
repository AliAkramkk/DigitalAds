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
import ServiceCard from "../components/ServiceCard";


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
      
      

                <div className="hidden md:block absolute   h-1/12 w-1/12 bg-black  rounded-full z-0"></div>
      <div className="flex md:flex-row flex-col  m-5 justify-center items-center gap-5">
        <div className="flex flex-col w-full md:w-[600px] md:h-[600px] mt-20 md:p-5 bg-amber-300 rounded-full">
          <h1 className="md:text-5xl p-3 font-mono mt-10 md:mt-16 text-center ">Change the  way <br />you use your <br /> social media </h1>
          <p className="md:mt-10 text-gray-800 px-12 md:px-7 text-start text-md  md:text-xl">Make your digital time more meaningful with Ads View.Turn your screen time into rewards. Watch ads, earn cashback, and unlock exclusive deals effortlessly.
            
            Join us today and start earning while you engage with content you love.
          </p>
          <Link to="/signup">
              <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 ml-24 m-5 md:m-0 md:ml-20 bg-black text-white rounded-full flex items-center justify-around gap-4 transition-all duration-300 group text-sm md:text-lg">
                SignUp Now
                <span className="font-bold md:text-2xl group-hover:translate-x-2 transition-transform duration-300">
                  <BsArrowRight />
                </span>
              </button>
              </Link>
        </div>

        <div className="relative flex flex-col mt-28  p-4 overflow-hidden">
          
          <div className="flex flex-row ml-12 md:ml-32">
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

           <div className="flex flex-row ml-12 mr-5 md:ml-32">
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

     {/* <h1 className="text-xl md:text-2xl text-green-950 text-center mt-14 font-mono "> About Us</h1>
<h1 className="px-4 md:px-0 md:text-5xl  md:text-center mt-14 font-mono "> One App For all Your <br />Entertainment</h1>
<h1 className="px-4 text-md md:justify-center text-start  mt-8 md:ml-[450px] font-mono text-gray-400 "> Ads View redefines the way you earn online. <br />Whether you're a creator, business, or looking to boost passive income, <br />our platform helps you monetize your time effectively</h1>
       
      <section className="bg-gray-50 py-16 px-6 md:px-20">
      {/* Hero Section */}
      {/* <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Turn Your Digital Time Into Rewards
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Trusted by 110+ companies and loved by 200+ active users.
        </p> */}
        {/* <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition">
          Get Started
        </button> */}
      {/* </div> */}

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            Icon: BsBuildingsFill,
            label: '110+ Companies',
            color: 'text-teal-600',
          },
          {
            Icon: AiOutlineUser,
            label: '200+ Active Users',
            color: 'text-amber-600',
          },
          {
            Icon: AiTwotoneVideoCamera,
            label: '200+ Ads Published',
            color: 'text-blue-600',
          },
        ].map(({ Icon, label, color }) => (
          <motion.div
            key={label}
            className="bg-white rounded-xl p-8 shadow-md flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            >
            <Icon className={`${color} w-16 h-16 mb-4`} />
            <div className="text-2xl font-semibold text-gray-800">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>  */}
    <ServiceCard />
      <HowItWorks />


            <Hero />
       <UserCustomerSplit />

        {/* Customers Section */}
 {/* <Achievments /> */}
{/* <Services /> */}

<RewardsSection />
{/* <Testimonials /> */}
      {/* <FinalCTA /> */}
       {/* <Services /> */}
      </div>
      <ChatBox />
      <Footer />
    </>
  );
};

export default Home;
